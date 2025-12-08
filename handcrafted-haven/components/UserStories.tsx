"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  story: string;
  product: string;
}

const initialTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    location: "Portland, Oregon",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
    rating: 5,
    story: "I bought a handwoven blanket for my daughter's nursery and it's absolutely stunning. The craftsmanship is incredible, and knowing it was made by a real artisan makes it so special.",
    product: "Cozy Alpaca Blanket"
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
    rating: 5,
    story: "The carved wooden mask I purchased is now the centerpiece of my living room. Everyone who visits asks about it. Supporting traditional artisans feels amazing!",
    product: "Carved Wooden Mask"
  },
  {
    id: 3,
    name: "Amara Okonkwo",
    location: "Lagos, Nigeria",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100",
    rating: 5,
    story: "Finding authentic Kente ties here was a dream come true. The quality is exceptional and it connects me to my heritage. Will definitely be ordering more!",
    product: "Authentic Kente Bow Tie"
  },
  {
    id: 4,
    name: "Emma Rodriguez",
    location: "Austin, Texas",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
    rating: 5,
    story: "The silver moon pendant I got is gorgeous! It came beautifully packaged with a note from the artisan. This is how shopping should be - personal and meaningful.",
    product: "Moon Phase Pendant"
  },
  {
    id: 5,
    name: "David Thompson",
    location: "Seattle, Washington",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
    rating: 5,
    story: "The hand-thrown ceramic vase I ordered exceeded all expectations. The glaze work is mesmerizing and it looks even better in person. True artistry!",
    product: "Ceramic Glazed Vase"
  },
  {
    id: 6,
    name: "Isabella Martínez",
    location: "Miami, Florida",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100",
    rating: 5,
    story: "I ordered matching leather accessories for my whole family. The quality and attention to detail is impeccable. We'll be customers for life!",
    product: "Artisan Leather Collection"
  },
];

