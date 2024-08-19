import { storage } from "firebase-admin";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { db } from "../server";

export const uploadThumbnail = async ({ image, courseId }: any) => {
  const storage = getStorage();
  if (courseId) {
    if (!storage) {
      console.log("no storage");
    }
    const apkimagesref = ref(storage!, "images/" + courseId);
    const apkimage = await fetch(image);

    const imageresult = uploadBytesResumable(apkimagesref, image);
    console.log("image result", imageresult);

    imageresult.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("progress", progress);
        switch (snapshot.state) {
          case "paused":
            break;
          case "running":
            break;
          default:
            break;
        }
      },
      (error) => {
        console.log("error here", error.code);
        //setError(error.code);
        switch (error.code) {
          case "storage/unauthorized":
            console.log("User doesn't have permission to access the object");
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          // ...

          case "storage/unknown":
            // Unknown error occurred, inspect error.serverResponse
            break;
        }
      },
      () => {
        getDownloadURL(imageresult.snapshot.ref).then(async (downloadurl) => {
          try {
            await db
              ?.collection("courses")
              .doc(courseId)
              .update({ thumbnail: downloadurl });
          } catch (error) {
            console.log("error updating document", error);
          }
        });
      }
    );
  }
};
