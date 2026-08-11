import Link from "next/link";
import styles from "globals.css";
import Image from "next/image";






export default function AboutPage() {
    return (
        <main>
            <section className="hero" id="about">
                    <div className="section-heading">
                        <h2>Our Founder</h2>
                    </div>

                    <img
                        src="/Ross-portrait.avif"
                        alt="Ross Pendergraft"

                        sizes="(max-width: 768px) 100vw, 50vw"
                    />

            </section>
        </main>
    );
}



