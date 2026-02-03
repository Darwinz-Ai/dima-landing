import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, where } from "firebase/firestore";
import { db } from "../firebase";
import { Blog } from "@/types/blog";

export const fetchBlogs = async (locale: string, tags: string[] = [], limitCount: number | null = null) => {
    const collectionRef = collection(db, "blogs");
    const constraints: QueryConstraint[] = [orderBy("dateCreated", "desc"), where("active", "==", true)];

    if (tags.length > 0) {
        const tagField = `tags.${locale}`;
        constraints.unshift(where(tagField, "array-contains-any", tags));
    }

    if (limitCount) {
        constraints.push(limit(limitCount));
    }

    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            content: data.content?.[locale] || data.content?.en,
            tags: data.tags?.[locale] || data.tags?.[locale],
            editorsPick: data.editorsPick ?? false,
        } as Blog;
    });
};

export const fetchEditorsPickBlogs = async (locale: string, limitCount: number | null = null) => {
    const collectionRef = collection(db, "blogs");
    const constraints: QueryConstraint[] = [
        where("editorsPick", "==", true),
        where("active", "==", true),
        orderBy("dateCreated", "desc"),
    ];
    if (limitCount) {
        constraints.push(limit(limitCount));
    }

    const q = query(collectionRef, ...constraints);
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
            id: doc.id,
            ...data,
            content: data.content?.[locale] || data.content?.en,
            tags: data.tags?.[locale] || data.tags?.[locale],
            editorsPick: data.editorsPick ?? false,
        } as Blog;
    });
};

export const fetchSingleBlog = async (locale: string, slug: string) => {
    const docRef = doc(db, "blogs", slug);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Blog not found");

    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data,
        content: data.content[locale] || data.content["en"]
    } as Blog
}
// Adding editorsPick flag for each blog
// export const setInitialEditorsPick = async () => {
//     const collectionRef = collection(db, "blogs");
//     const querySnapshot = await getDocs(collectionRef);
//     const batch = writeBatch(db);

//     querySnapshot.docs.forEach((document) => {
//         const docRef = doc(db, "blogs", document.id);
//         // This adds the field to the existing document without deleting other data
//         batch.update(docRef, { editorsPick: false });
//     });

//     try {
//         await batch.commit();
//         console.log("Success: All 30 blogs updated!");
//     } catch (error) {
//         console.error("Migration failed:", error);
//     }
// };