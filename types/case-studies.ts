import { Timestamp } from "firebase/firestore";

export type CaseStudyAttributes = {
    title: string;
    subTitle: string;
};

export type CaseStudyValue = number | string;

export type CaseStudyCompanyProfile = {
    industry: string;
    organization: string;
    headquarters: string;
}

export type CaseStudyBodyItem = {
    header: string;
    body: string;
    image?: string
}

export type CaseStudyBody = {
    challenge: CaseStudyBodyItem;
    solution: CaseStudyBodyItem;
    result: CaseStudyBodyItem;
}

export type CaseStudyMetrics = {
    title: string;
    value: CaseStudyValue;
    suffix: string;
};

export type CaseStudyHeadline = {
    text: string;
    highlight_blue: string;
    highlight_orange: string;
    highlight_pink: string
}

export type CaseStudyContent = {
    companyProfile: CaseStudyCompanyProfile;
    body: CaseStudyBody;
    metrics: CaseStudyMetrics[];
    headline: CaseStudyHeadline;
};

export type CaseStudyFlags = {
    featured: boolean;
    active: boolean;
};

export type CaseStudy = {
    id: string;
    content: CaseStudyContent;
    flags: CaseStudyFlags;
    dateCreated: Timestamp;
    type: "use cases" | "customer success stories"
    ogImage?: string;
};
