export default function Categories() {
  const cats = ["Woven Mats", "Pottery", "Silver Pendants", "Carved Wood"];

  return (
    <section className="px-6 py-16 text-center">
      <h2 className="text-2xl font-bold mb-6 font-roboto text-accentBlue">
        Explore Categories
      </h2>

      <div className="flex justify-center gap-8 mt-6 flex-wrap">
        {cats.map((cat) => (
          <div key={cat} className="flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full shadow hover:scale-110 transition bg-accentYellow"></div>
            <p>{cat}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
