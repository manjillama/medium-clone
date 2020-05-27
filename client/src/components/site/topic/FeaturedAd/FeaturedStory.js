import React from "react";
import { fetchStory } from "services/storyService";
import { utcToLocalMin } from "services/utils";

export default class FeaturedStory extends React.Component {
  constructor() {
    super();
    this.state = {
      featuredStory: null,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.topic === "Life") {
      fetchStory(2).then((res) => {
        this.setState({
          featuredStory: res.data.blog,
        });
      });
    } else {
      fetchStory(1).then((res) => {
        this.setState({
          featuredStory: res.data.blog,
        });
      });
    }
  }

  render() {
    const story = this.state.featuredStory;
    if (story) {
      const storyCreationDate = utcToLocalMin(story.created_at);

      let backgroundImgStyle = {};
      if (story.blogThumbnails.length > 0) {
        backgroundImgStyle = {
          backgroundImage: `url(${story.blogThumbnails[0].story_thumb})`,
        };
      } else {
        backgroundImgStyle = {
          backgroundImage: `url(https://images.unsplash.com/photo-1523265760936-36c1b113b303?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1035&q=80)`,
        };
      }
      return (
        <div className="t-featured">
          <article>
            <h4>FEATURED</h4>
            {/*
              <a className="f-img" style={backgroundImgStyle} href={`/@${story.blogger.username}/${story.id}`}>
              </a>
              */}
            <h1>
              <a href={`/@${story.blogger.username}/${story.id}`}>
                {story.title}
              </a>
            </h1>
            <p>
              <a href={`/@${story.blogger.username}/${story.id}`}>
                {story.story_summary}
              </a>
            </p>
          </article>
          <div className="d--flex u-ct">
            <a href={`/@${story.blogger.username}`} className="p-i-wrap">
              <img src={story.blogger.profile_image} alt="Manjil Tamang" />
            </a>
            <div className="u-w">
              <a href={`/@${story.blogger.username}`}>
                {story.blogger.fullname}
              </a>
              <span>{storyCreationDate}</span>
            </div>
          </div>
        </div>
      );
    } else {
      return <noscript />;
    }
  }
}
