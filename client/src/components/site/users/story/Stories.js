import React from 'react';
import './Stories.css';
import { Link } from 'react-router-dom';
import DraftStories from './DraftStories';
import PublishedStories from './PublishedStories';

export default class Stories extends React.Component {
  renderNav(){
    const tab = this.props.match.params.id;

    if(tab === 'drafts'){
      return (
        <ul className="list-inline">
          <li className="active"><Link to="/me/stories/drafts">Drafts</Link></li>
          <li><Link to="/me/stories/published">Published</Link></li>
        </ul>
      )
    }else{
      return (
        <ul className="list-inline">
          <li><Link to="/me/stories/drafts">Drafts</Link></li>
          <li className="active"><Link to="/me/stories/published">Published</Link></li>
        </ul>
      )
    }
  }

  renderContent(){
    const tab = this.props.match.params.id;
    if(tab === 'drafts'){
      return <DraftStories/>
    }else{
      return <PublishedStories/>
    }
  }

  render(){
    return (
      <section>
        <h1 className="title--lg" style={{marginBottom:30+'px'}}>Your Stories</h1>
        <nav>
          {this.renderNav()}
        </nav>
        <div>
          {this.renderContent()}
        </div>
      </section>
    );
  }
}
