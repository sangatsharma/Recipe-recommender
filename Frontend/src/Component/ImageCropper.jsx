import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/CropImage";
import { formatDate } from "../utils/dateFormat";
import { toast } from "react-toastify";
import { loadModel } from "../utils/filterNsfw";
import Loader from "./Loader/Loader";
import axios from "axios";
import { createFileFromBlobUrl } from "../utils/CropImage";

const ImageCropper = ({ userInfo, profilePic, setProfilePic }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const validImageTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
  ];
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    if (file && validImageTypes.includes(file.type)) {
      setLoading(true);
      try {
        const image = await loadImage(file);
        const isNsfw = await loadModel(image);
        if (isNsfw) {
          toast.error("Image is not appropriate.");
          fileInputRef.current.value = "";
        } else {
          setImageSrc(image.src);
        }
      } catch (error) {
        console.error("Error loading image or model:", error);
        toast.error("Failed to load image or model.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Invalid file type. Only images are allowed.");
      fileInputRef.current.value = "";
    }
  };

  const loadImage = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => resolve(img);
        img.onerror = (error) => reject(error);
      };
      reader.readAsDataURL(file);
    });
  };

  const onCropComplete = useCallback(async (_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirmCrop = async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      resetState();
      setProfilePic(croppedImg);
      await uploadProfilePic(croppedImg);
     
    }
  };

  const uploadProfilePic = async (croppedImg) => {
    const fileName = "cropped_image.jpg";
    const mimeType = "image/jpeg";
    const file = await createFileFromBlobUrl(croppedImg, fileName, mimeType);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("profile_pic", file);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status === 200) {
        toast.success(response.data.body.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    }finally{
      setLoading(false);
    }
  };

  const resetState = () => {
    setImageSrc(null);
    fileInputRef.current.value = "";
  };

  const handleCancelCrop = () => {
    setImageSrc(null);
    setProfilePic(
      userInfo.profile_pic ||
        "https://www.clipartkey.com/mpngs/m/208-2089363_user-profile-image-png.png"
    );
  };

  return (
    <>
      <div className="relative flex justify-center align-middle m-auto">
        <img
          src={profilePic}
          alt="User Avatar"
          className="rounded-full size-32 mb-2 border-1 border-gray-400"
        />
        {userInfo.verified ? (
          <div
            className="absolute top-1 right-3 w-6 h-6 rounded-full border-2 border-white bg-blue-500 m-auto flex justify-center items-center p-2"
            aria-label="Verified"
          >
            <i className="fas fa-check text-white"></i>
          </div>
        ) : null}
      </div>
      <div className="text-center">
        <strong className="text-[18px]">{userInfo.name}</strong>
        <p className="mb-2 text-gray-400">
          @{userInfo.name.split(" ")[0] + userInfo.id}
        </p>
      </div>
      {loading && (
        <div className="flex justify-center  h-16 m-4 pr-14 ">
          <Loader />
        </div>
      )}
      {imageSrc && (
        <div className="relative w-full h-64 mb-4">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            accessibilityHint="Adjust image crop area using the controls provided."
          />
        </div>
      )}
      {imageSrc && (
        <div className="flex justify-center space-x-4 mb-4">
          <button
            onClick={handleConfirmCrop}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
          <button
            onClick={handleCancelCrop}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
        </div>
      )}
      {!loading && !imageSrc && (
        <button
          className="py-2 px-4 bg-orange-500 text-white rounded hover:bg-orange-400"
          onClick={handleUploadClick}
        >
          Upload New Photo
        </button>
      )}
      <input
        type="file"
        accept="image/*"
        onChange={onFileChange}
        ref={fileInputRef}
        className="hidden"
        aria-label="Upload Image"
      />
      <p className="text-sm mt-4 text-center p-2 rounded-xl bg-[#dde0e296]">
        Upload a new avatar. Larger image will be resized automatically.
        <br />
        <br />
        Maximum upload size is <strong>1 MB.</strong>
      </p>
      <p className="text-sm mt-2 text-center">
        Member Since: <strong>{formatDate(userInfo.joinedOn)}</strong>
      </p>
    </>
  );
};

export default ImageCropper;
