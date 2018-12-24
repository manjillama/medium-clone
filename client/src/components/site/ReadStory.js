import React from 'react';
import { fetchStory } from 'services/storyService';
import './ReadStory.css';
import { utcToLocalMin } from 'services/utils';
import { Link } from 'react-router-dom';

export default class ReadStory extends React.Component{
  constructor(){
    super();
    this.state = {
      story: null,
      loading: true
    }
  }

  componentDidMount(){
    const {storyId} = this.props.match.params;
    fetchStory(storyId).then(res => {
      const story = res.data.blog;
      this.setState({story, loading: false}, this.renderStory)
    });
  }

  renderProfileImage(){
    if(this.state.story.blogger.profile_image){
      return (
        <Link to={`/@${this.state.story.blogger.username}`}>
          <img src={this.state.story.blogger.profile_image} alt={this.state.story.blogger.fullname}/>
        </Link>
      );
    }
  }

  renderStory = () => {
    /*
    * To display data as html instead of plain text
    */
    const article = document.getElementById('storyDesc');
    if(article)
      article.innerHTML = this.state.story.description;
  }

  render(){
    if(this.state.loading){
      return <h3>Loading...</h3>;
    }else{
      if(this.state.story){
        const storyCreationDate = utcToLocalMin(this.state.story.created_at);
        return (
          <section id="readStory" className="container--sm">
            <h1>{this.state.story.title}</h1>
            <div className="d--flex usr-content">
              <div className="profile-img-wrap">
                {this.renderProfileImage()}
              </div>
              <div className="usr-w">
                <Link to={`/@${this.state.story.blogger.username}`}>{this.state.story.blogger.fullname}</Link>
                <span>{storyCreationDate}</span>
              </div>
            </div>
            <article id="storyDesc">
            </article>
            <footer>
              <div className="d--flex">
                <div className="f-profile-img">
                  {this.renderProfileImage()}
                </div>
                <div className="f-usr-content">
                  <h3>
                    <Link to={`/@${this.state.story.blogger.username}`}>{this.state.story.blogger.fullname}</Link>
                  </h3>
                  <p>{this.state.story.blogger.bio}</p>
                </div>
              </div>
            </footer>
          </section>
        );
      }else{
        return <h3>Page not found :(</h3>
      }
    }
  }
}
