import * as admin from "firebase-admin";
import { cert, getApps, ServiceAccount } from "firebase-admin/app";
import serviceAccount from "./serviceAccount.json";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Auth, getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

const currentApps = getApps();

let db: Firestore | undefined = undefined;
let auth: Auth | undefined = undefined;
let adminStorage: any = undefined;
if (currentApps?.length <= 0) {
  const app: admin.app.App = admin.initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });

  db = getFirestore(app);
  auth = getAuth(app);
  adminStorage = getStorage(app);
} else {
  db = getFirestore(currentApps[0]);
  adminStorage = getStorage(currentApps[0]);
}

export { db, auth, adminStorage };
