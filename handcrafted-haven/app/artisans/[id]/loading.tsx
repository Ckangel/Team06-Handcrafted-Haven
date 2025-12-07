export default function LoadingArtisan() {
  return (
    <div className="px-6 py-16 animate-pulse max-w-7xl mx-auto">
      <div className="h-10 w-64 bg-gray-300 rounded mb-6"></div>
      <div className="h-6 w-96 bg-gray-300 rounded mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="h-80 bg-gray-300 rounded-lg"></div>
        <div className="h-80 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
}
