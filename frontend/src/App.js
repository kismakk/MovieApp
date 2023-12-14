import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Profile from './pages/Profile';
import FavouriteDetails from './pages/FavouriteDetails';
import Settings from './pages/Settings';
import Discover from './pages/Discover';
import MovieDetails from './pages/MovieDetails.js';
import SeriesDetails from './pages/SeriesDetails';
import Groups from './pages/Groups';
import Search from './pages/Search.js';
import GroupFavouriteDetails from './pages/GroupFavouriteDetails.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/movies/:movieId' element={<MovieDetails />} />
        <Route path='/series/:seriesId' element={<SeriesDetails />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/news' element={<News />} />
        <Route path='/groups/:groupId' element={<Groups />} />
        <Route path='/groups/:groupId/favouritedetails' element={<GroupFavouriteDetails/>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/favouritedetails" element={<FavouriteDetails />} />
        <Route path="/profile/:username" element={<Profile />} />
        <Route path='/search/:query' element={<Search />} />
        <Route path='*' element={<h1>Page Not Found</h1>} /> {/*If route is not found, this is displayed*/}
      </Routes>
      <Outlet />
    </BrowserRouter>
  );
}
<Route path="/profile/favouritedetails" element={<FavouriteDetails />} />
export default App
