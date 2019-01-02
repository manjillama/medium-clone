import React from 'react';
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
    this.logoNode = document.getElementById('ThLogo');
    const topic = this.props.match.params.topic;
    this.__displayTopicTitle(topic);
    this.fetchStory(topic);
  }

  componentWillUnmount(){
    this.node.parentNode.removeChild(this.node);
  }

  __displayTopicTitle(topic){
    const t = topic.charAt(0).toUpperCase() + topic.substr(1);
    this.node = document.createElement("H2");
    var textnode = document.createTextNode(t);
    this.node.appendChild(textnode);
    this.logoNode.appendChild(this.node);
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

  // componentWillReceiveProps(nextProps){
  //   this.fetchStory(nextProps.match.params.topic);
  // }

  render(){
    return (
      <section>
        <StoryList stories={this.state.stories} />
      </section>
    );
  }
}
