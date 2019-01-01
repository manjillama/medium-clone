import React from 'react';
import CategoryNav from 'components/site/includes/CategoryNav';
import StoryList from 'components/site/StoryList';
import axios from 'axios';
import config from 'config';

/*
* Testing phase on going...
*/
export default class Topic extends React.Component{
  constructor(){
    super();
    this.state = {
      stories: null
    }
  }

  componentDidMount(){
    this.fetchStory(this.props.match.params.topic);
  }

  fetchStory(topicParam){
    const topic = topicParam;
    /*
    * Test
    */
    axios.get(`${config.SERVER_URL}test-topic/${topic}`).then(res => {
      this.setState({stories: res.data});
    });
  }

  componentWillReceiveProps(nextProps){
    this.fetchStory(nextProps.match.params.topic);
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
