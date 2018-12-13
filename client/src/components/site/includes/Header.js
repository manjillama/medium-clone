import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../../../actions';
import './Header.css';
import { withRouter } from 'react-router-dom';

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
      let links = node.getElementsByTagName("ul");
      if(node){
        // If user clicks outside the dropdown menu
        if(!node.contains(e.target) && !userBtn.contains(e.target)){
          this.setState({showUserDropdown:false});
        }else{
          /*
          * If links are clicked
          * setTimeout is so that dropdown gets unvisible only after link is clicked
          */
          if(links[0].contains(e.target)){
            setTimeout(()=>{
              this.setState({showUserDropdown:false});
            }, 100);
          }
        }
      }
    }
  }

  signOut = () => {
    this.setState({showUserDropdown: false});
    this.props.signOut(() => {
      this.props.history.push('/');
    });
  }

  _renderUserDropdown(){
    if(this.state.showUserDropdown){
      return (
        <div className="popover-userAction" id="pUserActionPanel">
          <ul>
            <li><a href="/">New Story</a></li>
            <li><a href="/">Stories</a></li>
            <li><Link to={`/@${this.props.auth.user.username}`}>Profile</Link></li>
            <li><Link to="/me/settings">Settings</Link></li>
            <li style={{cursor: 'pointer',padding: 7+'px '+ 0}} onClick={this.signOut}>Sign Out</li>
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

export default withRouter(connect(mapStateToProps, {signOut})(Header));
