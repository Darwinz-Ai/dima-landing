import { adminDb } from "../firebase-admin";
import { Blog } from "@/types/blog";
import { DocumentSnapshot, QueryDocumentSnapshot } from "firebase-admin/firestore";

const formatBlogDoc = (doc: DocumentSnapshot | QueryDocumentSnapshot, locale: string): Blog => {
    const data = doc.data() || {};

    return {
        id: doc.id,
        ...data,
        content: data.content?.[locale] || data.content?.en,
        tags: data.tags?.[locale] || data.tags?.en,
        editorsPick: data.editorsPick ?? false,
    } as Blog;
};


// --- FETCH FUNCTIONS --- //

export const fetchBlogs = async (locale: string, tags: string[] = [], limitCount: number | null = null) => {
    let query: FirebaseFirestore.Query = adminDb.collection("blogs")
        .where("active", "==", true)
        .orderBy("dateCreated", "desc");

    if (tags.length > 0) query = query.where(`tags.${locale}`, "array-contains-any", tags);
    if (limitCount) query = query.limit(limitCount);

    const querySnapshot = await query.get();
    return querySnapshot.docs.map((doc) => formatBlogDoc(doc, locale));
};

export const fetchEditorsPickBlogs = async (locale: string, limitCount: number | null = null) => {
    let query: FirebaseFirestore.Query = adminDb.collection("blogs")
        .where("editorsPick", "==", true)
        .where("active", "==", true)
        .orderBy("dateCreated", "desc");

    if (limitCount) query = query.limit(limitCount);

    const querySnapshot = await query.get();
    return querySnapshot.docs.map((doc) => formatBlogDoc(doc, locale));
};

export const fetchSingleBlog = async (locale: string, slug: string) => {
    const docSnap = await adminDb.collection("blogs").doc(slug).get();
    if (!docSnap.exists) throw new Error("Blog not found");

    return formatBlogDoc(docSnap, locale);
};

export const fetchBlogsByPageNumber = async (locale: string, pageNumber: number, limitCount: number) => {
    const offsetCount = (pageNumber - 1) * limitCount;
    const snapshot = await adminDb.collection("blogs")
        .where("active", "==", true)
        .orderBy("dateCreated", "desc")
        .offset(offsetCount)
        .limit(limitCount)
        .get();

    return snapshot.docs.map((doc) => formatBlogDoc(doc, locale));
};

export const fetchBlogsByTopicAndPage = async (locale: string, topicSlug: string, pageNumber: number, limitCount: number) => {
    const offsetCount = (pageNumber - 1) * limitCount;
    const snapshot = await adminDb.collection("blogs")
        .where("active", "==", true)
        .where("topic", "==", topicSlug)
        .orderBy("dateCreated", "desc")
        .offset(offsetCount)
        .limit(limitCount)
        .get();

    return snapshot.docs.map((doc) => formatBlogDoc(doc, locale));
};


// --- AGGREGATION & UTILS --- //

export const getBlogsCount = async (): Promise<number> => {
    const countSnapshot = await adminDb.collection("blogs").where("active", "==", true).count().get();
    return countSnapshot.data().count;
};

export const getTopicBlogsCount = async (topicSlug: string): Promise<number> => {
    const countSnapshot = await adminDb.collection("blogs")
        .where("active", "==", true)
        .where("topic", "==", topicSlug)
        .count()
        .get();
    return countSnapshot.data().count;
};

export const getAllBlogIds = async (): Promise<string[]> => {
    const snapshot = await adminDb.collection("blogs").where("active", "==", true).select().get();
    return snapshot.docs.map(doc => doc.id);
};