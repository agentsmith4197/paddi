// handleFileUpload.ts

import { storage } from "./appwriteConfig";

const uploadFileToAppwrite = async (file: File): Promise<string> => {
  const storageId = process.env.NEXT_APPWRITE_STORAGE_ID ?? '';
  console.log(storageId)

  try {
    const uploadedFile = await storage.createFile(
      storageId, // Provide your storage ID here
      file.name,
      file
    );
    // Extract the ID or URL from the uploadedFile object
    const fileId = uploadedFile.$id || ''; // Use appropriate property name
    return fileId; // Return the ID or URL of the uploaded file
  } catch (error) {
    throw new Error('Error uploading file to Appwrite: ' + error);
  }
};

export default uploadFileToAppwrite;
