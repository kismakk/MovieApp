import React from 'react';
import Header from '../components/header';
import Global from '../components/global';


function Home() {
  return (
    <div>
      <Global /> {/* Käytä Global komponenttia, joka lisää globaalit tyylit */}
      <h1>Home vvvsvadstesti</h1>
      <Header />
    </div>
  );
}

export default Home;