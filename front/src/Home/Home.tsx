import { useState } from 'react';
import SearchEngine from '../Reservation/SearchEngine/SearchEngine';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='landing-page-container'>
        <div className='photo-div'>
          <h2 className='phone welcome-content'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </h2>
          <div className='home-reservation-button-container phone'>
          <Link className='nav-link' to='/reservation'>
            <button className='home-reservation-button phone'>
              zarezerwuj pobyt
            </button>
          </Link>
          </div>
        </div>
        <div className='welcome-content'>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
          <div className='home-search-engine'>
            <SearchEngine />
            <Link className='nav-link' to='/reservation'>
              <button className='home-reservation-button'>
                zarezerwuj pobyt
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div></div>
    </>
  );
};

export default Home;
