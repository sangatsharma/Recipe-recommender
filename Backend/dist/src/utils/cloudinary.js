"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpload = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("./config");
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.CLOUDINARY_API_KEY,
    api_secret: config_1.CLOUDINARY_API_SECRET
});
const handleUpload = async (file) => {
    const result = await cloudinary_1.v2.uploader.upload(file, {
        resource_type: "image",
        transformation: { crop: "thumb", width: 600, height: 600 }
    });
    return result;
};
exports.handleUpload = handleUpload;
