import React, { Component } from 'react';
import './WriteStory.css';
import StoryForm from './StoryForm';
import StoryPublish from './publishStory/StoryPublish';
import { writePost, fetchPost } from 'services/blogService';

class WriteStory extends Component{
  constructor(props){
    super(props);
    this.state = {
      blog: {
        postId: null,
        title: '',
        post: '',
      },
      savingState: 'onhold',
      renderError: false
    }
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

  /*
  * componentWillReceiveProps works well in this case as it receives a new props from history api
  * Whenever the url changes
  * Triggering another props receving action from here will create an infinite loop
  */
  componentWillReceiveProps(nextProps){
    this.setState({renderError: false}, () => {
      let { path } = nextProps.match;
      if(path === '/new-story'){
        // User navigated to new story Page
        this.setState({
          blog: {
            ...this.state.blog, postId: null,title: '',post: ''
          }
        });
      }else{
        // User navigated to Edit Page
        const postId = this.props.match.params.postId;
        if(postId)
          this.getPost(postId);
      }
    });
  }

  getPost(id){
    fetchPost(id, this.userToken)
      .then(res => {
        let post = res.data.blog; // returns null if post doesn't exist or belongs to another user
        if(post){
          this.setState({
            blog: {...this.state.blog, title: post.title, post: post.description, postId: id}
          });
        }else{
          this.setState({renderError: true});
        }
      });
  }


  handleTitleChange = (e) => {
    this.setState({
      blog: {...this.state.blog, title: e.target.value}
    }, this.saveBlog());
  }

  handlePostChange = (e) => {
    this.setState({
      blog: {...this.state.blog, post: e.target.value}
    }, this.saveBlog());
  }

  saveBlog = () => {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      let formData = new FormData();
      formData.append("title", this.state.blog.title);
      formData.append("post", this.state.blog.post);
      formData.append("postId", this.state.blog.postId);

      this.setState({savingState: 'onprogress'});
      writePost(formData, this.userToken)
        .then((response) => {
          this.setState({savingState: 'saved'}, () => {
            // If post is newly created, id is returned
            let id = response.data.postId;
            if(id){
              this.setState({ blog:{postId: id} }, ()=>{
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



  render(){
    if(this.state.renderError){
      return (
        <h1>Page not found :(</h1>
      );
    }else{
      return (
        <section className="container--sm">
          <StoryPublish savingState={this.state.savingState} blog={this.state.blog}/>

          <StoryForm
            handlePostChange={this.handlePostChange}
            handleTitleChange={this.handleTitleChange}
            blog={this.state.blog}/>

        </section>
      );
    }
  }
}

export default WriteStory;
