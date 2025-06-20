import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <>
      <header className="main-header">
        <div className="left-logo">
          <img
            src="https://img.icons8.com/ios-filled/50/000000/book.png"
            alt="Library Logo"
          />
          <div className="header-title">
            <div>Online Library</div>
            <div>Management System</div>
          </div>
        </div>
        <div className="right-logo">
          <img
            src="https://img.icons8.com/ios-filled/40/000000/book-shelf.png"
            alt="Right Logo"
          />
        </div>
      </header>
      <div className="header-divider"></div>
    </>
  );
};

export default Header;
