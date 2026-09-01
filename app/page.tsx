import ParallaxHeroImage from "@/app/components/ParallaxHeroImage";
// import Header from "@/components/Header";
// import Footer from "@/app/components/Footer";

const principles = [
  {
    number: "01",
    title: "Education",
    description: "Empowering through knowledge",
  },
  {
    number: "02",
    title: "Advocacy",
    description: "Voicing for change",
  },
  {
    number: "03",
    title: "Leadership",
    description: "Courage and deliberation",
  },
  {
    number: "04",
    title: "Action",
    description: "Changing what you Can.",
  },
];

const universityVoices = [
  {
    university: "LACCD",
    name: "Diana",
    featured: true,
  },
  {
    university: "Student voice",
    name: "Alex",
    quote:
      "I have seen firsthand the positive impact of Meyer Marilla's conservation efforts.",
  },
  {
    university: "Student voice",
    name: "Javier",
    quote:
      "The work Meyer Marilla does for the environment is inspiring and crucial.",
  },
];

// function FlameMark({ className = "" }: { className?: string }) {
//   return (
//     <svg
//       aria-hidden="true"
//       className={className}
//       viewBox="0 0 48 72"
//       fill="none"
//       xmlns="http://www.w3.org/2000/svg"
//     >
//       <path
//         d="M27.5 2C29 16.5 14 19.4 14 34c0 7.2 4.4 12.2 10.1 14.4-1.6-7.3 3.9-11.8 8.5-16.9C36.7 27 39 21.8 36.4 15.7 45 24.8 45.7 36.4 40.2 45.1 36.4 51 30.7 53.7 25 54.4V70h-4V54.3C10.1 53 3 45.3 3 35.5 3 20.7 17.9 15.3 27.5 2Z"
//         fill="currentColor"
//       />
//     </svg>
//   );
// }

function Brand({ hero = false }: { hero?: boolean }) {
  return (
    <div className={hero ? "brand brand--hero" : "brand"}>
      <img
          className="brand__logo"
          src = '/assets/thefoundlogowh.svg'
          alt='logo'
      />

      {hero ? (
        <span className="brand__motto">Educating our future.</span>
      ) : null}
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

export default function Home() {
  return (
    <>
      <main>
        <section className="hero" id="home" aria-labelledby="hero-title">
          <ParallaxHeroImage />
          <div className="hero__veil" />
          <div className="hero__content">
            <h1 className="sr-only" id="hero-title">
              The Foundation
            </h1>
            <Brand hero />
            <a className="button button--light" href="/about">
              About us <ArrowIcon />
            </a>
          </div>
          <a
            className="hero__scroll"
            href="#about"
            aria-label="Scroll to our mission"
          >
            <span>Discover</span>
            <span className="hero__scroll-line" />
          </a>
        </section>

        <section
          className="mission dark-section"
          id="about"
          aria-labelledby="mission-title"
        >
          <div className="section-number">01 / Mission</div>
          <h2 id="mission-title">Our Mission</h2>
          <div className="mission__copy">
            <p>
              The Foundation is intended to support the ongoing and additional
              education of our next generation. Support for our nation&apos;s
              youth is the strongest way to ensure that the future of the United
              States is treated with the respect, wisdom, and courage it needs,
              which are only brought about by an earnest understanding of its
              underlying systems.
            </p>
            <p>
              Our mission at the Foundation is to provide the education our
              youth needs in order to fulfill this necessity.
            </p>
            <a className="text-link text-link--light" href="#initiatives">
              Learn more <ArrowIcon />
            </a>
          </div>
        </section>

        <section
          className="initiatives light-section"
          id="initiatives"
          aria-labelledby="initiatives-title"
        >
          <div className="section-heading">
            <div>
              <div className="section-number">02 / Our approach</div>
              <h2 id="initiatives-title">Our Initiatives</h2>
            </div>
            <a className="button button--dark" href="#contact">
              Contact Us <ArrowIcon />
            </a>
          </div>

          <div className="principles">
            {principles.map((principle) => (
              <article className="principle" key={principle.title}>
                <span>{principle.number}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.description}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="progress__statement">
            <p>Progress is built through understanding.</p>
            <span>Knowledge becomes courage.
              Courage becomes action.</span>
          </div>
        </section>

        <section
          className="universities light-section"
          id="universities"
          aria-labelledby="universities-title"
        >
          <div className="section-number">03 / Community</div>
          <h2 id="universities-title">Universities Involved</h2>

          <div className="voices">
            {universityVoices.map((voice) => (
              <article
                className={`voice${voice.featured ? " voice--featured" : ""}`}
                key={voice.name}
              >
                <span className="voice__university">{voice.university}</span>
                {voice.quote ? (
                  <blockquote>“{voice.quote}”</blockquote>
                ) : (
                  <strong>LACCD</strong>
                )}
                <span className="voice__name">— {voice.name}</span>
              </article>
            ))}
          </div>
        </section>

        <section
          className="contact light-section"
          id="contact"
          aria-labelledby="contact-title"
        >
          <div className="contact__intro">
            <div className="section-number">04 / Connect</div>
            <h2 id="contact-title">Get in Touch</h2>
            <p>
              Feel free to contact us for any inquiries or to learn more about
              our conservation projects and initiatives.
            </p>
            <a
              className="contact__email"
              href="mailto:info@thefoundationus.org"
            >
              info@thefoundationus.org
            </a>
          </div>

          <form
            className="contact-form"
            action="mailto:info@thefoundationus.org"
            encType="text/plain"
            method="post"
          >
            <div className="form-row">
              <label>
                <span className="full-label">
                  First name <span aria-hidden="true">*</span>
                </span>

                <input
                  autoComplete="given-name"
                  name="firstName"
                  required
                  type="text"
                />
              </label>
              <label>
                <span className="full-label">
                  Last name <span aria-hidden="true">*</span>
                  </span>
                <input
                  autoComplete="family-name"
                  name="lastName"
                  required
                  type="text"
                />
              </label>
            </div>

            <label>
              <span className="full-label">
              Email <span aria-hidden="true">*</span>
                </span>

              <input
                autoComplete="email"
                name="email"
                // placeholder="Enter your email"
                required
                type="email"
              />
            </label>
            <label>
              Phone
              <input autoComplete="tel" name="phone" type="tel" />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} />
            </label>
            <button className="button button--dark form-submit" type="submit">
              Send message <ArrowIcon />
            </button>
          </form>
        </section>

        <section className="impact dark-section" aria-labelledby="impact-title">
          <div className="impact__label">Education access</div>
          <div>
            <h2 id="impact-title">Number of adults</h2>
            <p>
              Without a college degree who believe most Americans have access to
              a quality, affordable education.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
