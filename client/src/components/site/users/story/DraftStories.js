import React from 'react';
import { getUserPost } from '../../../../services/blogService';
import { Link } from 'react-router-dom';

export default class DraftStories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: null
    }
  }

  componentDidMount(){
    this.fetchPosts()
  }

  async fetchPosts(){
    const userToken = localStorage.getItem('token');
    let blogs = [];
    await getUserPost(userToken, false)
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
        const listItems = blogs.map((blog) =>
          <li className="s-l-item" key={blog.id}>
            <Link to={`/p/${blog.id}/edit`}>
              <h3>{blog.title}</h3>
            </Link>
          </li>
        );
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
