import { v2 as cloudinary } from "cloudinary";
import { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } from "./config";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET
});

export const uploadToCloudinary = async (file: Buffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream({ resource_type: "auto" }, (err, res) => {
      if (err) reject(err);
      else resolve(res?.secure_url);
    }).end(file);
  });
};

export const handleUpload = async (file: string) => {
  const result = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
    transformation: { crop: "thumb", width: 600, height: 600 }
  });

  return result;
};

export const handleUploads = async (files: string[]) => {
  const urls: string[] = [];
  for (const file of files) {
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, res) => {
        if (err) reject(err);
        else resolve(urls.push(res?.secure_url as string));
      }).end(file);
    });
  }

  return urls;
};