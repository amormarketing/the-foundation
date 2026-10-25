import type { Metadata } from "next";
import Link from "next/link";
import SponsorForm from "./SponsorForm";
import styles from "./scholarships.module.css";

export const metadata: Metadata = {
  title: "Scholarships | The Foundation",
  description:
    "The Foundation Scholarship Program removes financial barriers to education and gives scholars mentorship, leadership training, and real opportunities for impact.",
};

const objectives = [
  {
    title: "Expand access to education",
    description:
      "Remove financial and social barriers for students from underserved or underrepresented backgrounds.",
  },
  {
    title: "Develop leadership skills",
    description:
      "Train scholars in decision-making, communication, teamwork, and civic engagement.",
  },
  {
    title: "Foster social impact",
    description:
      "Encourage students to design and lead projects that address real community needs.",
  },
  {
    title: "Build sustainable partnerships",
    description:
      "Connect sponsors, universities, businesses, and mentors in support of student success.",
  },
  {
    title: "Create a leadership pipeline",
    description:
      "Build a network of scholars who will become future professionals, civic leaders, and Foundation ambassadors.",
  },
];

const awardFacts = [
  {
    label: "Award",
    value: "$1,000 or more",
    detail: "Based on your leadership impact and available funds.",
  },
  {
    label: "Review",
    value: "Every quarter",
    detail: "Submitted applications are evaluated every quarter of the year.",
  },
  {
    label: "Paid to",
    value: "Your school",
    detail:
      "Whenever practical, funds go directly to your school for tuition, fees, books, and supplies.",
  },
];

const eligibility = [
  "Be between 14 and 24 years old when you apply.",
  "Be a US citizen, permanent resident, or otherwise legally eligible to attend school in the United States.",
  "Be a high school junior or senior, or a current or incoming student at a college, university, trade school, or vocational program.",
  "Show a consistent record of leadership in extracurricular activities, community service, or other initiatives.",
  "Hold a minimum GPA of 2.0 on a 4.0 scale.",
];

const evaluation = [
  "The clarity and impact of your leadership experience",
  "Originality and reflection in your answers",
  "Academic performance",
  "What your references say about you",
  "Your overall commitment to making a difference",
];

const features = [
  {
    title: "Leadership workshops",
    description:
      "Build skills in decision-making, problem-solving, critical thinking, effective communication, and teamwork.",
  },
  {
    title: "Networking",
    description:
      "Meet entrepreneurs, business leaders, and professionals, and start building connections that will support your career.",
  },
  {
    title: "Community involvement",
    description:
      "Take part in The Foundation's social projects and lead your own, putting your leadership skills to work in the real world.",
  },
  {
    title: "Career opportunities",
    description:
      "Internships, job shadowing, and industry exposure that prepare you for professional challenges after graduation.",
  },
  {
    title: "Recognition",
    description:
      "Your achievements are celebrated at The Foundation's Annual Gala and shared across our platforms.",
  },
];

const selectionSteps = [
  {
    title: "Independent review",
    description:
      "A selection committee of at least three people, appointed by our Board, reviews every eligible application. Members disclose any conflict of interest and step aside from applications they are connected to.",
  },
  {
    title: "Standardized scoring",
    description:
      "Each application is scored with the same rubric, based only on the published criteria for that scholarship. Finalists may be interviewed.",
  },
  {
    title: "Board approval",
    description:
      "The committee recommends recipients to the Board of Directors, which confirms that every award meets Foundation policy and IRS requirements.",
  },
  {
    title: "Notification",
    description:
      "Recipients are notified in writing and may be asked to verify their enrollment before funds are released.",
  },
];

const sponsorSteps = [
  "Define the eligibility criteria, such as age range, GPA, background, or field of study.",
  "Set the award amount. We recommend at least $1,000.",
  "Decide whether it will be a one-time or renewable award.",
  "Choose any focus areas, such as first-generation students, STEM, the arts, or civic leadership.",
  "Commit to supporting students with mentorship or networking, not only funding.",
  "Partner with The Foundation for promotion, administration, and recognition.",
];

const pad = (index: number) => String(index + 1).padStart(2, "0");

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

