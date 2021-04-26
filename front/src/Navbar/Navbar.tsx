import {useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTimes,
  faBars,
  faSpa,
} from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const handleClose = () => setActive(false);
  return (
    <nav className='nav-solid'>
      <div className='nav-container'>
        <div className='nav-logo'>
          <FontAwesomeIcon className='fa-lg' icon={faSpa} />
          <Link onClick={handleClose} className='nav-logo-text' to='/'>
            <h5>RELAX RESORT</h5>
            <p className='nav-logo-little'>hotel&spa</p>
          </Link>
        </div>
        <ul className={active ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link onClick={handleClose} className='nav-link' to='/about'>
              o nas
            </Link>
          </li>
          <li className='nav-item'>
            <Link onClick={handleClose} className='nav-link' to='/reservation'>
              zarezerwuj
            </Link>
          </li>
        </ul>
        <div className='nav-icon'>
          <FontAwesomeIcon
            onClick={() => setActive(!active)}
            className='fa-lg'
            icon={active ? faTimes : faBars}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
