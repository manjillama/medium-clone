import React from 'react';
import { utcToLocalMin } from 'services/utils';
import { Link } from 'react-router-dom';
import './StoryList.css';
import FollowTopic from './FollowTopic/FollowTopic';

export default (props) => {

  function _renderStories(){
    if(props.stories){
      if(props.stories.length > 0){
        return props.stories.map(story => {
          const storyCreationDate = utcToLocalMin(story.created_at);
          return (
            <div key={story.id} className="c-item d--flex flex-sb">
              <div>
                <article>
                  <Link to={`/@${story.blogger.username}/${story.id}`}>
                    <h3>{story.title}</h3>
                    <p className="d-summary text--muted">
                      {story.story_summary}...
                    </p>
                  </Link>
                  <div className="c-info">
                    <Link to={`/@${story.blogger.username}`}>
                      <p>{story.blogger.fullname}</p>
                    </Link>
                    <span className="text--muted">{storyCreationDate}</span>
                  </div>
                </article>
              </div>
              {__renderStoryThumb(story)}
            </div>
          );
        });
      }else{
        return <h4 style={{marginTop:10+'px'}}>No stories as of yet to read. :( </h4>;
      }
    }else{
      return <h4>Loading...</h4>
    }
  }

  function __renderStoryThumb(story){
    if(story.blogThumbnails[0]){
      const src = story.blogThumbnails[0].story_thumb;
      return  (
        <Link style={{backgroundImage: `url(${src})`}} to={`/@${story.blogger.username}/${story.id}`} className="h-s-img">
        </Link>
      );
    }
  }
  return (
    <div>
      <section className="h-page">
        <div className="d--flex flex-sb h-c-wrap">

          <div className="main-c" >

            <FeaturedStory/>

            <div>
              <h4 className="p-t">LATEST</h4>
              {_renderStories()}
            </div>

          </div>
          <div className="h-s">
            {props.topic && (
              <div className="t-aside">
                <h2>{props.topic}</h2>
                <FollowTopic />
                <p className="p--sm text--muted">
                  Follow to get great stories about {props.topic} in your inbox and on your homepage
                </p>
              </div>
            )}
            <StoryAd/>
          </div>

        </div>
      </section>
    </div>
  );
}

function StoryAd(){
  return (
    <div className="hs--ad">
      <span className="adv-t text--muted">
        <img
          style={{height: 14+'px',marginRight: 5+'px'}}
          src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTguMS4xLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgdmlld0JveD0iMCAwIDE1IDE1IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAxNSAxNTsiIHhtbDpzcGFjZT0icHJlc2VydmUiIHdpZHRoPSI1MTJweCIgaGVpZ2h0PSI1MTJweCI+CjxnPgoJPHBhdGggZD0iTTE0Ljk4Miw3QzE0LjczNiwzLjI1NiwxMS43NDQsMC4yNjMsOCwwLjAxN1YwSDcuNUg3djAuMDE3QzMuMjU2LDAuMjYzLDAuMjYzLDMuMjU2LDAuMDE3LDdIMHYwLjUgICBWOGgwLjAxN0MwLjI2MywxMS43NDQsMy4yNTYsMTQuNzM2LDcsMTQuOTgyVjE1aDAuNUg4di0wLjAxOGMzLjc0NC0wLjI0Niw2LjczNi0zLjIzOCw2Ljk4Mi02Ljk4MkgxNVY3LjVWN0gxNC45ODJ6IE00LjY5NSwxLjYzNSAgIEM0LjIxMiwyLjI3NywzLjgxMSwzLjA4MiwzLjUxOSw0SDIuMDIxQzIuNjczLDIuOTgzLDMuNTk5LDIuMTYsNC42OTUsMS42MzV6IE0xLjQ5OCw1aDEuNzU4QzMuMTIyLDUuNjMyLDMuMDM3LDYuMzAzLDMuMDEsN0gxLjAxOSAgIEMxLjA3Miw2LjI5NiwxLjIzOCw1LjYyMywxLjQ5OCw1eiBNMS4wMTksOEgzLjAxYzAuMDI3LDAuNjk3LDAuMTEyLDEuMzY4LDAuMjQ2LDJIMS40OThDMS4yMzgsOS4zNzcsMS4wNzIsOC43MDQsMS4wMTksOHogICAgTTIuMDIxLDExaDEuNDk3YzAuMjkyLDAuOTE4LDAuNjkzLDEuNzIzLDEuMTc3LDIuMzY1QzMuNTk5LDEyLjg0LDIuNjczLDEyLjAxOCwyLjAyMSwxMXogTTcsMTMuOTM2ICAgQzUuOTcyLDEzLjY2MSw1LjA4NywxMi41NTcsNC41NSwxMUg3VjEzLjkzNnogTTcsMTBINC4yNjlDNC4xMjgsOS4zNzcsNC4wMzksOC43MDQsNC4wMSw4SDdWMTB6IE03LDdINC4wMSAgIGMwLjAyOS0wLjcwNCwwLjExOC0xLjM3NywwLjI1OS0ySDdWN3ogTTcsNEg0LjU1QzUuMDg3LDIuNDQzLDUuOTcyLDEuMzM5LDcsMS4wNjVWNHogTTEyLjk3OSw0aC0xLjQ5NiAgIGMtMC4yOTMtMC45MTgtMC42OTMtMS43MjMtMS4xNzgtMi4zNjVDMTEuNCwyLjE2LDEyLjMyNywyLjk4MywxMi45NzksNHogTTgsMS4wNjVDOS4wMjcsMS4zMzksOS45MTMsMi40NDMsMTAuNDUsNEg4VjEuMDY1eiBNOCw1ICAgaDIuNzNjMC4xNDIsMC42MjMsMC4yMjksMS4yOTYsMC4yNiwySDhWNXogTTgsOGgyLjk5Yy0wLjAyOSwwLjcwNC0wLjExOCwxLjM3Ny0wLjI2LDJIOFY4eiBNOCwxMy45MzZWMTFoMi40NSAgIEM5LjkxMywxMi41NTcsOS4wMjcsMTMuNjYxLDgsMTMuOTM2eiBNMTAuMzA1LDEzLjM2NWMwLjQ4My0wLjY0MywwLjg4NS0xLjQ0NywxLjE3OC0yLjM2NWgxLjQ5NiAgIEMxMi4zMjcsMTIuMDE4LDExLjQsMTIuODQsMTAuMzA1LDEzLjM2NXogTTEzLjUwMiwxMGgtMS43NThjMC4xMzQtMC42MzIsMC4yMTktMS4zMDMsMC4yNDYtMmgxLjk5ICAgQzEzLjkyOCw4LjcwNCwxMy43NjIsOS4zNzcsMTMuNTAyLDEweiBNMTEuOTksN2MtMC4wMjctMC42OTctMC4xMTItMS4zNjgtMC4yNDYtMmgxLjc1OGMwLjI2LDAuNjIzLDAuNDI2LDEuMjk2LDAuNDc5LDJIMTEuOTl6IiBmaWxsPSIjNmU2ZTZlIi8+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" alt=""/>
        Sponsored
      </span>
      <div>
        <a href="https://www.ghyampostore.com" rel="noopener noreferrer" target="_blank">
          <img src="/static/images/ghyampo-sidebanner.png" alt="ghyampo store banner"/>
        </a>
      </div>
    </div>
  );
}

function FeaturedStory(props){
  return(
    <div className="t-featured">
      <article>
        <h4>FEATURED</h4>
        <a className="f-img" href="http://threadly.vortexnepal.com/@tYjvY7EML/4">
        </a>
        <h1>
          <a href="http://threadly.vortexnepal.com/@tYjvY7EML/4">Guide for writing better stories in Threadly</a>
        </h1>
        <p>
          <a href="http://threadly.vortexnepal.com/@tYjvY7EML/4">Exciting new update! Threadly now supports text formatting. To get started just select the text you want to format or double click...</a>
        </p>
      </article>
      <div className="d--flex u-ct">
        <a href="http://threadly.vortexnepal.com/@tYjvY7EML" className="p-i-wrap">
          <img src="https://manjiltamang-threadly.s3.ap-south-1.amazonaws.com/vRuRgmuYpED5.jpg" alt="Manjil Tamang"/>
        </a>
        <div className="u-w">
          <a href="http://threadly.vortexnepal.com/@tYjvY7EML">Manjil Tamang</a>
          <span>Jan 1st, 2019</span>
        </div>
      </div>
    </div>
  );
}
