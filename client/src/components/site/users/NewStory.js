import React, { Component } from 'react';
import './StoryForm.css';

class NewStory extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      post: ''
    }
  }

  handleTitleChange = (e) => {
    this.setState({title: e.target.value});
  }

  handlePostChange = (e) => {
    console.log("Triggered");
    this.setState({post: e.target.value});
  }

  render(){
    return (
      <section className="container--sm">
        <form>
          <input className="input-story-t" type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}/>
          <div className="input-story-p" contentEditable="true" onChange={this.handlePostChange}></div>
        </form>
        {this.state.post}
      </section>
    );
  }
}

export default NewStory;
