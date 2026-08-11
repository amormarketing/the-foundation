import Link from "next/link";

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-brand">
                <img
                    className="brand__logo"
                    src="/assets/thefoundlogowh.svg"
                    alt="The Foundation"
                    />
                <p>Wisdom · Strength · Truth</p>
            </div>
            <div className="footer-column">
                <span>Contact</span>
                <a href="tel:+11234567890">
                    123-456-7890
                </a>

                <a href="mailto:info@thefoundationus.com">
                    info@thefoundationus.com
                </a>
                <p>
                    500 Terry Francine St.
                    <br />
                    Los Angeles, CA 91367
                </p>
            </div>
            <div className="footer-column">
                <span>Explore</span>
                <Link href="/about">About</Link>
                <Link href="/#process">Initiatives</Link>
                <Link href="/#contact">Join us</Link>
            </div>
            <div className="footer-column footer-column--last">
                <Link href="/">Privacy policy</Link>
                <Link href="/">Accessibility statement</Link>
                <p>Made with Love © 2026 Amor Marketing LA</p>
            </div>
        </footer>
    );
}

