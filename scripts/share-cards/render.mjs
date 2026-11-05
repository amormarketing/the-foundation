// Renders the link-preview cards (og:image) that iMessage, WhatsApp, LinkedIn,
// Slack, Facebook and X show when someone shares a thefoundationus.org link.
//
//   npm run share-cards
//
// Writes public/share/<name>.jpg. lib/seo.ts points each page at its card
// (with alt text) and carries the cache-busting version.
//
// Static JPEG on purpose: next/og only emits PNG, and a photo card as PNG is
// ~600 KB. WhatsApp skips previews much over ~300 KB.
//
// Layout: 1200x630. WhatsApp and some iMessage views crop to a centered
// square, so everything that must be read sits in the middle column.
//
// Fonts are subsets of public/fonts with the GSUB table removed: the full
// Bookish file uses an OpenType lookup the renderer cannot parse.

import { readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement as h } from "react";
import sharp from "sharp";
import { ImageResponse } from "next/dist/compiled/@vercel/og/index.node.js";

const here = dirname(fileURLToPath(import.meta.url));
const root = join(here, "../..");

// Copy rules (from the share-card research, 2026-11-05):
// - Say what it is in plain words; the name "The Foundation" alone says nothing.
// - Concrete program facts only ($1,000+, who's eligible). No invented stats.
// - Asset framing ("students who lead"), never "students in need".
// - Application wording, never prize wording ("win", "selected", "claim").
// - One scholarship exists, so singular.
// - "Free to apply" leads: the strongest answer to a parent's scam check
//   (confirmed by the founders 2026-11-05: no application fee).
const CARDS = [
  {
    // Used by /, /scholarships, /apply, /about and any page without its own card.
    name: "default",
    eyebrow: "Leadership Excellence Scholarship",
    headline: ["A $1,000+ scholarship", "for students who lead."],
    subline: "Free to apply · High school, college, trade & vocational",
    footer: ["thefoundationus.org", "501(c)(3) nonprofit"],
  },
  {
    name: "donate",
    eyebrow: "Donate",
    headline: ["Invest in students", "who lead."],
    subline: "Gifts support the $1,000+ scholarship for U.S. students",
    footer: ["501(c)(3) nonprofit", "EIN 42-3732209"],
  },
];

const [photo, logo, serif, sans] = await Promise.all([
  readFile(join(here, "library.jpg")),
  readFile(join(root, "public/assets/thefoundlogowh.svg")),
  readFile(join(here, "bookish-og.otf")),
  readFile(join(here, "neue-og.otf")),
]);
const photoSrc = `data:image/jpeg;base64,${photo.toString("base64")}`;
const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

const W = 1200;
const H = 630;
const fill = {
  position: "absolute",
  top: 0,
  left: 0,
  width: W,
  height: H,
  display: "flex",
};

function Card({ eyebrow, headline, subline, footer }) {
  return h(
    "div",
    {
      style: {
        ...fill,
        position: "relative",
        background: "#161514",
        color: "#f4f1ef",
        fontFamily: "Neue",
      },
    },
    h("img", {
      src: photoSrc,
      width: W,
      height: H,
      style: { ...fill, opacity: 0.8 },
    }),
    // Darken the middle column most so the type always reads, but leave the
    // lit arches visible at the edges and top.
    h("div", {
      style: {
        ...fill,
        backgroundImage:
          "linear-gradient(90deg, rgba(22,21,20,0.25) 0%, rgba(22,21,20,0.74) 32%, rgba(22,21,20,0.74) 68%, rgba(22,21,20,0.25) 100%)",
      },
    }),
    h(
      "div",
      {
        style: {
          ...fill,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "54px 0 46px",
        },
      },
      h("img", { src: logoSrc, width: 286, height: 80 }),
      h(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: 760,
          },
        },
        h(
          "div",
          {
            style: {
              display: "flex",
              fontSize: 22,
              letterSpacing: 5,
              textTransform: "uppercase",
              color: "#d4aeaa",
              marginBottom: 20,
            },
          },
          eyebrow,
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontFamily: "Bookish",
              fontSize: 78,
              lineHeight: 1.04,
              letterSpacing: -1.5,
            },
          },
          ...headline.map((line) =>
            h("div", { key: line, style: { display: "flex" } }, line),
          ),
        ),
        h(
          "div",
          {
            style: {
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              fontSize: 30,
              lineHeight: 1.3,
              marginTop: 22,
              color: "rgba(244,241,239,0.9)",
            },
          },
          subline,
        ),
      ),
      h(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            letterSpacing: 1.5,
            color: "rgba(244,241,239,0.7)",
          },
        },
        h("span", null, footer[0]),
        h("span", {
          style: {
            width: 6,
            height: 6,
            borderRadius: 3,
            background: "#b07774",
            margin: "0 18px",
          },
        }),
        h("span", null, footer[1]),
      ),
    ),
  );
}

for (const card of CARDS) {
  const res = new ImageResponse(Card(card), {
    width: W,
    height: H,
    fonts: [
      { name: "Bookish", data: serif, weight: 400, style: "normal" },
      { name: "Neue", data: sans, weight: 400, style: "normal" },
    ],
  });
  const png = Buffer.from(await res.arrayBuffer());
  const jpg = await sharp(png)
    .jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: "4:4:4" })
    .toBuffer();
  await writeFile(join(root, "public/share", `${card.name}.jpg`), jpg);
  console.log(
    `public/share/${card.name}.jpg  ${Math.round(jpg.length / 1024)} KB`,
  );
}
