import SearchEngine from '../Reservation/SearchEngine/SearchEngine';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <div className='landing-page-container'>
        <div className='photo-div'>
          <div className='phone welcome-content'>
            <h2>Zaplanuj pobyt w Relax Resort</h2>
            <p className='little-text phone'>poznaj spa i odpocznij</p>
          </div>
          <div className='home-reservation-button-container phone'>
            <Link className='button-link' to='/reservation'>
              <button className='home-reservation-button phone'>
                zarezerwuj pobyt
              </button>
            </Link>
          </div>
        </div>
        <div className='welcome-content'>
          <div>
            <h2>Zaplanuj pobyt w Relax Resort</h2>
            <p className='little-text'>poznaj spa i odpocznij</p>
          </div>
          <div className='home-search-engine'>
            <SearchEngine />
            <Link to='/reservation'>
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
