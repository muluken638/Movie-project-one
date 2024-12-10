// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Movies from "./Pages/movies";
import Series from "./Pages/series";
import Episode from "./Pages/Episode";
import Season from "./Pages/season";
import WatchPage from "./Pages/WatchPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import Login from "./Components/Login";
import Register from "./Components/Register";
import WatchMovies from "./Pages/WatchMovies";
import AdminLayout from "./Components/Admin/AdminLayout";
import DashboardCards from "./Components/Admin/DashboardCards";
import FilmAdd from "./Components/Admin/FilmManagment/FilmAdd";
import FilmEdit from "./Components/Admin/SeriesManagment/FilmEdit";
import FilmDelete from "./Components/Admin/FilmManagment/FilmDelete";
import UserDelete from "./Components/Admin/UserManagment/UserDelete";
import UserUpdate from "./Components/Admin/UserManagment/UserUpdate";
import UserList from "./Components/Admin/UserManagment/UserList";
import FilmList from "./Components/Admin/FilmManagment/FilmList";
import ProfilePage from "./Components/Admin/ProfilePage";
import UserLayout from "./Components/User/UserLayout/UserLayout";
import { SearchProvider } from "./context/SearchContext";
import UserAdd from "./Components/Admin/UserManagment/UserAdd";
import ChatPage from "./Pages/ChatPage"; // Import the new ChatPage component
import Homepage from "./Components/User/pages/HomePage";
import Home from "./HomePages/HomePage";
import About from "./HomePages/About";
import Contact from "./HomePages/Contact";
import Setting from "./Components/Admin/Setting";
import SeriesAdd from "./Components/Admin/SeriesManagment/SeriesAdd";
function App() {
  return (
    <AuthProvider>
      <Router>
        <SearchProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Dashboard Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route path="/admin/dashboard" element={<DashboardCards />} />
              <Route path="users/list" element={<UserList />} />
              <Route path="users/edit" element={<UserUpdate />} />
              <Route path="users/delete" element={<UserDelete />} />
              <Route path="users/add" element={<UserAdd />} />
              <Route path="films/list" element={<FilmList />} />
              <Route path="films/add" element={<FilmAdd />} />
              <Route path="films/edit" element={<FilmEdit />} />
              {/* Series Management */}
              <Route path="series/add" element={<SeriesAdd />} />

              <Route path="films/delete" element={<FilmDelete />} />
              <Route path="/admin/profile" element={<ProfilePage />} />
              <Route path="/admin/settings" element={<Setting />} />
            </Route>

            <Route
              path="/userlayout"
              element={<ProtectedRoute element={<UserLayout />} />}
            >
              <Route
                path="movies/list"
                element={<ProtectedRoute element={<Movies />} />}
              />
              <Route
                path="homepage"
                element={<ProtectedRoute element={<Homepage />} />}
              />
              <Route
                path="movies"
                element={<ProtectedRoute element={<Movies />} />}
              />
              <Route
                path="movies/list/:moviesId/watchmovies"
                element={<ProtectedRoute element={<WatchMovies />} />}
              />
              <Route
                path="series"
                element={<ProtectedRoute element={<Series />} />}
              />
              <Route
                path="series/:seriesId/seasons"
                element={<ProtectedRoute element={<Season />} />}
              />
              <Route
                path="series/:seriesId/seasons/:seasonNumber/episodes"
                element={<ProtectedRoute element={<Episode />} />}
              />
              <Route
                path="series/:seriesId/seasons/:seasonNumber/episodes/:episode_number/watch"
                element={<ProtectedRoute element={<WatchPage />} />}
              />

              <Route
                path="chat"
                element={<ProtectedRoute element={<ChatPage />} />}
              />
              <Route
                path="profile"
                element={<ProtectedRoute element={<ProfilePage />} />}
              />
            </Route>
          </Routes>
        </SearchProvider>
      </Router>
    </AuthProvider>
  );
}

export default App;
