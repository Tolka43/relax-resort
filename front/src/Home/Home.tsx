import { useState } from 'react';
import SearchEngine from '../Reservation/SearchEngine/SearchEngine';
import './Home.scss';
import { Link } from 'react-router-dom';

const Home = () => {
  const [show, setShow] = useState(false);
  return (
    <>
      <div className='landing-page-container'>
        <div className='photo-div'></div>
        <div className='welcome-content'>
          <h2>Lorem ipsum dolor sit amet consectetur adipisicing elit.</h2>
          <div className='home-search-engine'>
            <SearchEngine show={show} setShow={setShow} />
            <Link className='nav-link' to='/reservation'>
            <button className='home-reservation-button'>zarezerwuj</button>
            </Link>
            
          </div>
        </div>
      </div>

      <div>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Laudantium
        eligendi veritatis beatae officia dicta consectetur quia, quas
        distinctio minima quisquam consequatur provident. Saepe quidem dolorem
        similique voluptates deleniti consequatur tempore. Lorem ipsum dolor sit
        amet consectetur adipisicing elit. Labore, dolores expedita. Assumenda
        commodi dolorum modi accusamus, consequatur quia quae qui in veniam
        quod, soluta, iste neque ipsum. Odit, similique deserunt. Lorem ipsum
        dolor sit amet consectetur adipisicing elit. Nemo, facilis. Enim eveniet
        molestiae dignissimos optio cum fuga ipsum vel ratione laboriosam.
        Officia accusamus consequuntur vel quaerat vitae rem delectus
        perferendis!
      </div>
    </>
  );
};

export default Home;
