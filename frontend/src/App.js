import './App.css';
import { BrowserRouter, Routes, Route, Link, useNavigate, useParams, Outlet } from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';

function App() {
  return (
    <BrowserRouter>
      <Link to={'/'}>Home </Link>
      <Link to={'/news'}>News </Link>
      <Link to={'/settings'}>Settings </Link>
      <Link to={'/group'}>Group </Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/settings' element={<h1>Settings</h1>} />
        <Route path='/news' element={<News />} />
        <Route path='/group' element={<Group />} />
        {/*Add more routes here*/}
        <Route path='*' element={<h1>Page Not Found</h1>} /> {/*If route is not found, this is displayed*/}
      </Routes>
    </BrowserRouter>
  );
}

function Group() {
  return (
    <div>
      <h2>Group</h2>
    </div>
  )
}

export default App
