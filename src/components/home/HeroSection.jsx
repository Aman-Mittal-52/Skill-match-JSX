export default function HeroSection() {
  // Add console log for debugging

  return (
    // Main container with responsive padding and flex layout
    <div className="flex flex-col md:flex-row px-4 md:px-10 py-6 md:py-10 justify-center items-center">
      {/* Content container with responsive spacing */}
      <div className="flex flex-col justify-center items-center text-center space-y-4 md:space-y-6">
        {/* Gradient text with responsive sizes */}
        <p className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text text-3xl md:text-5xl lg:text-7xl font-bold text-transparent">
          Your Gateway to Career Opportunities
        </p>
        {/* Subheading with responsive sizes */}
        <h1 className="text-sm md:text-3xl lg:text-4xl font-bold text-gray-800 max-w-3xl">
          Discover, Apply, and Get Hired – Simplifying Job Search for Everyone
        </h1>
      </div>
    </div>
  );
}