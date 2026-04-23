import { socialMediaLinks } from "@/data/home-page";

function SocialMediaLinksList() {
    return (
        <div className="inline-flex items-center text-white">
            {socialMediaLinks.map(link => (
                <a href={link.href} target="_blank" aria-label={link.label} key={link.href} className="bg-muted-foreground hover:bg-muted-foreground/90 transition-colors duration-200 p-2 rounded-full cursor-pointer mx-1">
                    <link.icon size={24} />
                </a>
            ))}
        </div>
    );
}

export default SocialMediaLinksList;