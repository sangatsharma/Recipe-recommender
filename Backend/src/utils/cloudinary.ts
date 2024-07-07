import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } from "./config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const handleUpload = async (file: string) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    transformation: { crop: "thumb", width: 600, height: 600 }
  });

  return result;
};