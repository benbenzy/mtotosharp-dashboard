import { fireStorage } from "@/firebase/client";
import { uploadThumbnail } from "@/firebase/data/storage";
import { adminStorage, db } from "@/firebase/server";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { image, courseId } = await req.json();
  try {
    if (courseId) {
      if (!fireStorage) {
        console.log("no storage");
      }
      const apkimagesref = ref(fireStorage!, "images/" + courseId);
      const metadata = {
        contentType: "any",
      };

      const imageresult = uploadBytesResumable(apkimagesref, image, metadata);
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
    return NextResponse.json("success", { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json("failed to ulpoad image", { status: 500 });
  }
};
