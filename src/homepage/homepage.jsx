import React from 'react';
import './homepage.css';

import mohit from './Mohit.png';
const Homepage = ({ homeRef }) => {
  return (
    <div className='homepage' ref={homeRef}>
      <div className='left-section'>
        <div className='image-section'>
          <img src={mohit} className='bnr-img  '></img>
        </div>
      </div>
      <div className='right-section'>
        <div className='about-me-section'>
          <div className='about-me-wrapper'>
            <div className='bnr-title'>
              Hello,
              <br /> <span className='bnr-name'> I Am Mohit Hasija</span> <br />
            </div>
          </div>
          <div className='content'>
            <h2>I'm a Frontend Developer</h2>
            <h2>I'm a Frontend Developer</h2>
          </div>
        </div>

        <a href='react_MH_CV.pdf' download className='mohitCV'>
          <button className='resume'> My Resume/ CV</button>
        </a>
      </div>
    </div>
  );
};
export default Homepage;
