import React from 'react';
import { Link, Outlet } from 'react-router-dom';
function Profile() {
  return (
    <div>
      <h1>Ei muutako peremmälle</h1>
      <Link to="favourites">Favourites</Link>
      <Outlet/>
    </div>
  )
}

export default Profile