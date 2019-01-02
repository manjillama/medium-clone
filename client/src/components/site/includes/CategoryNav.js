import React, { Component } from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class CategoryNav extends Component{
  render(){
    return (
      <div className="main-category-nav">
        <ul className="nav-cate-l list-inline">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/topic/technology">Tech</Link></li>
          <li><Link to="/topic/startups">Startups</Link></li>
          <li><Link to="/topic/design">Design</Link></li>
          <li><Link to="/topic/health">Health</Link></li>
          <li><Link to="/topic/politics">Politics</Link></li>
          {
            //           <li style={{border: 1+'px solid #ccc',padding: 3+'px',fontSize: 8+'px',verticalAlign: 'top'}}>Pre-Alpha</li>

          }
        </ul>
      </div>
    );
  }
}

export default CategoryNav;
