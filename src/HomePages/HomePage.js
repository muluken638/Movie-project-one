import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; // Import the autoplay styles
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import the autoplay module
import RecommendedMovies from "../Components/Recomended/RecommendedMovies";
import TopMovies from "../Components/Tops/TopMovies";
import HomePageHeader from "./HomePageHeader";
import Footer from "./Footer";

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
      <HomePageHeader />
      <div className="container mx-auto p-4">
        {/* Swiper for Featured Movies with Autoplay */}
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Add the Autoplay module here
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000, // Set the delay between slides in milliseconds
            disableOnInteraction: false, // Prevent autoplay from being disabled after user interaction
          }}
          loop={true} // Make it loop infinitely
          className="mySwiper"
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
      <Footer />
    </div>
  );
};

export default Homepage;
