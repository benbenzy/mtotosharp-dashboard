import { firestore } from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { auth, config} from "firebase-functions/v1";

initializeApp(config().firebase)

export const onUserCreate=auth.user().onCreate(async(user)=>{
    if(user.email && user.email==="skivetinternational@gmail.com"){
        await firestore().doc(`users/${user.uid}`).create({
            admin:true
        })
        const customclaims={role:"admin"}
        try {
            await getAuth().setCustomUserClaims(user.uid,customclaims)  
        } catch (error) {
            console.log("failed to update user claims",error)
        }
        return
    }
    if(user.email && user.email==="marybenzy@gmail.com.com"){
        await firestore().doc(`users/${user.uid}`).create({
            author:true
        })
    }
    await firestore().doc(`users/${user.uid}`).create({
        author:false
    })
})
