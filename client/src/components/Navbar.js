import React, { useState } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Navbar({ user, setLoginUser }) {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleToggle = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link className='navbar-logo' to='/'>
            <img
              className='navbar-logo-img'
              src='https://cdn-icons-png.flaticon.com/128/686/686234.png'
              alt='logo'
            />
            <span className='navbar-logo-text'>QuickNotes</span>
          </Link>

          <div className={`navbar-links ${isNavbarOpen ? 'active' : ''}`}>
            <Link className='navbar-link' to='/addnote'>
              <img
                className='navbar-link-icon'
                src='https://cdn-icons-png.flaticon.com/128/2921/2921226.png'
                alt='add-icon'
              />
              Add Note
            </Link>

            <Link className='navbar-link' to='/'>
              <img
                className='navbar-link-icon'
                src='https://img.freepik.com/free-icon/user_318-749758.jpg'
                alt='profile-icon'
              />
              {user && user._id ? `Hello! ${user.username}` : 'Hello!'}
            </Link>

            {user && user._id ? (
              <div className='navbar-link' onClick={() => setLoginUser({})}>
                <img
                  className='navbar-link-icon'
                  src='https://cdn-icons-png.flaticon.com/128/10405/10405572.png'
                  alt='logout-icon'
                />
                Logout
              </div>
            ) : (
              <Link className='navbar-link' to='/login'>
                <img
                  className='navbar-link-icon'
                  src='https://cdn-icons-png.flaticon.com/128/10405/10405572.png'
                  alt='login-icon'
                />
                Login
              </Link>
            )}
          </div>

          <div className='navbar-toggle' onClick={handleToggle}>
            <span className={`toggle-icon ${isNavbarOpen ? 'active' : ''}`}></span>
            <span className={`toggle-icon ${isNavbarOpen ? 'active' : ''}`}></span>
            <span className={`toggle-icon ${isNavbarOpen ? 'active' : ''}`}></span>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
