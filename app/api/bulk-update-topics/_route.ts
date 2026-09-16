// import { NextResponse } from "next/server";
// import { adminDb } from "@/lib/firebase-admin";

// export async function POST(request: Request) {
//     try {
//         // Expecting an array like: [{ id: "blog-slug", topic: "media-monitoring" }, ...]
//         const updates = await request.json();
//         const batch = adminDb.batch();

//         updates.forEach((item: { id: string, topic: string }) => {
//             const docRef = adminDb.collection("blogs").doc(item.id);
//             // .update() ensures we only change the topic field and touch nothing else
//             batch.update(docRef, { topic: item.topic });
//         });

//         await batch.commit();
//         return NextResponse.json({ success: true, message: `Successfully updated ${updates.length} blogs.` });
//     } catch (error) {
//         console.error("Bulk update error:", error);
//         return NextResponse.json({ error: "Bulk update failed" }, { status: 500 });
//     }
// }