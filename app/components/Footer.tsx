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
                <a href="tel:+13143479799">
                    +1 (314) 347-9799
                </a>

                <a href="mailto:info@thefoundationus.org">
                    info@thefoundationus.org
                </a>
                <p>
                    The Foundation US is a registered 501(c)(3) nonprofit.
                    <br />
                    EIN No. 1234567
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

