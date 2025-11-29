"use client";
import { useState, FormEvent } from "react";

export default function UserStories() {
  const [stories, setStories] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const storyInput = form.elements.namedItem("story") as HTMLTextAreaElement;
    const story = storyInput.value.trim();
    if (!story) return;

    setStories([...stories, story]);
    form.reset();
  };

  return (
    <section className="py-16 bg-gradient-to-r from-[#f8333c] to-[#fcab10]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center text-white space-y-6">

          <h2 className="text-white text-3xl font-semibold">User Stories</h2>
          <p className="text-white/90 max-w-xl mx-auto">
            Share your experience, ideas, or suggestions about using Handcrafted Haven.
            Your feedback helps us improve the platform and support artisans worldwide.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3 max-w-md mx-auto w-full pt-4">
            <textarea
              name="story"
              placeholder="Write your user story here..."
              className="w-full border border-white p-3 rounded-lg bg-transparent text-white placeholder-white/80"
              rows={4}
            ></textarea>
            <button className="px-8 py-3 border-1 border-white rounded-lg">
              Submit
            </button>
          </form>

        </div>
      </div>

      <div className="mt-8 space-y-3 max-w-xl mx-auto px-4">
        {stories.map((s, i) => (
          <div key={i} className="p-3 rounded shadow-sm bg-white text-black">
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}
