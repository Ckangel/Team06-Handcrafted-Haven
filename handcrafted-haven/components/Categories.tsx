import { Palette, Gem, Scissors, Birdhouse, FlaskRound } from "lucide-react";

const categories = [
  { name: "Pottery", icon: FlaskRound, count: 1250, color: "from-amber-500 to-orange-500" },
  { name: "Silver Pendants", icon: Gem, count: 2100, color: "from-purple-500 to-pink-500" },
  { name: "Woven Mats", icon: Scissors, count: 890, color: "from-blue-500 to-cyan-500" },
  { name: "Carved Wood", icon: Birdhouse, count: 1680, color: "from-red-500 to-rose-500" },
  
];

export function Categories() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-gray-900 mb-4">Explore by Category</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse our curated collection of handcrafted items across various categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 justify-center">

          {categories.map((category) => (
            <div
              key={category.name}
              className="p-6 rounded-xl border-2 hover:border-gray-300 bg-white hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div
                  className={`h-12 w-12 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <category.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-gray-900">{category.name}</div>
                  <div className="text-gray-500">{category.count} items</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}