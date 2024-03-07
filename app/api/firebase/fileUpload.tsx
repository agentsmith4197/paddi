import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { app } from "./firebaseconfig";

const uploadFilesToFirebase = async (files: File[]) => {
  const storage = getStorage(app);

  try {
    const uploadPromises = files.map(async (file) => {
      const storageRef = ref(storage, file.name);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      return downloadURL;
    });

    const uploadResults = await Promise.all(uploadPromises);
    return uploadResults;
  } catch (error) {
    throw new Error('Error uploading files to Firebase Storage: ' + error);
  }
};

export default uploadFilesToFirebase;
