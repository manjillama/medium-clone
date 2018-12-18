import React from 'react';
import './Stories.css';
import { Link } from 'react-router-dom';
import UserStories from './UserStories';

export default class Stories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      showStories:null
    };
  }

  componentDidMount(){
    this.setState({showStories:this.props.match.params.id});
  }
  renderNav(){
    if(this.state.showStories === 'drafts'){
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

  componentWillReceiveProps(nextProps){
    this.setState({showStories:nextProps.match.params.id});
  }

  render(){
    if(this.state.showStories){
      console.log(this.state.showStories);
      return (
        <section>
          <h1 className="title--lg" style={{marginBottom:30+'px'}}>Your Stories</h1>
          <nav>
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
