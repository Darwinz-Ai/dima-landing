// import { NextResponse } from "next/server";
// import { adminDb } from "@/lib/firebase-admin";
// import { Timestamp } from "firebase-admin/firestore";

// export async function POST(request: Request) {
//     try {
//         const data = await request.json();
//         const { id, content, tags, thumbnail } = data;

//         if (!id || !content) {
//             return NextResponse.json({ error: "Missing required fields (id or content)" }, { status: 400 });
//         }

//         const blogData = {
//             content,
//             tags,
//             thumbnail: thumbnail || "",
//             active: false,
//             editorsPick: false,
//             dateCreated: Timestamp.now(),
//         };

//         // .set() creates the document with your custom slug ID, or overwrites it if it exists
//         await adminDb.collection("blogs").doc(id).set(blogData);

//         return NextResponse.json({ success: true, id }, { status: 201 });
//     } catch (error) {
//         console.error("Error creating blog:", error);
//         return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
//     }
// }