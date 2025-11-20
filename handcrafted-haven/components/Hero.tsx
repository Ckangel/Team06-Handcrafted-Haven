"use client";
import { useEffect, useRef } from "react";

export default function Hero() {
  const leftRef = useRef(null);
  const imgRef = useRef(null);

  useEffect(() => {
    const reveal = (element: any) => {
      if (!element) return;
      element.classList.remove("opacity-0", "translate-y-6");
      element.classList.add("opacity-100", "translate-y-0");
    };

    setTimeout(() => reveal(leftRef.current), 100);
    setTimeout(() => reveal(imgRef.current), 300);
  }, []);

  return (
    <section className="grid md:grid-cols-2 gap-6 px-6 py-20 bg-neutralLight">
      {/* Text */}
      <div
        ref={leftRef}
        className="opacity-0 translate-y-6 transition-all duration-700"
      >
        <h1 className="text-4xl font-bold leading-tight font-roboto">
          Discover Unique <br />
          <span className="text-accentRed">Handcrafted</span> <br />
          Treasures
        </h1>
        <p className="mt-4 text-gray-700">
          Explore one-of-a-kind artisanal products created with love and tradition.
        </p>
        <button className="mt-6 px-6 py-3 text-black font-bold rounded-full w-fit hover:scale-105 transition bg-accentYellow">
          Shop Now
        </button>
      </div>

      {/* Image */}
      <div
        ref={imgRef}
        className="opacity-0 translate-y-6 transition-all duration-700 bg-gray-300 h-64 md:h-full rounded-lg flex items-center justify-center hover:scale-105"
      >
        hero image
      </div>
    </section>
  );
}
