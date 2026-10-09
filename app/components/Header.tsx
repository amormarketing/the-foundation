import Link from "next/link";
import SocialLinks from "@/app/components/SocialLinks";


function Brand() {
    return (
        <div className="brand">
            <img
                className="brand__logo"
                src="/assets/wordmark-ink.svg"
                alt="The Foundation"
            />
        </div>
    );
}


function ArrowIcon() {
    return (
        <svg aria-hidden="true" viewBox="0 0 24 24">
            <path d="M5 12h13M13 6l6 6-6 6" />
        </svg>
    );
}

export default function Header() {
    return (
            <header className="site-header">
                <Link
                    className="header-brand"
                    href="/"
                    aria-label="The Foundation home"
                >
                    <Brand />
                </Link>

                <nav className="desktop-nav" aria-label="Primary navigation" >
                    <Link href="/">Home</Link>
                    <Link href="/about">About</Link>
                    <Link href="/#initiatives">Initiatives</Link>
                    <Link href="/donate">Donate</Link>
                </nav>

                <div className="header-end">
                    <SocialLinks className="header-social" />
                    <Link className="header-cta" href="/apply">
                        Apply <ArrowIcon />
                    </Link>
                </div>

                <details className="mobile-menu">
                    <summary aria-label="Open navigation">
                        <span />
                        <span />
                    </summary>

                    <nav aria-label="Mobile navigation">
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                            <Link href="/#initiatives">Initiatives</Link>
                        <Link href="/donate">Donate</Link>
                        <Link href="/apply">Apply</Link>
                        <SocialLinks className="mobile-menu__social" />
                    </nav>
                </details>
            </header>
    );
}
