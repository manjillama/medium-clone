import React from 'react';
import { getUserPost } from 'services/blogService';
import { utcToLocal } from 'services/utils';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class UserStories extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      blogs: null,
      showStories: null,
      tooltip: null
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

  createToolTipProps = (e) => {
    let postId = e.currentTarget.getAttribute('data-attr-id');
    const id = e.currentTarget.id;
    if(id){
      // tooltip logic
      const btn = document.getElementById(id);
      const offsetLeft = btn.offsetLeft;
      const offsetTop = btn.offsetTop;
      this.setState({
        tooltip: {
          id: postId,
          offsetLeft,
          offsetTop
        }
      });
    }
  }

  hideTooltip = (e) => {
    this.setState({tooltip: null});
  }

  renderTooltip(){
    const styles = {
      transform: `translate(${this.state.tooltip.offsetLeft}px, ${this.state.tooltip.offsetTop}px)`
    };
    return (
      <div>
        <div id="s-tooltipOverlay" onClick={this.hideTooltip}></div>
        <ul className="s-l-tooltip list-n-block" style={styles}>
          <li><Link to={`/p/${this.state.tooltip.id}/edit`}>Edit Story</Link></li>
          <li>Delete Story</li>
        </ul>
      </div>
    );
  }

  _renderBlogTitle(blog){
    if(this.state.showStories === 'drafts'){
      return (
        <Link to={`/p/${blog.id}/edit`}>
          <h3>{blog.title.length > 0 ? blog.title : 'Untitled Story'}</h3>
        </Link>
      );
    }else{
      return (
        <Link to={`/@${this.props.username}/${blog.id}`}>
          <h3>{blog.title}</h3>
        </Link>
      );
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
              {this._renderBlogTitle(blog)}
              <div className="d--flex">
                <p className="s-l-taction">Last edited {timeStamp}</p>
                <button className="btn-chromeless" onClick={this.createToolTipProps} id={`sItemId${blog.id}`} data-attr-id={blog.id} style={{position: 'relative'}}>
                  <svg width="21" height="21" viewBox="0 0 21 21" xmlns="http://www.w3.org/2000/svg">
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
        return (
          <h3 className="user--msg">{this.state.showStories === 'drafts' ? 'You haven\'t wrote any stories yet.': 'You haven\'t published any public stories yet.'}</h3>
        );
      }

    }else{
      return <h3 className="user--msg">Loading...</h3>;
    }
  }
  render(){
    return (
      <div>
        {this.renderPosts()}
        {this.state.tooltip && this.renderTooltip()}
      </div>
    )
  }
}

function mapStateToProps(state){
  return {username: state.auth.authenticated.user.username};
}
export default connect(mapStateToProps, null)(UserStories);
