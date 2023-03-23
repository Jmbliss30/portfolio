import './App.css';
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
import { useRef } from 'react';
import GPA from './projects/gpaCalculator/gpaCalculator';
import WebsiteContainer from './websiteCotainer';
import Player from './projects/player/player';
import Dashboard from './projects/dashboard_user/dashboard';
import { Parallax } from '@react-spring/parallax';
import ParallaxDemo from './projects/parallax/parallax';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<WebsiteContainer />}></Route>
          <Route path='/gpa' element={<GPA />}></Route>
          <Route path='/player' element={<Player />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/parallax' element={<ParallaxDemo />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
