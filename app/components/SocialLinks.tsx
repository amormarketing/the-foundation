const socialLinks = [
    {
        label: "LinkedIn",
        href: "https://www.linkedin.com/company/the-foundation-us/",
        icon: "/assets/icons/SVG/blackAsset 33-linkedin.svg",
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/thefoundation.us/",
        icon: "/assets/icons/SVG/blackAsset 34-ig.svg",
    },
    {
        label: "Facebook",
        href: "https://www.facebook.com/profile.php?id=61594048237443",
        icon: "/assets/icons/SVG/blackAsset 35-facebook.svg",
    },
];

export default function SocialLinks({ className }: { className: string }) {
    return (
        <div className={className}>
            {socialLinks.map((link) => (
                <a href={link.href} aria-label={link.label} key={link.label}>
                    <img src={link.icon} alt="" />
                </a>
            ))}
        </div>
    );
}
