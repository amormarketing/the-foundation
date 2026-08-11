import Link from "next/link";


function Brand() {
    return (
        <div className="brand">
            <img
                className="brand__logo"
                src="/assets/thefoundlogowh.svg"
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
                    <Link href="/#universities">Blog</Link>
                    <Link href="/#initiatives">Initiatives</Link>
                    <Link href="/donate">Donate</Link>
                </nav>

                <Link className="header-cta" href="/#contact">
                    Join us <ArrowIcon />
                </Link>

                <details className="mobile-menu">
                    <summary aria-label="Open navigation">
                        <span />
                        <span />
                    </summary>

                    <nav aria-label="Mobile navigation">
                        <Link href="/">Home</Link>
                        <Link href="/about">About</Link>
                        <Link href="/#universities">Blog</Link>
                        <Link href="/#process">Initiatives</Link>
                        <Link href="/donate">Donate</Link>
                    </nav>
                </details>
            </header>
    );
}
