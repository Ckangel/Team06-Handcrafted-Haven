import Navbar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen px-6 py-16 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 font-roboto text-accentBlue">
          About Handcrafted Haven
        </h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 font-roboto">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Handcrafted Haven is an innovative web application that provides a
            platform for artisans and crafters to showcase and sell their unique
            handcrafted items. We serve as a virtual marketplace, connecting
            talented creators with potential customers who appreciate the beauty
            and quality of handmade products.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Our application focuses on fostering a sense of community, supporting
            local artisans, and promoting sustainable consumption. We believe in
            the power of handcrafted items to tell stories and preserve cultural
            traditions.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 font-roboto">What We Offer</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg bg-neutralLight">
              <h3 className="font-bold text-lg mb-2">For Artisans</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Dedicated seller profiles to showcase your work</li>
                <li>Easy product listing with descriptions and images</li>
                <li>Connect with a broader audience</li>
                <li>Share your craftsmanship story</li>
              </ul>
            </div>
            <div className="p-6 rounded-lg bg-neutralLight">
              <h3 className="font-bold text-lg mb-2">For Customers</h3>
              <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>Discover unique, one-of-a-kind items</li>
                <li>Browse by category and price range</li>
                <li>Read reviews and ratings</li>
                <li>Support local artisans directly</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4 font-roboto">Our Values</h2>
          <div className="space-y-4">
            <div className="p-4 border-l-4 border-primary">
              <h3 className="font-bold mb-1">Community</h3>
              <p className="text-gray-700">
                Building a thriving community of passionate creators and conscious
                consumers.
              </p>
            </div>
            <div className="p-4 border-l-4 border-accentBlue">
              <h3 className="font-bold mb-1">Authenticity</h3>
              <p className="text-gray-700">
                Every item is genuine, handcrafted with love and tradition.
              </p>
            </div>
            <div className="p-4 border-l-4 border-accentYellow">
              <h3 className="font-bold mb-1">Sustainability</h3>
              <p className="text-gray-700">
                Promoting sustainable consumption and supporting local economies.
              </p>
            </div>
          </div>
        </section>

        <section className="text-center py-12 rounded-lg bg-neutralLight">
          <h2 className="text-2xl font-bold mb-4 font-roboto">
            Join Our Community
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you&apos;re an artisan looking to share your craft or a customer
            seeking unique treasures, Handcrafted Haven is your destination.
          </p>
          <button className="px-8 py-3 bg-primary text-white font-bold rounded-full hover:scale-105 transition">
            Get Started
          </button>
        </section>
      </main>
      <Footer />
    </>
  );
}
