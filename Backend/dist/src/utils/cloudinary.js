"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUploads = exports.handleUpload = exports.uploadToCloudinary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = require("./config");
cloudinary_1.v2.config({
    cloud_name: config_1.CLOUDINARY_CLOUD_NAME,
    api_key: config_1.CLOUDINARY_API_KEY,
    api_secret: config_1.CLOUDINARY_API_SECRET
});
const uploadToCloudinary = async (file) => {
    return new Promise((resolve, reject) => {
        cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (err, res) => {
            if (err)
                reject(err);
            else
                resolve(res?.secure_url);
        }).end(file);
    });
};
exports.uploadToCloudinary = uploadToCloudinary;
const handleUpload = async (file) => {
    const result = await cloudinary_1.v2.uploader.upload(file, {
        // resource_type: "",
        transformation: { crop: "thumb", width: 600, height: 600 }
    });
    return result;
};
exports.handleUpload = handleUpload;
const handleUploads = async (files) => {
    const urls = [];
    const helper = async (file) => {
        return new Promise((resolve, reject) => {
            cloudinary_1.v2.uploader.upload_stream({ resource_type: "auto" }, (err, res) => {
                if (err)
                    reject(err);
                else
                    resolve(res?.secure_url);
            }).end(file);
        });
    };
    for (const file of files) {
        const u = await helper(file);
        urls.push(u);
    }
    return urls;
};
exports.handleUploads = handleUploads;
