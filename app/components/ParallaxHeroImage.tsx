"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import heroImage from "@/public/hero-library.webp";

const MAX_PARALLAX_PX = 72;
const PARALLAX_RATIO = 0.09;

export default function ParallaxHeroImage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const motionLayer = motionRef.current;

    if (!container || !motionLayer) {
      return;
    }

    const motionPreference = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    const header = document.querySelector<HTMLElement>(".site-header");
    let animationFrame: number | null = null;
    let previousOffset = Number.NaN;

    const updatePosition = () => {
      animationFrame = null;

      const bounds = container.getBoundingClientRect();
      if (bounds.height === 0) {
        return;
      }

      const headerHeight = header?.offsetHeight ?? 0;
      const progress = Math.min(
        1,
        Math.max(0, (headerHeight - bounds.top) / bounds.height),
      );
      const maximumOffset = Math.min(
        MAX_PARALLAX_PX,
        bounds.height * PARALLAX_RATIO,
      );
      const nextOffset = motionPreference.matches
        ? 0
        : progress * maximumOffset;

      if (
        Number.isNaN(previousOffset) ||
        Math.abs(nextOffset - previousOffset) >= 0.1
      ) {
        motionLayer.style.setProperty(
          "--hero-parallax-y",
          `${nextOffset.toFixed(2)}px`,
        );
        previousOffset = nextOffset;
      }
    };

    const requestPositionUpdate = () => {
      if (animationFrame === null) {
        animationFrame = window.requestAnimationFrame(updatePosition);
      }
    };

    updatePosition();
    window.addEventListener("scroll", requestPositionUpdate, { passive: true });
    window.addEventListener("resize", requestPositionUpdate);
    window.addEventListener("pageshow", requestPositionUpdate);
    motionPreference.addEventListener("change", requestPositionUpdate);

    return () => {
      window.removeEventListener("scroll", requestPositionUpdate);
      window.removeEventListener("resize", requestPositionUpdate);
      window.removeEventListener("pageshow", requestPositionUpdate);
      motionPreference.removeEventListener("change", requestPositionUpdate);

      if (animationFrame !== null) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  return (
    <div className="hero__media" ref={containerRef}>
      <div className="hero__image-motion" ref={motionRef}>
        <Image
          alt="Historic brick arches framing a quiet library"
          className="hero__image"
          fill
          placeholder="blur"
          preload
          sizes="100vw"
          src={heroImage}
        />
      </div>
    </div>
  );
}
