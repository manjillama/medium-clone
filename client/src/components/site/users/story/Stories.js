import React from 'react';
import './Stories.css';
import { Link } from 'react-router-dom';
import UserStories from './UserStories';
import { getUserStoriesCount } from 'services/blogService';
import requireAuth from 'components/requireAuth';

class Stories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showStories:null,
      storyCount: {
        published: '',
        drafts: ''
      }
    };
  }
  componentDidMount(){
    this.token = localStorage.getItem('token');
    getUserStoriesCount(this.token).then(res => {
      this.setState({storyCount: res.data});
    });
    this.setState({showStories:this.props.match.params.id});
  }
  renderNav(){
    if(this.state.showStories === 'drafts'){
      return (
        <ul className="list-inline">
          <li className="active"><Link to="/me/stories/drafts">Drafts {this.state.storyCount.drafts}</Link></li>
          <li><Link to="/me/stories/published">Published {this.state.storyCount.published}</Link></li>
        </ul>
      )
    }else{
      return (
        <ul className="list-inline">
          <li><Link to="/me/stories/drafts">Drafts {this.state.storyCount.drafts}</Link></li>
          <li className="active"><Link to="/me/stories/published">Published {this.state.storyCount.published}</Link></li>
        </ul>
      )
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({showStories:nextProps.match.params.id});
  }

  render(){
    if(this.state.showStories){
      return (
        <section>
          <div className="d--flex flex-sb flex-ai-cn flex-fw" style={{marginBottom:30+'px'}}>
            <h1 className="title--lg">Your Stories</h1>
            <Link to="/new-story" className="mjl-btn btn--p-hollow">Write Story</Link>
          </div>
          <nav className="s-nav">
            {this.renderNav()}
          </nav>
          <div>
            <UserStories showStories={this.state.showStories}/>
          </div>
        </section>
      );
    }else{
      return <h3>Loading...</h3>
    }
  }
}

export default requireAuth(Stories);
