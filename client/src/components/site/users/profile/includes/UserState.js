import React from 'react';
import './UserState.css';
import PublishedStoryList from './PublishedStoryList';

export default class UserState extends React.Component{
  constructor(){
    super();
    this.state = {
      toggleTabs : 'profile'
    }
  }

  _renderTabs(){
    if(this.state.toggleTabs === 'profile'){
      return <PublishedStoryList blogger={this.props.blogger}/>
    }
  }

  render(){
    return (
      <div className="user-state">
        <nav>
          <ul className="list-inline">
            <li className="active"><button className="mjl-btn">Profile</button></li>
          </ul>
        </nav>
        <div>
          {this._renderTabs()}
        </div>
      </div>
    );
  }
}
