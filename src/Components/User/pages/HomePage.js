// src/Homepage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import RecommendedMovies from "../../Recomended/RecommendedMovies";
import TopMovies from "../../Tops/TopMovies";

const Homepage = () => {
  const [moviesData, setMoviesData] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesRes = await axios.get("http://localhost:5000/api/movies");
        const recommendedRes = await axios.get(
          "http://localhost:5000/api/movies"
        );
        const topMoviesRes = await axios.get(
          "http://localhost:5000/api/top-movies"
        );

        setMoviesData(moviesRes.data);
        setRecommendedMovies(recommendedRes.data);
        setTopMovies(topMoviesRes.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        {/* Swiper for Featured Movies */}
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          className="mySwiper"
          loop
        >
          {moviesData.map((movie) => (
            <SwiperSlide key={movie.id}>
              <div className="relative w-full h-96">
                <img
                  src={`http://localhost:5000/${movie.cover_image.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={movie.title}
                  className="object-cover w-full h-full"
                />

                {/* <img src={movie.image} alt={movie.title} className="object-cover w-full h-full" /> */}
                <div className="absolute inset-0 bg-black bg-opacity-75 flex flex-col justify-center items-center text-center text-white">
                  <h2 className="text-3xl font-bold">{movie.title}</h2>
                  <p className="text-lg mt-2">{movie.description}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Recommended Movies Section */}
        <RecommendedMovies recommendedMovies={recommendedMovies} />
        <TopMovies topMovies={topMovies} />
      </div>
    </div>
  );
};

export default Homepage;
