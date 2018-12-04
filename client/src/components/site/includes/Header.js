import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './Header.css';

class Header extends Component{
  constructor(props){
    super(props);
    this.state = {showUserDropdown: false};
  }

  triggerModal(){
    this.props.triggerModal();
  }

  toggleUserDropdown = () => {
    this.setState({showUserDropdown: !this.state.showUserDropdown});
  }

  componentDidMount(){
    document.addEventListener('click', this.handleBlur, true);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleBlur, true);
  }

  handleBlur = (e) => {
    if(this.state.showUserDropdown){
      let node = document.getElementById('pUserActionPanel');
      let userBtn = document.getElementById('popUserPanel');
      if(node){
        if(!node.contains(e.target) && !userBtn.contains(e.target)){
          this.setState({showUserDropdown:false});
        }
      }
    }
  }

  _renderUserDropdown(){
    if(this.state.showUserDropdown){
      return (
        <div className="popover-userAction" id="pUserActionPanel">
          <ul>
            <li><a href="/">New Story</a></li>
            <li><a href="/">Stories</a></li>
            <li><a href="/">Profile</a></li>
            <li><a href="/">Settings</a></li>
            <li><a href="/">Sign Out</a></li>
          </ul>
        </div>
      );
    }
  }

  renderLinks(){
    if(this.props.auth){
      return (
        <div className="inline-continue">
          <li><Link to="/contact">Notification</Link></li>
          <li className="popover-p-wrap">
            <div id="popUserPanel" className="popover-userIcon" onClick={this.toggleUserDropdown}>User Profile</div>
            {this._renderUserDropdown()}
          </li>
        </div>
      );
    }else{
      return (
        <li><button className="btn--p-hollow mjl-btn" onClick={this.triggerModal.bind(this)}>Get Started</button></li>
      );
    }
  }

  render(){
    return (
      <div>
        <div className="nav-top-bar">
          <div className="tb-flex1">
            <Link to="/">
            <svg viewBox="0 0 497.3 156.9" style={{height: 30+'px'}}>
              <rect x="124.4" width="278.7" height="156.9"/>
              <text transform="matrix(1 0 0 1 146.8478 129.5559)" className="st0 st1 st2">READ</text>
              <text transform="matrix(1 0 0 1 0 128.5559)" className="st1 st3">Th</text>
              <text transform="matrix(1 0 0 1 414.9225 128.556)" className="st1 st3">ly</text>
            </svg>

            </Link>
          </div>
          <div className="tb-flex0">
            <ul className="list-inline">
              <li>Search</li>
              <li><Link to="/contact">Contact</Link></li>
              {this.renderLinks()}

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

function mapStateToProps(state){
  return {auth: state.auth.authenticated};
}

export default connect(mapStateToProps)(Header);
