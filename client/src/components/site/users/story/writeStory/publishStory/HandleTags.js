import React from 'react';
import PropTypes from 'prop-types';
import { addBlogTag, removeBlogTag, getBlogTag } from 'services/blogTagService';

class HandleTags extends React.Component{
  constructor(){
    super();
    this.state = {
      tags: []
    }
  }
  componentDidMount(){
    this.blogId = this.props.blogId;
    this.token = localStorage.getItem('token');

    getBlogTag(this.token, this.blogId).then(res => {
      this.setState({tags: res.data});
      this.editor = document.getElementById("tagEditor");
    });
  }

  handleTagAdd = (tag) => {
    let formData = new FormData();
    formData.append('tag', tag);
    addBlogTag(formData, this.token, this.blogId).then(res => {
      this.setState({
        tags: res.data
      });
    });
  }

  handleTagRemove = (tagId) => {
    let formData = new FormData();
    formData.append('id', tagId);
    removeBlogTag(formData, this.token, this.blogId).then(res => {
      this.setState({
        tags: res.data
      });
    });
  }

  handleChange = (e) => {
    const val = e.target.value;
    // Checking for comma
    if (val.indexOf(',') !== -1) {
      const tag = val.split(',')[0];
      this.editor.value = '';
      this.handleTagAdd(tag);
    }
  }

  renderTags(){
    return this.state.tags.map((tagObj, index) =>
      <div className="tag-elem" key={index}>{tagObj.tag}
        <button className="btn-chromeless"
          onClick={()=>{
            this.handleTagRemove(tagObj.id);
          }}>x</button>
      </div>
    )
  }

  render(){
    return (
      <div className="handleTags">
        <h2>Prepare your story for readers</h2>
        <p>Add or change tags (up to 5) so readers know what your story is about</p>
        <p>Review Threadly’s <a target="_blank" href="/threadly/policy" style={{textDecoration:'underline'}}>rules</a> to ensure that your story meets our community standards.</p>
        <br/>
          <div className="p-add-tags">
            <div className="tags-wrapper" style={{display: 'inline-block'}}>
              {this.renderTags()}
            </div>
            <div className="c-input-wrap">
              {this.state.tags.length < 5 && (<input onChange={this.handleChange} placeholder="Separate tags with a comma..." id="tagEditor" />)}
            </div>
          </div>
      </div>
    );
  }
}

HandleTags.propTypes = {
  blogId: PropTypes.number.isRequired
}

export default HandleTags;
