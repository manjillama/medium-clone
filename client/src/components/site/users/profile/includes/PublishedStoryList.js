import React from 'react';
import { fetchUserStories } from 'services/storyService';
import './UserState.css';
import { Link } from 'react-router-dom';
import { utcToLocalMin } from 'services/utils';

export default class PublishedStoryList extends React.Component{
  constructor(){
    super();
    this.state = {
      stories: null
    }
  }
  componentDidMount(){
    fetchUserStories(this.props.blogger.id).then(res => {
      this.setState({stories: res.data});
    })
  }

  _renderProfileImage(){
    if(this.props.blogger.profile_image){
      return (
        <Link to={`/@${this.props.blogger.username}`}>
          <img src={this.props.blogger.profile_image} alt={this.props.blogger.fullname}/>
        </Link>
      );
    }else{
      const initial = this.props.blogger.fullname.charAt(0);
      return (
        <Link to={`/@${this.props.blogger.username}`}>
          <div className="usr-p-image"><span>{initial}</span></div>
        </Link>
      );
    }
  }

  _renderStories(){
    return this.state.stories.map(story => {
      const storyCreationDate = utcToLocalMin(story.created_at);

      return (
        <div key={story.id} className="p-story-wrap">
          <div className="info-wrap d--flex">
            <div>{this._renderProfileImage()}</div>
            <div className="usr-w">
              <Link to={`/@${this.props.blogger.username}`}>{this.props.blogger.fullname}</Link>
              <span>{storyCreationDate}</span>
            </div>
          </div>
          <div>
            <h3><Link to={`@${this.props.blogger.username}/${story.id}`}>{story.title}</Link></h3>
          </div>
        </div>
      );
    })
  }

  showStory(){
    if(this.state.stories){
      if(this.state.stories.length > 0){
        return (
          <div>
            <h3>Latest</h3>
            {this._renderStories()}
          </div>
        );
      }else{
        return <h3>No stories yet :(</h3>
      }
    }else{
      return <h3>Loading...</h3>
    }
  }

  render(){
    return (
      <section className="p-story-list">
        {this.showStory()}
      </section>
    );
  }
}
