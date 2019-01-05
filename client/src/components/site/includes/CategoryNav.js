import React, { Component } from 'react';
import './Header.css';

class CategoryNav extends Component{
  render(){
    return (
      <div className="main-category-nav">
        <ul className="nav-cate-l list-inline">
          <li><a href="/">Home</a></li>
          <li><a href="/topic/technology">Tech</a></li>
          <li><a href="/topic/entertainment">Entertainment</a></li>
          <li><a href="/topic/startups">Startups</a></li>
          <li><a href="/topic/industry">Industry</a></li>
          <li><a href="/topic/life">Life</a></li>
          <li><a href="/topic/design">Design</a></li>
          <li><a href="/topic/health">Health</a></li>
          <li><a href="/topic/country">Country</a></li>
          <li><a href="/topic/politics">Politics</a></li>
          {
            //<li><Link to="/topics">More</Link></li>
          }

          {
            //           <li style={{border: 1+'px solid #ccc',padding: 3+'px',fontSize: 8+'px',verticalAlign: 'top'}}>Pre-Alpha</li>

          }
        </ul>
      </div>
    );
  }
}

export default CategoryNav;
