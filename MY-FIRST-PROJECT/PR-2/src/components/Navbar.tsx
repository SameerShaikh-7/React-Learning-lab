const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-4 md:px-8 py-4 shadow-sm bg-white sticky top-0 z-50">
      <h2 className="font-bold text-xl md:text-2xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
        Info Tech   
      </h2>

      <ul className="hidden md:flex gap-8 text-gray-600">
        <li className="cursor-pointer hover:text-purple-600 transition-colors duration-200">Home</li>
        <li className="cursor-pointer hover:text-purple-600 transition-colors duration-200">Products</li>
        <li className="cursor-pointer hover:text-purple-600 transition-colors duration-200">Blog</li>
        <li className="cursor-pointer hover:text-purple-600 transition-colors duration-200">Pricing</li>
      </ul>

      <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
        Sign up
      </button>

      {/* Mobile menu button - you can add mobile menu functionality */}
      <button className="md:hidden text-gray-600">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;