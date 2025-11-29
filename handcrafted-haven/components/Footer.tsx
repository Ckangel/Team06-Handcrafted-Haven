export default function Footer() {
  return (
    <footer className="w-full" style={{ backgroundColor: "#2b9eb3" }}>
      <div className="mx-auto max-w-7xl px-4 py-16 space-y-12 sm:px-6 lg:px-8">

        {/* Top Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="text-white font-bold text-2xl tracking-wide">
            Handcrafted Haven
          </div>

          <p className="mt-4 text-white sm:mt-0">
            Connecting creators with those who value handmade art ✨
          </p>
        </div>

        {/* Links Section */}
        <div className="grid grid-cols-1 gap-10 border-t border-white/40 pt-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Column 1 */}
          <div>
            <p className="font-semibold text-white">Company</p>
            <ul className="mt-4 space-y-2 text-white/90">
              <li><a href="#" className="hover:text-white">About Us</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <p className="font-semibold text-white">Support</p>
            <ul className="mt-4 space-y-2 text-white/90">
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Shipping Info</a></li>
              <li><a href="#" className="hover:text-white">FAQ</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <p className="font-semibold text-white">Marketplace</p>
            <ul className="mt-4 space-y-2 text-white/90">
              <li><a href="#" className="hover:text-white">New Arrivals</a></li>
              <li><a href="#" className="hover:text-white">Best Sellers</a></li>
              <li><a href="#" className="hover:text-white">Categories</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <p className="font-semibold text-white">Follow Us</p>
            <ul className="mt-4 flex space-x-4 text-white/90">
              <li><a href="#" className="hover:text-white">Instagram</a></li>
              <li><a href="#" className="hover:text-white">Facebook</a></li>
              <li><a href="#" className="hover:text-white">Pinterest</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <p className="text-center text-sm text-white pt-8">
          © {new Date().getFullYear()} Handcrafted Haven. All rights reserved.
        </p>

      </div>
    </footer>
  );
}
