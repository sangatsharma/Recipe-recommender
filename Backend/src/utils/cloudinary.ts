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

export const multipleUpload = async (images: Express.Multer.File[]) => {
  const urls: string[] = [];
  for (const image of images) {

    const result: string = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "image" }, (err, res) => {
        if (err) reject(err);
        else resolve(res?.secure_url as string);
      }).end(image.buffer);
    });
    cloudinary.uploader.upload_stream({ resource_type: "auto" });

    // const result = await cloudinary.uploader.upload(dataURI);
    urls.push(result);
  }

  return urls;
};


export const handleUploads = async (files: string[]) => {
  const urls: string[] = [];

  const helper = async (file: string) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "auto" }, (err, res) => {
        if (err) reject(err);
        else resolve(res?.secure_url);
      }).end(file);
    });
  };

  for (const file of files) {
    const u: string = await helper(file) as string;
    urls.push(u);
  }

  return urls;
};