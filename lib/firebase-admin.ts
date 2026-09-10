import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!getApps().length) {
    if (projectId && clientEmail && privateKey) {
        initializeApp({
            credential: cert({
                projectId,
                clientEmail,
                privateKey: privateKey.replace(/\\n/g, "\n"),
            }),
        });
    } else {
        console.warn("Firebase Admin credentials missing. Skipping initialization during build.");
    }
}

// afely export null during build, active instance during Cloud Run runtime
export const adminDb = getApps().length > 0 ? getFirestore() : null;