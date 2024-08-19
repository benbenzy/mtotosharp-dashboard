import { User } from "@prisma/client";
import { getAuth } from "firebase-admin/auth";
import { db } from "../server";
import { UserProfile } from "firebase/auth";
import { UserProps } from "@/app/dashboard/users/[id]/page";

export async function getAllUsers() {
  const page = "1";
  const limit = 10;
  try {
    const all = await getAuth().listUsers();
    return all.users.map((user) => {
      return {
        id: user.uid,
        provider: user.providerData,
        name: user.displayName,
        role: !user.customClaims ? "no role" : user.customClaims["role"],
        phone: user.phoneNumber,
        email: user.email,
        createdAt: user.metadata.creationTime,
      };
    });
  } catch (error) {
    console.log("error in function get all users", error);
  }
}
export async function createUser({
  firstName,
  lastName,
  email,
  phone,
  role,
}: UserProps) {
  try {
    const user = await getAuth().createUser({
      displayName: firstName + " " + lastName,
      phoneNumber: phone,
      email,
      password: process.env.AUTH_SECRET,
      status: "active",
      isMember: false,
      walletBalance: 0,
      pointsBalance: 0,
      emailVerified: false,
    });
    if (user.uid) {
      getAuth().setCustomUserClaims(user.uid, { role });
    }
    const dbUser = await db
      ?.collection("users")
      .doc(user?.uid)
      .set({
        image: user?.photoURL || "",
        email,
        phoneNumber: phone,
        displayName: firstName + " " + lastName,
        disabled: false,
        emailVerified: false,
        isMember: false,
        role: role,
        createdAt: user?.metadata.creationTime,
      });
    return dbUser;
  } catch (error) {
    console.log("error at function createUser", error);
  }
}
export const getUserByid = async (id: string) => {
  try {
    const ref = await db?.collection("users").doc(id).get();
    const user = ref?.data();
    return user;
  } catch (error) {
    console.log("failed to fetch user at function getUserByid", error);
    throw new Error("failed to fetch user at function getUserByid");
  }
};
export const getUserWallet = async (id: string) => {
  try {
    const ref = await db
      ?.collection("users")
      .doc(id)
      .collection("wallets")
      .get();
    const wallets = ref?.docs.map((item) => {
      return {
        id: item.id,
        ...item.data(),
      };
    });
    return wallets;
  } catch (error) {}
};
