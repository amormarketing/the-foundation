import Image from "next/image";
import Link from "next/link";
import donateHero from "@/public/donate-hero.webp";
import DonationForm from "./DonationForm";
import styles from "./donate.module.css";

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function DonatePage() {
  return (
    <main className={styles.main}>
      <section className={styles.donation} aria-labelledby="donate-title">
        <div className={styles.content}>
          <div className={styles.intro}>
            <span className={styles.eyebrow}>Invest in their future</span>
            <h1 className={styles.heading} id="donate-title">
              Donate
            </h1>
            <p className={styles.lead}>
              Help give the next generation the knowledge, confidence, and
              opportunity to build a stronger future.
            </p>
            <Link className="text-link" href="/scholarships#create">
              Create a named scholarship <ArrowIcon />
            </Link>
          </div>

          <DonationForm />
        </div>

        <figure className={styles.visual}>
          <div className={styles.imageFrame}>
            <Image
              alt="Graduate standing on stone steps"
              className={styles.image}
              placeholder="blur"
              priority
              sizes="(max-width: 860px) 100vw, 50vw"
              src={donateHero}
            />
          </div>
          <figcaption className={styles.caption}>
            <span>01</span>
            <p>Your support helps turn education into lasting opportunity.</p>
          </figcaption>
        </figure>
      </section>
    </main>
  );
}
