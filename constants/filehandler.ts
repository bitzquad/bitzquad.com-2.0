/*    Imports    */
import axios from "axios";
import imageCompression from "browser-image-compression";

// upload given file to s3
const upload = async (key: string, file: any): Promise<boolean> => {
    const cred = await axios.post(`/api/v1/files/upload?key=${key}`);
    if (cred.status == 200 && cred.data) {
        const formData = new FormData();

        const fd = Object.entries({ ...cred.data.fields, file }) as [string, any];
        fd.forEach(([k, v]) => {
            formData.append(k, v);
        });
        const res = await axios.post(cred.data.url, formData);
        if (res.status >= 200 || res.status < 300) {
            return true;
        }
    }
    return false;
};

// get file from s3
const get = async (key: string, as: string = "download"): Promise<File | null> => {
    const file = await axios.get(`/api/v1/files/${as}?key=${key}`);
    if (file.status >= 200 || file.status < 300) {
        return file.data;
    }
    return null;
};
// delete file from s3
const remove = async (key: string): Promise<boolean> => {
    const res = await axios.delete(`/api/v1/files/remove?key=${key}`);
    if (res.status >= 200 || res.status < 300) {
        return true;
    }
    return false;
};

// default options for image compression
const imageCompressOptions = { maxSizeMB: 0.2, maxWidthOrHeight: 1920, initialQuality: 0.2, useWebWorker: true };

// compress and upload image to s3
const uploadImage = async (key: string, file: any, options: any = null): Promise<boolean> => {
    try {
        return await upload(key, await compressImage(file, options || imageCompressOptions));
    } catch (error) {
        console.log(error);
    }
    return false;
};
// compress image
const compressImage = async (file: any, options: any): Promise<File | null> => {
    try {
        return await imageCompression(file, options);
    } catch (error) {
        console.log(error);
    }
    return null;
};
// upload user profile picture
const uploadProfilePicture = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`users/usr-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 150, initialQuality: 0.5, useWebWorker: true });
};
// upload job thumbnail
const uploadJobThumbnail = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`jobs/job-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 1024, initialQuality: 0.2, useWebWorker: true });
};
// upload event thumbnail
const uploadEventThumbnail = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`events/evt-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 1024, initialQuality: 0.2, useWebWorker: true });
};
// upload event speaker picture
const uploadEventSpeakerPicture = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`events/spk-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 150, initialQuality: 0.5, useWebWorker: true });
};
// upload event video picture
const uploadEventVideoPicture = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`events/vdo-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 1024, initialQuality: 0.2, useWebWorker: true });
};
// upload company logo
const uploadCompanyThumbnail = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`companies/cl-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 250, initialQuality: 0.2, useWebWorker: true });
};
// upload company cover photo
const uploadCompanyCover = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`companies/cc-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 1024, initialQuality: 0.2, useWebWorker: true });
};
// upload blog thumbnail
const uploadBlogThumbnail = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`blogs/bp-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 1024, initialQuality: 0.2, useWebWorker: true });
};
// upload news thumbnail
const uploadNewsThumbnail = async (id: string, file: any): Promise<boolean> => {
    return uploadImage(`news/np-${id}.png`, file, { maxSizeMB: 0.2, maxWidthOrHeight: 1024, initialQuality: 0.2, useWebWorker: true });
};

export default {
    upload,
    get,
    remove,
    uploadImage,
    uploadProfilePicture,
    uploadJobThumbnail,
    uploadEventThumbnail,
    uploadEventSpeakerPicture,
    uploadEventVideoPicture,
    uploadCompanyThumbnail,
    uploadCompanyCover,
    uploadBlogThumbnail,
    uploadNewsThumbnail,
};
