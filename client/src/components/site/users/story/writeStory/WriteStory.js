import React, { Component } from 'react';
import './WriteStory.css';
import StoryForm from './StoryForm';
import StoryPublish from './publishStory/StoryPublish';
import { writePost, fetchPost } from 'services/blogService';
import requireAuth from 'components/requireAuth';

class WriteStory extends Component{
  constructor(props){
    super(props);
    this.state = {
      blog: {
        id: null,
        title: '',
        draft:''
      },
      savingState: 'onhold',
      renderError: false,
      loading: true
    }
  }

  componentDidMount(){
    // To delay blog data send
    this.timeout =  0;
    this.userToken = localStorage.getItem('token');

    // If component is mounted through edit section
    const postId = this.props.match.params.postId;
    // If component is rendered through editing page
    if(postId){
      this.getPost(postId);
    }else{
      this.setState({loading:false})
    }
  }

  /*
  * componentWillReceiveProps works well in this case as it receives a new props from history api
  * Whenever the url changes
  * Triggering another props receving action from here will create an infinite loop
  */
  componentWillReceiveProps(nextProps){
    this.setState({renderError: false, loading:true}, () => {
      let { path } = nextProps.match;
      if(path === '/new-story'){
        // User navigated to new story Page
        this.setState({
          blog: { id: null, title: '', draft:''},
          loading: false
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
            blog: post,
            loading: false
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
      blog: {...this.state.blog, draft: e.target.value}
    }, this.saveBlog());
  }



  saveBlog = () => {
    if(this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {

      let formData = new FormData();
      formData.append("title", this.state.blog.title);
      formData.append("post", this.state.blog.draft);
      formData.append("postId", this.state.blog.id);
      this.setState({savingState: 'onprogress'});
      // If postId is null a new post is created else blog will get updated
      writePost(formData, this.userToken)
        .then((response) => {
          this.setState({savingState: 'saved'}, () => {
            // If post is newly created, id is returned
            let id = response.data.postId;
            if(id){
              this.setState({ blog: {...this.state.blog, id} }, ()=>{
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
      if(this.state.loading){
        return <h3>Loading...</h3>;
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
}

export default requireAuth(WriteStory);
