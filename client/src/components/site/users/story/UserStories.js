import React from 'react';
import { getUserPost } from '../../../../services/blogService';
import { utcToLocal } from '../../../../services/utils';

import { Link } from 'react-router-dom';

export default class DraftStories extends React.Component {
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
                <p className="s-l-taction">Last edited {timeStamp}</p>
              </Link>
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