export default function ScholarshipsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero} aria-labelledby="scholarships-title">
        <div className={styles.heroCopy}>
          <span className={styles.eyebrow}>01 / The Foundation Scholarship Program</span>
          <h1 className={styles.heading} id="scholarships-title">
            Scholarships
          </h1>
          <p className={styles.lead}>
            We remove financial barriers to education and give the next
            generation of leaders mentorship, leadership training, and real
            opportunities to make an impact.
          </p>
          <p className={styles.body}>
            Unlike traditional scholarships that only provide money, The
            Foundation brings recipients into a supportive network of sponsors,
            mentors, and community partners, where they gain practical skills,
            career exposure, and opportunities to serve their communities.
          </p>
          <div className={styles.actions}>
            <Link className="button button--dark" href="#leadership-excellence">
              View scholarships <ArrowIcon />
            </Link>
            <Link className={`text-link ${styles.inlineLink}`} href="#build">
              Build your own scholarship <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className={styles.objectives}>
          <h2 className={styles.listTitle}>Our objectives</h2>
          <ol className={styles.numberedList}>
            {objectives.map((objective, index) => (
              <li key={objective.title}>
                <span>{pad(index)}</span>
                <div>
                  <h3>{objective.title}</h3>
                  <p>{objective.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className={`dark-section ${styles.section}`}
        id="leadership-excellence"
        aria-labelledby="leadership-title"
      >
        <div className={styles.inner}>
          <div className="section-number">02 / Apply</div>
          <h2 className={styles.sectionTitle} id="leadership-title">
            Leadership Excellence Scholarship
          </h2>
          <p className={styles.sectionLead}>
            For outstanding students who have shown exceptional leadership in
            their school, community, or personal endeavors, and who have made a
            positive impact through initiative, vision, and the ability to
            inspire others.
          </p>

          <dl className={styles.facts}>
            {awardFacts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>
                  <strong>{fact.value}</strong>
                  <span>{fact.detail}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className={styles.columns}>
            <div>
              <h3 className={styles.listTitle}>Who can apply</h3>
              <ul className={styles.bulletList}>
                {eligibility.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className={styles.listTitle}>How applications are evaluated</h3>
              <ul className={styles.bulletList}>
                {evaluation.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.applyPanel}>
            <div>
              <h3>How to apply</h3>
              <p>
                Apply online in about 10 minutes. You&apos;ll tell us about up
                to three times you led something and name one person who can
                confirm it. Finalists may be asked for an academic transcript,
                a résumé or activity sheet, letters of recommendation, and a
                copy of a driver&apos;s license or state ID.
              </p>
            </div>
            <Link className={`button ${styles.applyButton}`} href="/apply">
              Start your application <ArrowIcon />
            </Link>
          </div>
        </div>
      </section>

      <section
        className={`light-section ${styles.section}`}
        id="school-of-leaders"
        aria-labelledby="school-title"
      >
        <div className={styles.inner}>
          <div className="section-number">03 / What scholars receive</div>
          <h2 className={styles.sectionTitle} id="school-title">
            The Foundation School of Leaders
          </h2>
          <p className={styles.sectionLead}>
            Every Foundation scholar receives support for their education and
            joins the School of Leaders, where the scholarship becomes real
            experience, real connections, and real opportunities.
          </p>

          <div className={styles.features}>
            {features.map((feature, index) => (
              <article className={styles.feature} key={feature.title}>
                <span>{pad(index)}</span>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        className={`dark-section ${styles.section}`}
        id="selection"
        aria-labelledby="selection-title"
      >
        <div className={styles.inner}>
          <div className="section-number">04 / Selection</div>
          <h2 className={styles.sectionTitle} id="selection-title">
            How recipients are chosen
          </h2>
          <p className={styles.sectionLead}>
            Every scholarship is awarded under a selection policy adopted by our
            Board of Directors, so the process is fair, impartial, and the same
            for every applicant.
          </p>

          <ol className={styles.steps}>
            {selectionSteps.map((step, index) => (
              <li key={step.title}>
                <span>{pad(index)}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>

          <p className={styles.smallPrint}>
            The Foundation US administers all scholarship programs without
            unlawful discrimination. Committee members do not consider race,
            religion, gender, national origin, political affiliation,
            disability, or personal relationships.
          </p>
        </div>
      </section>

      <section
        className={`light-section ${styles.section}`}
        id="build"
        aria-labelledby="build-title"
      >
        <div className={`${styles.inner} ${styles.split}`}>
          <div>
            <div className="section-number">05 / Partner with us</div>
            <h2 className={styles.sectionTitle} id="build-title">
              Build your own scholarship
            </h2>
            <p className={styles.sectionLead}>
              Building your own scholarship with The Foundation is a meaningful
              way to leave a legacy and make a lasting impact on future
              generations.
            </p>
            <p className={styles.body}>
              Your scholarship can reflect your values and support students in
              the areas that matter most to you, with recognition at Foundation
              events and across our platforms. You can connect with students
              directly and guide them as they grow into leaders. Start with a
              single scholarship and expand over time.
            </p>
            <div className={styles.actions}>
              <Link className="button button--dark" href="#build-form">
                Start a conversation <ArrowIcon />
              </Link>
              <Link className={`text-link ${styles.inlineLink}`} href="/donate">
                Or make a donation <ArrowIcon />
              </Link>
            </div>
          </div>

          <div>
            <h3 className={styles.listTitle}>What it involves</h3>
            <ol className={styles.numberedList}>
              {sponsorSteps.map((step, index) => (
                <li key={step}>
                  <span>{pad(index)}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <p className={styles.note}>
              Named scholarships follow your written criteria and are awarded
              through the same independent selection committee and Board
              approval as every Foundation scholarship.
            </p>
          </div>
        </div>
        <div className={styles.inner} id="build-form">
          <SponsorForm />
        </div>
      </section>
    </main>
  );
}
