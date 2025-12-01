import Navbar from "@/components/NavBar";
import Hero from "@/components/Hero";
import { Categories } from "@/components/Categories";

import FeaturedProducts from "@/components/FeaturedProducts";
import ArtisanSection from "@/components/ArtisanSection";
import UserStories from "@/components/UserStories";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <ArtisanSection />
      <UserStories />
      <Footer />
    </main>
  );
}
