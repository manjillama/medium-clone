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
    this.topic = this.props.match.params.topic;
    this.__displayTopicTitle();
    this.fetchStory();
  }

  componentWillUnmount(){
    this.node.parentNode.removeChild(this.node);
  }

  __capitalizeFirstChar(text){
    return text.charAt(0).toUpperCase() + text.substr(1);
  }

  __displayTopicTitle(){
    const topic = this.__capitalizeFirstChar(this.topic);
    this.node = document.createElement("H2");
    var textnode = document.createTextNode(topic);
    this.node.appendChild(textnode);
    this.logoNode.appendChild(this.node);
  }

  fetchStory(){
    const topic = this.topic;
    /*
    * Test
    */
    axios.get(`${config.SERVER_URL}test-topic/${topic}`).then(res => {
      this.setState({stories: res.data});
    });
  }

  render(){
    let topic = '';
    if(this.topic){
      topic =  this.__capitalizeFirstChar(this.topic);
    }
    return (
      <section>
        <StoryList topic={topic} stories={this.state.stories} />
      </section>
    );
  }
}
