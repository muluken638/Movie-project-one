import React, { useRef, useEffect } from "react";

const RecommendedMovies = ({ recommendedMovies = [] }) => {
  const scrollContainerRef = useRef(null);

  // Custom scrolling function
  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Arrow key scroll event listener
  useEffect(() => {
    const handleKeyScroll = (event) => {
      if (event.key === "ArrowRight") {
        scroll("right");
      } else if (event.key === "ArrowLeft") {
        scroll("left");
      }
    };
    window.addEventListener("keydown", handleKeyScroll);

    return () => window.removeEventListener("keydown", handleKeyScroll);
  }, []);

  return (
    <section className="my-8">
      <h3 className="text-2xl font-semibold mb-4">Recommended Movies</h3>
      <div className="relative">
        {/* Left Arrow */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full text-white z-10"
        >
          &lt;
        </button>

        {/* Movies Scrolling Container */}
        <div
          ref={scrollContainerRef}
          className="flex space-x-4 overflow-x-scroll pb-4 scrollbar-hide"
        >
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((recom) => (
              <div
                key={recom.id}
                className="flex-shrink-0 w-[45%] sm:w-[30%] md:w-[20%] lg:w-[15%] h-60 transition-transform transform hover:scale-105 hover:shadow-lg border border-gray-500 rounded-lg overflow-hidden"
              >
                <img
                  src={recom.image}
                  alt={recom.title}
                  className="w-full h-full object-cover"
                />
                <h4 className="text-center text-white mt-2">{recom.title}</h4>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No recommended movies available</p>
          )}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-900 bg-opacity-50 p-2 rounded-full text-white z-10"
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default RecommendedMovies;
