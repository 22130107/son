"use client";

import React, { useState, useEffect, useCallback } from "react";

interface SliderImage {
  src: string;
  alt: string;
}

interface SliderProps {
  images: SliderImage[];
  autoPlayInterval?: number;
}

export default function Slider({ images, autoPlayInterval = 5000 }: SliderProps) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, autoPlayInterval);
    return () => clearInterval(timer);
  }, [next, autoPlayInterval]);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 40;
    if (distance > minSwipeDistance) {
      next();
    } else if (distance < -minSwipeDistance) {
      prev();
    }
  };

  if (images.length === 0) return null;

  return (
    <section
      className="relative w-full overflow-hidden bg-black select-none"
      aria-label="Banner slider"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides: giữ đúng tỷ lệ 1920/628 trên mọi kích thước, không bị cắt mép chữ */}
      <div className="relative w-full aspect-[1920/628]">
        {images.map((img, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={img.src} 
              alt={img.alt} 
              className="w-full h-full object-cover object-center"
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
            />
          </div>
        ))}
      </div>

      {/* Prev button */}
      <button
        onClick={prev}
        aria-label="Previous"
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-white/80 sm:border-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Next button */}
      <button
        onClick={next}
        aria-label="Next"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center border border-white/80 sm:border-2 rounded-full text-white bg-black/30 hover:bg-black/50 transition-colors"
      >
        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <ol className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5 sm:gap-2">
        {images.map((_, index) => (
          <li key={index}>
            <button
              aria-label={`Page dot ${index + 1}`}
              onClick={() => setCurrent(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full border border-white sm:border-2 transition-all ${
                index === current ? "bg-white" : "bg-transparent opacity-60"
              }`}
            />
          </li>
        ))}
      </ol>
    </section>
  );
}
