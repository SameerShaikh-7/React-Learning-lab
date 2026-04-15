const Hero = () => {
  return (
    <div className="relative mx-4 md:mx-8 mt-4 rounded-2xl overflow-hidden group">
      <img
        src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
        className="w-full h-[400px] md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-500"
      />
      
      {/* Darker overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 text-white">
        <div className="inline-block px-3 py-1 bg-purple-600 rounded-full text-xs mb-3">
          FEATURED
        </div>
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold max-w-2xl leading-tight">
          Breaking Into Product Design
        </h1>
        <p className="text-sm md:text-base mt-2 text-gray-200 max-w-xl">
          Learn how to get started in design and build a successful career 🚀
        </p>
        <button className="mt-4 px-6 py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105">
          Read More →
        </button>
      </div>
    </div>
  );
};

export default Hero;