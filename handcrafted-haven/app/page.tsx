import Hero from "@/components/Hero";
import { Categories } from "@/components/Categories";

import FeaturedProducts from "@/components/FeaturedProducts";
import ArtisanSection from "@/components/ArtisanSection";
import UserStories from "@/components/UserStories";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ArtisanSection />
      <UserStories />
    </>
  );
}
