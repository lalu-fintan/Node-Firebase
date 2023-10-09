import admin from "../config/firebase/firebase-auth";

export const imageToUploadOnFireBase = async (
  imageData: Buffer,
  fileName: string
): Promise<string> => {
  try {
    const bucket = admin.storage().bucket();

    const file = bucket.file(fileName);

    await file.save(imageData);

    const signurl = await file.getSignedUrl({
      action: "read",
      expires: "03-12-2495",
    });
    return signurl[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
};
