import React from 'react';
import { Link } from 'react-router-dom';

export default (props) => {
  return (
    <div className="s-c">
      {renderStories(props.stories)}
    </div>
  );
}

function renderStories(stories){
  return stories.map(story => {
    return (
      <div key={story.username}>
        <div style={{margin: `${20}px ${0}`}}>
          {_renderProfileImage(story)}
          <div className="user-i">
            <Link to={`/@${story.username}`}>{story.fullname}</Link>
            <span>{story.bio}</span>
          </div>
        </div>
        {renderInnerStories(story.stories, story.username)}
      </div>
    );
  })
}

function renderInnerStories(stories, username){
  return stories.map((story) => {
    const backgroundImage = story.story_thumbnail;
    return (
      <div className="s-story" key={story.id}>
        {(backgroundImage &&
          <Link to={`/@${username}/${story.id}`} className="story-box" style={{backgroundImage: `url(${backgroundImage})`}}>
          </Link>)}
        <article>
          <Link to={`/@${username}/${story.id}`}>
            <h2>{story.title}</h2>
            <p className="text--muted">
              {story.story_summary}
            </p>
          </Link>
        </article>
      </div>
    );
  })
}

function _renderProfileImage(story){
  if(story.profile_image){
    return (
      <Link to={`/@${story.username}`}>
        <img className="user--img" src={story.profile_image} alt={story.fullname}/>
      </Link>
    );
  }else{
    const initial = story.fullname.charAt(0);
    return (
      <Link to={`/@${story.username}`}>
        <div className="user--img"><span>{initial}</span></div>
      </Link>
    );
  }
}
