import styles from "./about.module.css";
import Image from "next/image";
import aboutHero from "@/public/Ross-portrait.avif";

const boardMembers = [
    {
        name: "Ross Pendergraft",
        role: "Founder",
        image: "/Ross-portrait.avif"
    },
    {
        name: "Alexander Hessi",
        role: "President",
        image: "/assets/Alexander Hessi.webp",
    },
    {
        name: "Mateo Elvira",
        role: "Marketing",
        image: "/assets/Mateo Elvia.webp",
    },
    {
        name: "Nupur Kumar",
        role: "Treasury & Secretary",
        image: "/assets/nupur-kumar-2.jpg",
    },
];


export default function AboutPage() {
    return (
        <main className={styles.main}>
            <section className={styles.board} aria-labelledby="board-title">
                <div className={styles.boardIntro}>
                    <span className={styles.boardKicker}>01 / Leadership</span>
                    <h2 className={styles.boardTitle} id="board-title">Our Board</h2>
                </div>
                <div className={styles.boardGrid}>
                    {boardMembers.map((member, index) => (
                        <article className={styles.boardCard} key={member.name}>
                            <div
                                className={styles.boardPhoto}
                                style={
                                    member.image
                                        ? { backgroundImage: `url("${member.image}")` }
                                        : undefined
                                }
                                aria-label={`Photo placeholder for ${member.name}`}
                            >
                            </div>
                            <div className={styles.boardDetails}>
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </section>
            <section className={styles.hero} aria-labelledby="founder-title">
                <section className={styles.about}>
                    <div className={styles.founderIndex} aria-hidden="true">
                        <span>02</span>
                        <span>Founder</span>
                    </div>
                    <div className={styles.aboutHeading}>
                        <span className={styles.founderKicker}>The man behind the cause</span>
                        <h1 className={styles.heading} id="founder-title">Our Founder</h1>
                        <p className={styles.lead}>
                            Ross Pendergraft is a humanitarian and philanthropist with a passion for leaving the world a better place than he's found it. Through his life's work, he has helped thousands of people get started on a more prosperous, focused journey.
                            <br/>
                            <br/>
                            Through The Foundation, Ross is fulfilling his ultimate legacy of educating the next generation of Americans, to best prepare them for the financial world.
                        </p>
                        <div className={styles.founderRule} />
                        <p className={styles.founderNote}>A lasting investment in the ones who come next.</p>
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
                        <figcaption className={styles.caption}>Ross Pendergraft · Founding the next generation</figcaption>
                    </figure>
                </section>
            </section>
        </main>
    );
}
