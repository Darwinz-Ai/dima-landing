import { collection, doc, getDoc, getDocs, limit, orderBy, query, QueryConstraint, where } from "firebase/firestore";
import { db } from "../firebase";
import { CaseStudy } from "@/types";


export const fetchSingleCaseStudy = async (locale: string, slug: string) => {
    const docRef = doc(db, "case-studies", slug);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) throw new Error("Case Study not found");

    const data = docSnap.data();
    return {
        id: docSnap.id,
        ...data,
        content: data.content[locale] || data.content["en"]
    } as CaseStudy
}

type CaseStudyFilters = {
    featured?: boolean;
};

export const fetchCaseStudies = async (locale: string, filters: CaseStudyFilters = {}, limitCount: number | null = null) => {
    const constraints: QueryConstraint[] = [
        where("flags.active", "==", true),
        ...(filters.featured ? [where("flags.featured", "==", true)] : []),
        orderBy("dateCreated", "desc"),
    ];

    if (limitCount) {
        constraints.push(limit(limitCount));
    }

    const snapshot = await getDocs(query(collection(db, "case-studies"), ...constraints));

    return snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            content: data.content[locale] || data.content["en"]
        } as CaseStudy;
    });
};