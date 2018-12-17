import React, { Component } from 'react';
import './WriteStory.css';
import ContentEditable from 'react-contenteditable'; //https://github.com/lovasoa/react-contenteditable

import { writePost, fetchPost } from '../../../services/createBlog';

class WriteStory extends Component{
  constructor(props){
    super(props);
    this.state = {
      postId: null,
      title: '',
      post: '',
      savingState: 'onhold',
      renderError: false
    }
  }

  /*
  * componentWillReceiveProps works well in this case as it receives a new props from history api
  * Whenever the url changes
  * Triggering another props receving action from here will create an infinite loop
  */
  componentWillReceiveProps(nextProps){
    this.setState({renderError: false}, () => {
      let { path }= nextProps.match;
      if(path === '/new-story'){
        // User navigated to new story Page
        this.setState({postId: null,title: '',post: ''});
      }else{
        // User navigated to Edit Page
        const postId = this.props.match.params.postId;
        if(postId)
          this.getPost(postId);
      }
    });
  }

  componentDidMount(){
    // To delay blog data send
    this.timeout =  0;
    this.userToken = localStorage.getItem('token');

    // If component is mounted through edit section
    const postId = this.props.match.params.postId;
    // If component is rendered through editing page
    if(postId)
      this.getPost(postId);
  }

  getPost(id){
    fetchPost(id, this.userToken)
      .then(res => {
        let post = res.data.blog; // returns null if post doesn't exist or belongs to another user
        if(post){
          this.setState({title: post.title, post: post.description, postId: id});
        }else{
          this.setState({renderError: true});
        }
      });
  }


  handleTitleChange = (e) => {
    this.setState({title: e.target.value}, this.doBlog());
  }

  handlePostChange = (e) => {
    this.setState({post: e.target.value}, this.doBlog());
  }

  doBlog = () => {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let formData = new FormData();
      formData.append("title", this.state.title);
      formData.append("post", this.state.post);
      formData.append("postId", this.state.postId);

      this.setState({savingState: 'onprogress'});
      writePost(formData, this.userToken)
        .then((response) => {
          this.setState({savingState: 'saved'}, () => {
            // If post is newly created, id is returned
            let id = response.data.postId;
            if(id){
              this.setState({postId: id}, ()=>{
                this.props.history.push(`/p/${id}/edit`);
              });
            }
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
    }else if(this.state.savingState === 'saved'){
      return <span>Saved</span>
    }
  }

  renderPostPlaceHolder(){
    if(this.state.post === '')
      return <span style={{position:'absolute',top:0,left:0,fontSize: 22+'px'}} className="text--muted">Tell us your story...</span>
  }

  render(){
    if(this.state.renderError){
      return (
        <h1>Page not found :(</h1>
      );
    }else{
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
}

export default WriteStory;