export default function UserStories() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", location: "", story: "", product: "", rating: 5 });
  const [currentSlide, setCurrentSlide] = useState(1); // start at first real slide after leading clone
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(true);

  // Build an infinite loop carousel by cloning edges
  const loopSlides = useMemo(() => {
    if (testimonials.length <= 1) return testimonials;
    return [
      testimonials[testimonials.length - 1],
      ...testimonials,
      testimonials[0],
    ];
  }, [testimonials]);

  const totalSlides = testimonials.length;
  const effectiveIndex = totalSlides
    ? (currentSlide - 1 + totalSlides) % totalSlides
    : 0;

  // Auto-advance slideshow for unauthenticated users
  const nextSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev + 1);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    if (totalSlides <= 1) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => prev - 1);
  }, [totalSlides]);

  useEffect(() => {
    if (!isAuthenticated && !isPaused) {
      const interval = setInterval(nextSlide, 5000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated, isPaused, nextSlide]);

  const handleTransitionEnd = () => {
    if (loopSlides.length <= 1) return;
    // Jump without transition when hitting clones
    if (currentSlide === loopSlides.length - 1) {
      setIsTransitioning(false);
      setCurrentSlide(1);
    } else if (currentSlide === 0) {
      setIsTransitioning(false);
      setCurrentSlide(loopSlides.length - 2);
    } else if (!isTransitioning) {
      setIsTransitioning(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.story) return;
    
    const newTestimonial: Testimonial = {
      id: testimonials.length + 1,
      name: formData.name,
      location: formData.location || "Unknown",
      avatar: session?.user?.image || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100",
      rating: formData.rating,
      story: formData.story,
      product: formData.product || "Handcrafted Item"
    };
    
    setTestimonials([newTestimonial, ...testimonials]);
    setFormData({ name: "", location: "", story: "", product: "", rating: 5 });
    setShowForm(false);
  };

  // Render star rating (interactive for form, static for display)
  const StarRating = ({ rating, interactive = false, onChange }: { rating: number; interactive?: boolean; onChange?: (r: number) => void }) => (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => interactive && onChange?.(star)}
          className={`${interactive ? "cursor-pointer hover:scale-110" : "cursor-default"} transition-transform`}
          title={interactive ? `Rate ${star} star${star === 1 ? "" : "s"}` : undefined}
        >
          <svg
            className={`w-5 h-5 ${star <= rating ? "text-amber-400" : "text-gray-300"}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial, className = "" }: { testimonial: Testimonial; className?: string }) => (
    <div className={`bg-white rounded-2xl p-6 shadow-lg ${className}`} title={`${testimonial.name} from ${testimonial.location}`}>
      {/* Quote Icon */}
      <div className="mb-4">
        <svg className="w-10 h-10 text-[#2B9EB3]/20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
        </svg>
      </div>

      {/* Rating Stars */}
      <StarRating rating={testimonial.rating} />

      {/* Story */}
      <p className="text-gray-700 my-4 leading-relaxed text-lg">&ldquo;{testimonial.story}&rdquo;</p>

      {/* Product Badge */}
      <div className="mb-4">
        <span className="inline-block px-3 py-1 bg-[#44AF69]/10 text-[#44AF69] rounded-full text-sm font-medium">
          ✨ Purchased: {testimonial.product}
        </span>
      </div>

      {/* Author */}
      <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
        <div className="relative w-14 h-14 rounded-full overflow-hidden bg-gray-200 ring-2 ring-[#fcab10]/30">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            className="object-cover"
          />
        </div>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.name}</div>
          <div className="text-sm text-gray-500 flex items-center gap-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {testimonial.location}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-amber-100 text-amber-800 rounded-full text-sm font-medium mb-4">
            Customer Love
          </span>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Stories From Our Community</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Real experiences from people who discovered unique handcrafted treasures and connected with talented artisans.
          </p>
        </div>

        {/* Authenticated: Show Grid + Form Option */}
        {isAuthenticated ? (
          <>
            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
              {testimonials.slice(0, 6).map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} className="hover:shadow-xl transition-shadow" />
              ))}
            </div>

            {/* Share Your Story CTA - Only for authenticated users */}
            <div className="text-center">
              {!showForm ? (
                <button
                  onClick={() => setShowForm(true)}
                  className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#f8333c] to-[#fcab10] text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#f8333c] focus-visible:ring-offset-2"
                  aria-label="Open form to share your story"
                  title="Share your story"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Share Your Story
                </button>
              ) : (
                <div className="max-w-lg mx-auto bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Experience</h3>
                  <p className="text-gray-500 text-sm mb-4">Posting as {session?.user?.name || session?.user?.email}</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Your Name *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Your Location"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Product Purchased"
                      value={formData.product}
                      onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44AF69] focus:border-transparent"
                    />
                    <div>
                      <label className="block text-sm text-gray-600 mb-2">Your Rating</label>
                      <StarRating 
                        rating={formData.rating} 
                        interactive={true} 
                        onChange={(r) => setFormData({ ...formData, rating: r })} 
                      />
                    </div>
                    <textarea
                      placeholder="Tell us about your experience... *"
                      value={formData.story}
                      onChange={(e) => setFormData({ ...formData, story: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#44AF69] focus:border-transparent resize-none"
                      required
                    />
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={() => setShowForm(false)}
                        className="flex-1 px-6 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
                        title="Cancel story"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="flex-1 px-6 py-2 bg-[#44AF69] text-white rounded-lg hover:bg-[#3d9d5f] transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#44AF69] focus-visible:ring-offset-2"
                        title="Submit story"
                      >
                        Submit Story
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Unauthenticated: Show Slideshow Carousel */
          <div 
            className="relative max-w-4xl mx-auto"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Main Carousel */}
            <div className="overflow-hidden rounded-3xl">
              <div
                className={`flex ${isTransitioning ? "transition-transform duration-500 ease-in-out" : ""}`}
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                onTransitionEnd={handleTransitionEnd}
              >
                {(loopSlides.length ? loopSlides : testimonials).map((testimonial, idx) => (
                  <div key={`${testimonial.id}-${idx}`} className="w-full flex-shrink-0 p-2">
                    <TestimonialCard testimonial={testimonial} className="mx-auto max-w-2xl" />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B9EB3]"
              aria-label="Previous testimonial"
              title="Previous testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B9EB3]"
              aria-label="Next testimonial"
              title="Next testimonial"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center gap-2 mt-6" role="tablist" aria-label="Testimonial navigation">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (totalSlides <= 1) return;
                    setIsTransitioning(true);
                    setCurrentSlide(idx + 1);
                  }}
                  className={`w-3 h-3 rounded-full transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B9EB3] ${
                    idx === effectiveIndex ? "bg-[#2B9EB3]" : "bg-gray-300 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  aria-selected={idx === effectiveIndex}
                  role="tab"
                />
              ))}
            </div>

            {/* Sign In CTA */}
            <div className="text-center mt-10">
              <p className="text-gray-600 mb-4">Want to share your own story?</p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-[#2B9EB3] to-[#44AF69] text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-lg cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2B9EB3] focus-visible:ring-offset-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Sign In to Share Your Story
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
