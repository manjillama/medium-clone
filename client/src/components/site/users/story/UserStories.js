import React from 'react';
import { getUserPost } from '../../../../services/blogService';
import { utcToLocal } from '../../../../services/utils';
import { withRouter } from "react-router";

import { Link } from 'react-router-dom';

class UserStories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: null,
      showStories: null
    }
  }

  componentDidMount(){
    this.setState({showStories: this.props.showStories}, ()=>{
      this.fetchPosts();
    })
  }

  componentWillReceiveProps(nextProps){
    this.setState({showStories: nextProps.showStories}, ()=>{
      this.fetchPosts();
    })
  }

  async fetchPosts(){
    const userToken = localStorage.getItem('token');
    let blogs = [];
    let status;
    if(this.state.showStories === 'drafts'){
      status = false;
    }else{
      status = true;
    }
    await getUserPost(userToken, status)
      .then(res => {
        res.data.forEach(blog => {
          blogs.push(blog);
        });
      });
    this.setState({blogs});
  }

  renderToolTip = (e) => {
    let id = e.target.getAttribute('data-attr-id');
    if(id){
      // create tooltip
    }
  }

  renderPosts(){
    const { blogs } = this.state;
    if(blogs){
      if(blogs.length > 0){
        const listItems = blogs.map((blog) =>{
          const timeStamp = utcToLocal(blog.modified_at);
          return (
            <li className="s-l-item" key={blog.id}>
              <Link to={`/p/${blog.id}/edit`}>
                <h3>{blog.title.length > 0 ? blog.title : 'Untitled Story'}</h3>
              </Link>
              <div className="d--flex">
                <p className="s-l-taction">Last edited {timeStamp}</p>
                <button className="btn-chromeless" onClick={this.renderToolTip} data-attr-id={blog.id}>
                  <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg" data-attr-id={blog.id}>
                    <path d="M4 7.33L10.03 14l.5.55.5-.55 5.96-6.6-.98-.9-5.98 6.6h1L4.98 6.45z" fillRule="evenodd"></path>
                  </svg>
                </button>
              </div>
            </li>
          );
        });
        return (
          <ul className="list-n-block">{listItems}</ul>
        );
      }else {
        return <h3 className="user--msg">You haven't wrote any stories yet.</h3>
      }

    }else{
      return <h3 className="user--msg">Loading...</h3>;
    }
  }
  render(){
    return (
      <div>
        {this.renderPosts()}
      </div>
    )
  }
}

export default withRouter(UserStories);
