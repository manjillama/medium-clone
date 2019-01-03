import React from 'react';
import CategoryNav from 'components/site/includes/CategoryNav';
import { connect } from 'react-redux';
import StoryList from './StoryList';
import axios from 'axios';
import config from 'config';
/*
* Testing phase on going...
*/
class Home extends React.Component{
  constructor(){
    super();
    this.state = {
      stories: null
    }
  }

  componentDidMount(){
    /*
    * Test
    */
    axios.get(`${config.SERVER_URL}test-stories`).then(res => {
      this.setState({stories: res.data});
    });
  }

  render(){
    return (
      <div>
        <CategoryNav/>
        <StoryList stories={this.state.stories} />
      </div>
    );
  }
}

function mapStateToProps(state){
  return { state };
}

export default connect(mapStateToProps)(Home);
