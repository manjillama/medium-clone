import React, { Component } from 'react';
import './Header.css';

class CategoryNav extends Component{
  render(){
    return (
      <div>
        <ul className="nav-cate-l list-inline">
          <li>Home</li>
          <li>Tech</li>
          <li>Startups</li>
          <li>Design</li>
          <li>Health</li>
          <li>Politics</li>
        </ul>
      </div>
    );
  }
}

export default CategoryNav;
