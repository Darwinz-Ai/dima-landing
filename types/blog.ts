import { Timestamp } from "firebase/firestore";

type BlogContent = { title: string; description: string; body: string };

export type Blog = {
    id: string;
    content: BlogContent;
    dateCreated: Timestamp;
    tags: string[];
    thumbnail: string;
    active: boolean;
    editorsPick: boolean;
};
