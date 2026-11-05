import type { Metadata } from "next";

// Link-preview copy. iMessage shows only the share title + domain (never the
// description), so `shareTitle` must say what the page is on its own: the
// concrete offer first, the brand last, 60 characters or fewer. Descriptions
// lead with who it's for and stay under ~155 characters.
//
// The preview images are public/share/*.jpg, made by
// `npm run share-cards` (scripts/share-cards/render.mjs).

export const SITE_URL = "https://www.thefoundationus.org";
export const SITE_NAME = "The Foundation";

// Bump SHARE_VERSION whenever a card image changes so platforms that cache
// previews (Facebook, LinkedIn, iMessage) fetch the new one.
const SHARE_VERSION = "2026-11-05b";

const SHARE_CARDS = {
  default:
    "The Foundation: a $1,000+ scholarship for students who lead. Free to apply. High school, college, trade and vocational students. 501(c)(3) nonprofit.",
  donate:
    "Donate to The Foundation: invest in students who lead. Gifts support the $1,000+ Leadership Excellence Scholarship. 501(c)(3) nonprofit, EIN 42-3732209.",
} as const;

function shareImage(card: keyof typeof SHARE_CARDS) {
  return {
    url: `/share/${card}.jpg?v=${SHARE_VERSION}`,
    width: 1200,
    height: 630,
    type: "image/jpeg",
    alt: SHARE_CARDS[card],
  };
}

type PageMeta = {
  path: string;
  /** Browser tab / search result title. */
  title: string;
  /** Title on the share card. Defaults to `title`. */
  shareTitle?: string;
  description: string;
  /** Which public/share card to show. */
  card?: keyof typeof SHARE_CARDS;
};

// Next.js replaces (does not merge) a parent's openGraph/twitter objects, so
// every page builds the full set here.
export function pageMetadata({
  path,
  title,
  shareTitle = title,
  description,
  card = "default",
}: PageMeta): Metadata {
  const image = shareImage(card);
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "en_US",
      url: path,
      title: shareTitle,
      description,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [image],
    },
  };
}
