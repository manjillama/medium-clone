import React from 'react';
import { utcToLocalMin } from 'services/utils';
import { Link } from 'react-router-dom';

export default (props) => {

  function __renderStoryThumb(story){
    if(story.blogThumbnails[0]){
      const src = story.blogThumbnails[0].story_thumb;
      return  (
        <Link style={{backgroundImage: `url(${src})`}} to={`/@${story.blogger.username}/${story.id}`} className="h-s-img">
        </Link>
      );
    }
  }

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
                  {story.desc_summary}...
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

}
