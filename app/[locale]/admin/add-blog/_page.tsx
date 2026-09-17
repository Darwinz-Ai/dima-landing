// "use client";
// import { useState, useMemo } from "react";
// import ReactMarkdown from "react-markdown";
// import remarkGfm from "remark-gfm";
// import SectionWrapper from "@/components/shared/SectionWrapper";
// import { Link } from "@/i18n/navigation";

// const BLOG_TOPICS = [
//     { name: "Media Monitoring", slug: "media-monitoring" },
//     { name: "Social Listening & Brand Reputation", slug: "social-listening-and-reputation-monitoring" },
//     { name: "Monitoring & Analytics Tools", slug: "monitoring-and-analytics-tools" },
//     { name: "Competitor Analysis", slug: "competitor-analysis" },
//     { name: "Influencer Monitoring", slug: "influencer-monitoring" },
//     { name: "Crisis Management", slug: "crisis-management" },
// ];


// export default function AddBlogPage() {
//     const [jsonInput, setJsonInput] = useState("");
//     const [selectedTopic, setSelectedTopic] = useState(BLOG_TOPICS[0].slug);
//     const [status, setStatus] = useState("");
//     const [previewLocale, setPreviewLocale] = useState<"en" | "ar">("en");



//     // Automatically parse the JSON as you paste it to feed the preview
//     const parsedData = useMemo(() => {
//         try {
//             return JSON.parse(jsonInput);
//         } catch (e) {
//             return null; // Invalid JSON, don't update preview
//         }
//     }, [jsonInput]);

//     const handlePushToFirestore = async () => {
//         setStatus("Saving to Firestore...");
//         try {
//             if (!parsedData) throw new Error("Invalid JSON");

//             // Inject the selected topic into the payload
//             const finalPayload = {
//                 ...parsedData,
//                 topic: selectedTopic
//             };

//             const response = await fetch("/api/blogs", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(finalPayload),
//             });

//             if (!response.ok) throw new Error("Failed to save to database.");

//             setStatus(`✅ Success! Blog saved with ID: ${finalPayload.id}`);
//             setJsonInput("");
//         } catch (error) {
//             setStatus("❌ Error: Please ensure you pasted valid JSON.");
//         }
//     };

//     const currentPreview = parsedData?.content?.[previewLocale];

//     return (
//         <div className="flex flex-col lg:flex-row h-screen w-full bg-gray-50 text-black mt-24">
//             {/* LEFT COLUMN: Input & Controls */}
//             <div className="w-full lg:w-1/3 p-6 border-r border-gray-200 overflow-y-auto">
//                 <h1 className="text-2xl font-bold mb-4">Fast Blog Uploader</h1>

//                 <div className="flex justify-between items-center mb-2">
//                     <span className="font-semibold text-sm text-gray-600">JSON Payload</span>
//                     <button
//                         onClick={handlePushToFirestore}
//                         className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-md hover:bg-blue-700 transition"
//                     >
//                         Push to Firestore
//                     </button>
//                 </div>

//                 <textarea
//                     className="w-full h-[60vh] p-4 border border-gray-300 rounded-md font-mono text-sm shadow-sm"
//                     placeholder="Paste the AI-generated JSON payload here..."
//                     value={jsonInput}
//                     onChange={(e) => setJsonInput(e.target.value)}
//                 />

//                 <div className="flex flex-col mb-4">
//                     <label className="font-semibold text-sm text-gray-600 mb-2">Assign Topic</label>
//                     <select
//                         value={selectedTopic}
//                         onChange={(e) => setSelectedTopic(e.target.value)}
//                         className="w-full p-2 border border-gray-300 rounded-md bg-white text-sm"
//                     >
//                         {BLOG_TOPICS.map((topic) => (
//                             <option key={topic.slug} value={topic.slug}>
//                                 {topic.name}
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {status && (
//                     <p className={`mt-4 text-sm font-medium ${status.includes("❌") ? "text-red-600" : "text-green-600"}`}>
//                         {status}
//                     </p>
//                 )}
//             </div>

//             {/* RIGHT COLUMN: Live Preview */}
//             <div className="w-full lg:w-2/3 overflow-y-auto bg-white relative">
//                 <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center z-10 shadow-sm">
//                     <h2 className="text-lg font-bold text-gray-800">Live Preview</h2>
//                     <div className="flex bg-gray-100 rounded-md p-1">
//                         <button
//                             className={`px-3 py-1 rounded-sm text-sm font-medium transition ${previewLocale === "en" ? "bg-white shadow" : "text-gray-500"}`}
//                             onClick={() => setPreviewLocale("en")}
//                         >
//                             English
//                         </button>
//                         <button
//                             className={`px-3 py-1 rounded-sm text-sm font-medium transition ${previewLocale === "ar" ? "bg-white shadow" : "text-gray-500"}`}
//                             onClick={() => setPreviewLocale("ar")}
//                         >
//                             العربية
//                         </button>
//                     </div>
//                 </div>

//                 {currentPreview ? (
//                     <article dir={previewLocale === "ar" ? "rtl" : "ltr"} className="pb-24">
//                         <SectionWrapper className="mt-12">
//                             <div className="container mx-auto flex flex-col justify-center items-start gap-8">
//                                 <h2 className="bg-black text-white uppercase w-fit py-1 px-2 rounded-sm italic tracking-wide">
//                                     {previewLocale === "ar" ? "مدونات ديما" : "DIMA BLOGS"}
//                                 </h2>
//                                 <h1 className="text-2xl lg:text-[48px] font-normal">{currentPreview.title}</h1>
//                             </div>
//                         </SectionWrapper>

//                         <div className="min-h-[400px] flex justify-center items-center bg-linear-to-b from-[#95DDEE] via-primary to-[#95DDEE] mt-8">
//                             <div className="container mx-auto text-white p-4">
//                                 <h3 className="lg:text-2xl font-bold leading-relaxed text-center">{currentPreview.description}</h3>
//                             </div>
//                         </div>

//                         <SectionWrapper className="mt-8">
//                             <div className="container max-w-[1536px] mx-auto prose text-lg lg:text-xl p-4">
//                                 <ReactMarkdown
//                                     remarkPlugins={[remarkGfm]}
//                                     components={{
//                                         a: ({ href, children, ...props }) => (
//                                             <Link href={href || "#"} className="text-primary" {...props}>{children}</Link>
//                                         ),
//                                     }}
//                                 >
//                                     {currentPreview.body}
//                                 </ReactMarkdown>
//                             </div>
//                         </SectionWrapper>
//                     </article>
//                 ) : (
//                     <div className="flex h-full items-center justify-center text-gray-400">
//                         Paste valid JSON on the left to see the preview here.
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }