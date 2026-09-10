import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

// Only initialize if all credentials exist
if (!getApps().length && projectId && clientEmail && privateKey) {
    initializeApp({
        credential: cert({
            projectId,
            clientEmail,
            privateKey: privateKey.replace(/\\n/g, "\n"),
        }),
    });
}

// Cast as Firestore so TypeScript stays happy during build time
export const adminDb = (getApps().length > 0 ? getFirestore() : null) as unknown as Firestore;