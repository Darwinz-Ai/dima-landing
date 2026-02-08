import {
    collection,
    doc,
    DocumentData,
    getCountFromServer,
    getDoc,
    getDocs,
    limit,
    orderBy,
    query,
    QueryConstraint,
    QueryDocumentSnapshot,
    startAfter,
    where
} from "firebase/firestore";
import { db } from "../firebase";
import { CaseStudy } from "@/types";

export type CaseStudiesPage = {
    caseStudies: CaseStudy[];
    lastVisible: QueryDocumentSnapshot<DocumentData> | null;
    hasMore: boolean;
};


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

export const getCaseStudiesCount = async (): Promise<number> => {
    const collectionRef = collection(db, "case-studies");
    const q = query(collectionRef, where("flags.active", "==", true));
    const countSnapshot = await getCountFromServer(q);
    return countSnapshot.data().count;
};

export const fetchCaseStudiesPage = async (
    locale: string,
    limitCount: number,
    pageParam: QueryDocumentSnapshot<DocumentData> | null
): Promise<CaseStudiesPage> => {
    const collectionRef = collection(db, "case-studies");
    const baseConstraints: QueryConstraint[] = [where("flags.active", "==", true)];
    const constraints: QueryConstraint[] = [
        ...baseConstraints,
        orderBy("dateCreated", "desc"),
        limit(limitCount)
    ];

    if (pageParam) {
        constraints.push(startAfter(pageParam));
    }

    const snapshot = await getDocs(query(collectionRef, ...constraints));
    const caseStudies = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
            id: doc.id,
            ...data,
            content: data.content[locale] || data.content["en"]
        } as CaseStudy;
    });

    const lastVisible = snapshot.docs[snapshot.docs.length - 1] ?? null;

    return {
        caseStudies,
        lastVisible,
        hasMore: snapshot.size === limitCount
    };
};