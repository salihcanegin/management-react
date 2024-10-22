import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [activeLink, setActiveLink] = useState('');

  const handleActiveLink = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ minWidth: '200px', height: '100vh' }}>
      <h4>Menu</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link
            to="/departments"
            className={`nav-link ${activeLink === 'departments' ? 'active' : ''}`}
            onClick={() => handleActiveLink('departments')}
          >
            Departments
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/courses"
            className={`nav-link ${activeLink === 'courses' ? 'active' : ''}`}
            onClick={() => handleActiveLink('courses')}
          >
            Courses
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
