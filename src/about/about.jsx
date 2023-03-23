import React from 'react';
import './about.css';
import Reactlogo from './React-icon.svg.png';
import csslogo from './csslogo.png';
import htmlLogo from './htmllogo.png';

const About = ({ aboutRef }) => {
  return (
    <div className='aboutme' ref={aboutRef}>
      <div className='aboutme-wrapper'>
        <div className='about-height'>
          <div className='left-sctn'>
            <div className='image-wrapper'>
              <img src={Reactlogo} className='tech-icons'></img>
              <img src={csslogo} className='tech-icons'></img>
              <img src={htmlLogo} className='tech-icons'></img>
            </div>
          </div>
          <div className='right-sctn'>
            <div className='about-bnr'>
              <h3 className='right-about-me'>About Me</h3>

              <p className='description'>
                I am a highly motivated and skilled web developer with a passion
                for creating innovative and user-friendly web applications. Over
                the past year, I have honed my skills in ReactJS technology and
                have been working on several projects that have challenged me to
                grow both professionally and technically. I have gained
                experience in building dynamic and responsive user interfaces,
                integrating APIs, and creating intuitive navigation experiences.
                My experience with ReactJS has allowed me to understand the
                importance of performance optimization and delivering a seamless
                user experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
