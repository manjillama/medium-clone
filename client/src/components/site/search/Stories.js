import React from 'react';

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
            <a href={`/@${story.username}`}>{story.fullname}</a>
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
    console.log(backgroundImage);
    return (
      <div className="s-story" key={story.id}>
        {(backgroundImage &&
          <a href={`/@${username}/${story.id}`} className="story-box" style={{backgroundImage: `url(${backgroundImage})`}}>
          </a>)}
        <article>
          <h2>{story.title}</h2>
          <p className="text--muted">
            {story.story_summary}
          </p>
        </article>
      </div>
    );
  })
}

function _renderProfileImage(story){
  if(story.profile_image){
    return (
      <a href={`/@${story.username}`}>
        <img className="user--img" src={story.profile_image} alt={story.fullname}/>
      </a>
    );
  }else{
    const initial = story.fullname.charAt(0);
    return (
      <a href={`/@${story.username}`}>
        <div className="user--img"><span>{initial}</span></div>
      </a>
    );
  }
}
