import React from 'react';
import './navbar.css';
import { NavLink } from 'react-router-dom';

const Navbar = ({ contactRef, homeRef, projectRef, aboutRef }) => {
  const [click, setClick] = React.useState(false);

  const handleClick = () => setClick(!click);
  const Close = () => setClick(false);

  const navToContact = () => {
    contactRef.current.scrollIntoView();
  };
  const navTohome = () => {
    homeRef.current.scrollIntoView();
  };
  const navToproject = () => {
    projectRef.current.scrollIntoView();
  };
  const navToabout = () => {
    aboutRef.current.scrollIntoView();
  };
  return (
    <>
      <nav className='navbar' onClick={(e) => e.stopPropagation()}>
        <div className='nav-container'>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item' onClick={navTohome}>
              Home
            </li>
            <li className='nav-item' onClick={navToabout}>
              About
            </li>
            <li className='nav-item' onClick={navToproject}>
              Projects
            </li>
            <li className='nav-item' onClick={navToContact}>
              Contact
            </li>
          </ul>
          <div className='nav-icon' onClick={handleClick}>
            <i className={click ? 'fa fa-times' : 'fa fa-bars'}></i>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
