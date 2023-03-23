import React, { useState } from 'react';
import './projects.css';
import { UserCard } from 'react-ui-cards';
import { useLocation } from 'react-router-dom';
import gpaImg from './gpaCalculator/gpaCapture.JPG';
import playerImg from './player/playerReact.JPG';
import DashboardImg from './dashboard_user/dashboardImg.JPG';
import parallaxImg from './parallax/images/parallaxImg.JPG';

const Projects = ({ projectRef }) => {
  const navigate = useLocation();
  const [ProjectData, setProjectData] = useState([
    {
      category: 'React',
      title: 'GPA Calculator',
      text: 'GPA calculator with three scales',
      image: gpaImg,
      url: '/gpa',
    },
    {
      category: 'React',
      title: 'React Audio Player',
      text: 'Play songs on your website with React Audio Player',
      image: playerImg,
      url: '/player',
    },
    {
      category: 'React',
      title: 'CRUD Dashboard',
      text: 'Basic CRUD Operations to perform in any Dashboard or user table',
      image: DashboardImg,
      url: '/dashboard',
    },
    {
      category: 'React',
      title: 'Parallax Scrolling',
      text: 'Create Lively websites using react parallax library',
      image: parallaxImg,
      url: '/parallax',
    },
  ]);

  const navtoProject = (val) => {
    navigate('/val');
  };
  return (
    <div className='projects-wrapper' ref={projectRef}>
      <h4 className='project-title'>Projects</h4>
      <div className='project-dash'>
        {' '}
        {ProjectData.map((idea) => (
          <UserCard
            float
            href={idea.url}
            header={idea.image}
            avatar={idea.image}
            name={idea.title}
            positionName={idea.text}
            onClick={(idea) => navtoProject(idea.url)}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
