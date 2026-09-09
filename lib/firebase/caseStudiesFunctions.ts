import { adminDb } from "../firebase-admin";
import { CaseStudy } from "@/types";

export const fetchSingleCaseStudy = async (locale: string, slug: string) => {
    const docSnap = await adminDb.collection("case-studies").doc(slug).get();

    if (!docSnap.exists) throw new Error("Case Study not found");

    const data = docSnap.data()!;
    return {
        id: docSnap.id,
        ...data,
        content: data.content?.[locale] || data.content?.["en"]
    } as CaseStudy;
};

export const getCaseStudiesCount = async (typeFilter?: string): Promise<number> => {
    let query: FirebaseFirestore.Query = adminDb.collection("case-studies")
        .where("flags.active", "==", true);

    if (typeFilter && typeFilter !== "all" && typeFilter !== "الكل") {
        query = query.where("type", "==", typeFilter);
    }

    const countSnapshot = await query.count().get();
    return countSnapshot.data().count;
};

export const fetchCaseStudiesByPageNumber = async (
    locale: string,
    pageNumber: number,
    limitCount: number,
    typeFilter?: string
): Promise<CaseStudy[]> => {
    const offsetCount = (pageNumber - 1) * limitCount;

    let query: FirebaseFirestore.Query = adminDb.collection("case-studies")
        .where("flags.active", "==", false)
        .orderBy("dateCreated", "desc");

    // Apply filter if it's not "all"
    if (typeFilter && typeFilter !== "all" && typeFilter !== "الكل") {
        query = query.where("type", "==", typeFilter);
    }

    const snapshot = await query
        .offset(offsetCount)
        .limit(limitCount)
        .get();

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            content: data.content?.[locale] || data.content?.en
        } as CaseStudy;
    });
};

export const getAllCaseStudyIds = async (): Promise<string[]> => {
    const snapshot = await adminDb.collection("case-studies")
        .where("flags.active", "==", true)
        .select()
        .get();

    return snapshot.docs.map(doc => doc.id);
};