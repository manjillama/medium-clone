import React, { Component } from 'react';
import './StoryForm.css';
import ContentEditable from 'react-contenteditable'; //https://github.com/lovasoa/react-contenteditable

import { createBlog } from '../../../services/createBlog';

class NewStory extends Component{
  constructor(props){
    super(props);
    this.state = {
      title: '',
      post: '',
      savingState: 'onhold',
    }
  }

  componentDidMount(){
    // To delay blog data send
    this.timeout =  0;
    this.userToken = localStorage.getItem('token');
  }


  handleTitleChange = (e) => {
    this.setState({title: e.target.value}, this.createBlog());
  }

  handlePostChange = (e) => {
    this.setState({post: e.target.value}, this.createBlog());
  }

  createBlog = () => {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      let formData = new FormData();
      formData.append("title", this.state.title);
      formData.append("post", this.state.post);

      this.setState({savingState: 'onprogress'});
      createBlog(formData, this.userToken)
        .then((response) => {
          this.setState({savingState: 'done', postId: response.data.postId}, () => {
            setTimeout(() => {
              this.setState({savingState: 'onhold'});
            }, 1200);
          });
        });
    }, 800);
  }

  renderSavingState(){
    if(this.state.savingState === 'onprogress'){
      return <span>Saving</span>;
    }else if(this.state.savingState === 'done'){
      return <span>Saved</span>
    }
  }

  renderPostPlaceHolder(){
    if(this.state.post === '')
      return <span style={{position:'absolute',top:0,left:0,fontSize: 22+'px'}} className="text--muted">Tell us your story...</span>
  }

  render(){
    return (
      <section className="container--sm">
      {this.renderSavingState()}
        <form>
          <input className="input-story-t" type="text" placeholder="Title" value={this.state.title} onChange={this.handleTitleChange}/>
          <div style={{position:'relative'}}>
            {this.renderPostPlaceHolder()}
            <ContentEditable
              className="input-story-p"
              innerRef={this.contentEditable}
              html={this.state.post}
              disabled={false}
              onChange={this.handlePostChange} />
          </div>
        </form>
      </section>
    );
  }
}

export default NewStory;
