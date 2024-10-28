// src/Homepage.js
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";

const Homepage = () => {
  const movies = [
    { id: 1, title: "Movie 1", description: "Exciting movie 1", image: "/path-to-image1.jpg" },
    { id: 2, title: "Movie 2", description: "Amazing movie 2", image: "/path-to-image2.jpg" },
    { id: 3, title: "Movie 3", description: "Thrilling movie 3", image: "/path-to-image3.jpg" },
    // Add more movies
  ];

  const recommendedMovies = [
    { id: 4, title: "Recommended Movie 1", image: "/path-to-image4.jpg" },
    { id: 5, title: "Recommended Movie 2", image: "/path-to-image5.jpg" },
    { id: 6, title: "Recommended Movie 3", image: "/path-to-image6.jpg" },
    // Add more recommended movies
  ];

  return (
    <div>
      {/* Swiper for Featured Movies */}
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        className="mySwiper"
        loop
      >
        {movies.map((movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative w-full h-96">
              <img src={movie.image} alt={movie.title} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-center text-white px-4">
                <h2 className="text-3xl font-bold">{movie.title}</h2>
                <p className="text-lg mt-2">{movie.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Recommended Movies Section */}
      <section className="my-8">
        <h3 className="text-2xl font-semibold mb-4">Recommended Movies</h3>
        <div className="flex space-x-4 overflow-x-scroll pb-4">
          {recommendedMovies.map((movie) => (
            <div key={movie.id} className="min-w-[200px] h-60 flex-shrink-0">
              <img src={movie.image} alt={movie.title} className="w-full h-full object-cover rounded-lg" />
              <h4 className="text-center text-white mt-2">{movie.title}</h4>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Homepage;
