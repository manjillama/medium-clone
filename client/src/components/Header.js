import React, { Component } from 'react';
import './Header.css';

class Header extends Component{
  render(){
    return (
      <div>
        <div className="nav-top-bar">
          <div className="tb-flex1">
            <a href="/">Logo</a>
          </div>
          <div className="tb-flex0">
            <ul className="list-inline">
              <li>Search</li>
              <li id="loginModalBtn">Sigin in</li>
              <li>Get Started</li>

              <li>Notification</li>
              <li className="popover-p-wrap">
                <div id="popUserPanel" className="popover-userIcon">User Profile</div>
                <div className="popover-userAction" id="pUserActionPanel" style={{display: 'none'}}>
                  <ul>
                    <li><a href="/">New Story</a></li>
                    <li><a href="/">Stories</a></li>
                    <li><a href="/">Profile</a></li>
                    <li><a href="/">Settings</a></li>
                    <li><a href="/">Sign Out</a></li>
                  </ul>
                </div>
              </li>

            </ul>
          </div>
        </div>
        <div>
          <ul className="list-inline">
            <li>Categories</li>
            <li>Categories</li>
            <li>Categories</li>
            <li>Categories</li>
            <li>Categories</li>
            <li>Categories</li>
          </ul>
        </div>
      </div>
    );
  }
}
export default Header;
