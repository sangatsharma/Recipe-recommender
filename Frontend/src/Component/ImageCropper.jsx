import React, { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/CropImage";
import { formatDate } from "../utils/dateFormat";

const ImageCropper = ({ userInfo, profilePic, setProfilePic }) => {
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1.2);
  const [croppedImage, setCroppedImage] = useState(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  //input from hidden input file
  const fileInputRef = useRef(null);
  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setImageSrc(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback(
    async (_, croppedAreaPixels) => {
      setCroppedAreaPixels(croppedAreaPixels);
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setProfilePic(croppedImg);
    },
    [imageSrc]
  );

  const handleConfirmCrop = useCallback(async () => {
    if (imageSrc && croppedAreaPixels) {
      const croppedImg = await getCroppedImg(imageSrc, croppedAreaPixels);
      setCroppedImage(croppedImg);
      setProfilePic(croppedImg);
      setImageSrc(null);
    }
console.log("Cropped Image: ", croppedImage);

    //todo upload image to server
  }, [imageSrc, croppedAreaPixels]);

  const handleCancelCrop = () => {
    setImageSrc(null);
    setCroppedImage(null);
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
          className="rounded-full size-32 mb-2 border-1 border-gray-400 "
        />
        {userInfo.verified ? (
          <div
            className="absolute top-1 right-3 w-6 h-6
            rounded-full border-2 border-white bg-blue-500 m-auto flex justify-center items-center p-2"
          >
            <i className={`fas fa-check text-white`}></i>
          </div>
        ) : null}
      </div>
      <div className="text-center">
        <strong className="text-[18px]">{userInfo.name}</strong>
        <p className="mb-2 text-gray-400">
          @{userInfo.name.split(" ")[0] + userInfo.id}
        </p>
      </div>
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
      {!imageSrc && (
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
      />
      <p className="text-sm mt-4 text-center p-2 rounded-xl bg-[#dde0e296]">
        Upload a new avatar. Larger image will be resized automatically.
        <br />
        <br />
        Maximum upload size is <strong>1 MB.</strong>
      </p>
      <p className="text-sm mt-2 text-center">
        Member Since: <strong>{formatDate(new Date(userInfo.joinedOn))}</strong>
      </p>
    </>
  );
};

export default ImageCropper;
