import { learnVideos } from "@/data/blogs";
import { Play } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { socialMediaLinks } from "@/data/home-page";

function VideosSection({ title }: { title: string }) {
    const t = useTranslations("Blogs.videosSection");
    return (
        <div className="container mx-auto flex justify-center items-center gap-8 rounded-4xl bg-muted py-12 my-8">
            <div className="flex flex-col justify-center gap-8 p-4 max-w-6xl w-full">
                {/* Title */}
                <h2 className="text-lg md:text-2xl font-bold">{title}</h2>

                {/* Videos grid */}
                <ul className={"grid grid-cols-1 lg:grid-cols-2 gap-8"}>
                    {learnVideos.map((video, i) => {
                        const Thumbnail = (
                            <figure className="flex justify-center items-center group">
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                                    <Image
                                        src={video.src}
                                        alt={video.alt || `video ${i + 1}`}
                                        fill
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                        className="object-cover"
                                        quality={90}
                                    />
                                    {
                                        video.href && (
                                            <div className="absolute inset-0 flex justify-center items-center">
                                                <div className="bg-black/50 p-4 rounded-full group-hover:bg-black/70 transition">
                                                    <Play className="text-white" />
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </figure>
                        );

                        return (
                            <li key={i}>
                                {video.href ? (
                                    <Link href={video.href} target="_blank">{Thumbnail}</Link>
                                ) : (
                                    Thumbnail
                                )}
                            </li>
                        );
                    })}

                </ul>


                <div className="inline-flex justify-end items-center gap-2">
                    <p className="text-lg font-bold text-end">{t("follow")}:</p>
                    <div className="inline-flex items-center gap-2">
                        {socialMediaLinks.map((social) => (
                            <Link
                                key={social.href}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <social.icon size={32} />
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideosSection;
