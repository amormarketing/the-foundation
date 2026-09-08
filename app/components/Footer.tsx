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
                <p>Educating our future.</p>
            </div>
            <div className="footer-column">
                <span>Contact</span>
                <a href="tel:+13143479799">
                    +1 (314) 347-9799
                </a>

                <a href="mailto:info@thefoundationus.org">
                    info@thefoundationus.org
                </a>

                <div className="footer-icons">
                    <a href="https://www.linkedin.com/company/the-foundation-us/" aria-label="LinkedIn">
                        <img
                            src="/assets/icons/SVG/blackAsset 33-linkedin.svg"
                            alt="LinkedIn"
                        />
                    </a>

                    <a href="https://www.instagram.com/thefoundation.us/" aria-label="Instagram">
                        <img
                            src="/assets/icons/SVG/blackAsset 34-ig.svg"
                            alt="Instagram"
                        />
                    </a>

                    <a href="https://www.facebook.com/profile.php?id=61594048237443" aria-label="Facebook">
                        <img
                            src="/assets/icons/SVG/blackAsset 35-facebook.svg"
                            alt="Facebook"
                        />
                    </a>

                </div>

                <p>
                    The Foundation US is a registered{" "}
                    <a href="/assets/IRS 501c3 - The Foundation US.pdf" target="_blank" rel="noopener noreferrer">
                        501(c)(3) nonprofit.
                    </a>
                    <br />
                    <br />
                    EIN No. 42-3732209
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

