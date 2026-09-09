import { adminDb } from "../firebase-admin";
import { Blog } from "@/types/blog";

export const fetchBlogs = async (locale: string, tags: string[] = [], limitCount: number | null = null) => {
    let query: FirebaseFirestore.Query = adminDb.collection("blogs")
        .where("active", "==", true)
        .orderBy("dateCreated", "desc");

    if (tags.length > 0) {
        const tagField = `tags.${locale}`;
        query = query.where(tagField, "array-contains-any", tags);
    }

    if (limitCount) {
        query = query.limit(limitCount);
    }

    const querySnapshot = await query.get();

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        content: doc.data().content?.[locale] || doc.data().content?.en,
        tags: doc.data().tags?.[locale] || doc.data().tags?.[locale],
        editorsPick: doc.data().editorsPick ?? false,
    })) as Blog[];
};

export const fetchEditorsPickBlogs = async (locale: string, limitCount: number | null = null) => {
    let query: FirebaseFirestore.Query = adminDb.collection("blogs")
        .where("editorsPick", "==", true)
        .where("active", "==", true)
        .orderBy("dateCreated", "desc");

    if (limitCount) query = query.limit(limitCount);

    const querySnapshot = await query.get();

    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        content: doc.data().content?.[locale] || doc.data().content?.en,
        tags: doc.data().tags?.[locale] || doc.data().tags?.[locale],
        editorsPick: doc.data().editorsPick ?? false,
    })) as Blog[];
};

export const fetchSingleBlog = async (locale: string, slug: string) => {
    const docSnap = await adminDb.collection("blogs").doc(slug).get();

    if (!docSnap.exists) throw new Error("Blog not found");

    const data = docSnap.data()!;
    return {
        id: docSnap.id,
        ...data,
        tags: data.tags?.[locale] || data.tags?.["en"],
        content: data.content?.[locale] || data.content?.["en"]
    } as Blog;
};

export const getBlogsCount = async (): Promise<number> => {
    const countSnapshot = await adminDb.collection("blogs")
        .where("active", "==", true)
        .count()
        .get();

    return countSnapshot.data().count;
};

export const fetchBlogsByPageNumber = async (
    locale: string,
    pageNumber: number,
    limitCount: number
): Promise<Blog[]> => {
    const offsetCount = (pageNumber - 1) * limitCount;

    const snapshot = await adminDb.collection("blogs")
        .where("active", "==", true)
        .orderBy("dateCreated", "desc")
        .offset(offsetCount)
        .limit(limitCount)
        .get();

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        content: doc.data().content?.[locale] || doc.data().content?.en,
        tags: doc.data().tags?.[locale] || doc.data().tags?.en
    })) as Blog[];
};

export const getAllBlogIds = async (): Promise<string[]> => {
    const snapshot = await adminDb.collection("blogs")
        .where("active", "==", true)
        .select()
        .get();

    return snapshot.docs.map(doc => doc.id);
};