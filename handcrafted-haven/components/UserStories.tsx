"use client";
import { useState } from "react";

export default function UserStories() {
  const [stories, setStories] = useState([]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const story = e.target.story.value.trim();
    if (!story) return;

    setStories([...stories, story]);
    e.target.reset();
  };

  return (
    <section className="px-6 py-16 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">User Stories</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          name="story"
          placeholder="Write your story here..."
          className="w-full border p-3 rounded-lg"
          rows={4}
        ></textarea>
        <button className="mt-4 px-6 py-2 text-white rounded hover:opacity-90 bg-accentBlue">
          Submit
        </button>
      </form>

      <div className="mt-8 space-y-3">
        {stories.map((s, i) => (
          <div key={i} className="p-3 rounded shadow-sm bg-neutralLight">
            {s}
          </div>
        ))}
      </div>
    </section>
  );
}
