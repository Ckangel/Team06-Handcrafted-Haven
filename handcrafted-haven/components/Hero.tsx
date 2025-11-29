"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRightIcon } from "@heroicons/react/24/solid";
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
      <div className="space-y-6">
            <div className="inline-block">
              <span className="px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full">
                Supporting Local Artisans
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl text-gray-900">
              Discover Unique{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                Handcrafted
              </span>{" "}
              Treasures
            </h1>
            <p className="text-gray-600 max-w-lg">
              Connect with talented artisans and bring home one-of-a-kind pieces that tell a story. 
              Every purchase supports sustainable practices and creative communities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button  className="rounded-md bg-[#f8333c] px-5 py-2.5 text-sm font-medium text-white shadow-sm">
                Explore Marketplace
               <ArrowRightIcon className="ml-2 h-5 w-5 text-white" />
              </button>
              <button >
                Meet Our Artisans
              </button>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-gray-900">500+</div>
                <div className="text-gray-600">Artisans</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-gray-900">10,000+</div>
                <div className="text-gray-600">Products</div>
              </div>
              <div className="h-12 w-px bg-gray-300" />
              <div>
                <div className="text-gray-900">50,000+</div>
                <div className="text-gray-600">Happy Customers</div>
              </div>
            </div>
          </div>

      {/* Right Image Grid */}
      <div
        ref={imgRef}
        className="opacity-0 translate-y-6 transition-all duration-700 grid grid-cols-2 gap-4"
      >
        <div className="space-y-4">
          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1642582615780-35343a19fd65?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Handmade pottery"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1756792339125-51edbdb03c74?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Artisan jewelry"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-4 pt-8">
          <div className="relative h-64 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1748141951488-9c9fb9603daf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Handwoven textiles"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative h-48 rounded-2xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1732575886697-0ddcbce961dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
              alt="Handcrafted woodwork"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
