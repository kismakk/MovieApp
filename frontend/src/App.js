import './App.css';
import 'tailwindcss/tailwind.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Profile from './pages/Profile';
import Favourites from './pages/Favourites';
import Settings from './pages/Settings';
import Discover from './pages/Discover';
import Details from './pages/Details';
import Groups from './pages/Groups';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/discover' element={<Discover />} />
        <Route path='/details' element={<Details />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='/news' element={<News />} />
        <Route path='/groups' element={<Groups />} />
        <Route path="/profile" element={<Profile />}>
          <Route path="favourites" element={<Favourites />} />
        </Route>
        <Route path='*' element={<h1>Page Not Found</h1>} /> {/*If route is not found, this is displayed*/}
      </Routes>
    </BrowserRouter>
  );
}

export default App
