import Link from "next/link";
import styles from "./about.module.css";
import Image from "next/image";
import aboutHero from "@/public/Ross-portrait.avif";






export default function AboutPage() {
    return (
        <main className={styles.main}>
            <section className={styles.hero}>
                <section className={styles.about}>
                    <div className={styles.aboutHeading}>
                        <h1 className={styles.heading}>Our Founder</h1>
                        <p className={styles.lead}>
                            Ross Pendergraft is a humanitarian and philanthropist with a passion for leaving the world a better place than he's found it. Through his life's work, he has helped thousands of people get started on a more prosperous, focused journey.
                            <br/>
                            <br/>
                            Through The Foundation, Ross is fulfilling his ultimate legacy of educating the next generation of Americans, to best prepare them for the financial world.
                        </p>

                    </div>

                    <figure className={styles.visual}>
                        <div className={styles.imageFrame}>
                            <Image
                                alt="Ross Pendergraft"
                                className={styles.hero__image}
                                placeholder="blur"
                                priority
                                src={aboutHero}
                                sizes="(max-width: 860px) 100vw, 50vw"
                            />
                        </div>
                    </figure>
                </section>
            </section>
        </main>
    );
}



