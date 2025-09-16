"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa6";

interface PropertyCarouselProps {
  images: string[];
  alt: string;
  autoplay?: boolean;
  fullHeight?: boolean;
}

export default function PropertyCarousel({
  images,
  alt,
  autoplay,
  fullHeight,
}: PropertyCarouselProps) {
  const [idx, setIdx] = useState(0);
  // Autoplay only if prop is true and more than 1 image
  useEffect(() => {
    if (!autoplay || !images || images.length <= 1) return;
    const interval = setInterval(() => {
      setIdx((prev) => (prev + 1) % images.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [autoplay, images]);
  if (!images || images.length === 0) return null;
  const go = (d: number) => setIdx((prev) => (prev + d + images.length) % images.length);
  return (
    <div className={`relative ${fullHeight ? "h-full" : "h-56"} bg-zinc-100 select-none group`}>
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0.0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0.0, x: -40 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
        >
          <Image
            src={images[idx]}
            alt={alt}
            fill
            className="object-cover"
            priority={false}
            unoptimized
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/no-image.jpg";
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Arrows: siempre visibles en mobile, hover en desktop */}
      <button
        aria-label="Prev"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          go(-1);
        }}
        className={btnPremium + " left-2 arrow-carousel"}
        style={{}}
      >
        <FaChevronLeft size={20} color="#334155" />
      </button>
      <button
        aria-label="Next"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          go(1);
        }}
        className={btnPremium + " right-2 arrow-carousel"}
        style={{}}
      >
        <FaChevronRight size={20} color="#334155" />
      </button>
      <style>{`
        @media (max-width: 440px) {
          .arrow-carousel {
            opacity: 1 !important;
            pointer-events: auto !important;
          }
        }
        @media (min-width: 441px) {
          .arrow-carousel {
            opacity: 0;
            pointer-events: none;
          }
          .group:hover .arrow-carousel {
            opacity: 1 !important;
            pointer-events: auto !important;
          }
        }
      `}</style>

      {/* Dots: ocultar en mobile, mostrar en md+ */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1 hidden md:flex">
        {images.slice(0, 8).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 w-1.5 rounded-full ${i === idx ? "bg-white" : "bg-white/60"}`}
          />
        ))}
      </div>
    </div>
  );
}

const btnPremium =
  "absolute top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white border-2 border-transparent hover:border-blue-500 shadow-lg rounded-full p-2 transition focus-visible:ring-2 focus-visible:ring-blue-500";
