import { storage } from "./config";
import { ID } from "appwrite";

const BUCKET_ID = import.meta.env.VITE_BUCKET_IMAGES_ID;

export const uploadImageToBucket = async (file, bucketId = BUCKET_ID) => {
  const fileId = ID.unique();
  const res = await storage.createFile(bucketId, fileId, file);
  return res;
};

export const deleteImageFromBucket = async (fileId, bucketId = BUCKET_ID) => {
  return await storage.deleteFile(bucketId, fileId);
};

export const getFileViewUrl = (fileId, bucketId = BUCKET_ID) => {
  const endpoint = import.meta.env.VITE_ENDPOINT.replace(/\/$/, "");
  const project = import.meta.env.VITE_PROJECT_ID;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${project}`;
};
