import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const apps = getApps();

if (!apps.length) {
    // 1. Local Development
    if (process.env.FIREBASE_PRIVATE_KEY) {
        initializeApp({
            credential: cert({
                projectId: process.env.FIREBASE_PROJECT_ID as string,
                clientEmail: process.env.FIREBASE_CLIENT_EMAIL as string,
                privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
            }),
        });
    }
    // 2. Cloud Run Production
    else {
        initializeApp();
    }
}

export const adminDb = getFirestore();