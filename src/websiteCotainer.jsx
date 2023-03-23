import React, { useRef } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import Homepage from './homepage/homepage';
import Navbar from './navbar/navbar';
import About from './about/about';
import Projects from './projects/projects';
import Contact from './contact/contact';
import './App.css';

const WebsiteContainer = () => {
  const contactRef = useRef(null);
  const homeRef = useRef(null);
  const projectRef = useRef(null);
  const aboutRef = useRef(null);
  return (
    <>
      <div className='master-class'>
        <Navbar
          contactRef={contactRef}
          homeRef={homeRef}
          projectRef={projectRef}
          aboutRef={aboutRef}
        />
        <Routes>
          <Route path='/' element={<Homepage homeRef={homeRef} />}></Route>
        </Routes>
        <About aboutRef={aboutRef} />
        <Projects projectRef={projectRef} />
        <Contact contactRef={contactRef} />

        <Routes></Routes>
      </div>
    </>
  );
};

export default WebsiteContainer;
