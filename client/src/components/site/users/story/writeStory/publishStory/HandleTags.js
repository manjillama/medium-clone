import React from 'react';
import PropTypes from 'prop-types';

class HandleTags extends React.Component{

  componentDidMount(){
    this.editor = document.getElementById("tagEditor");
  }

  handleChange = (e) => {
    const val = e.target.value;
    // Checking for comma
    if (val.indexOf(',') !== -1) {
      const tag = val.split(',')[0];
      this.editor.value = '';
      this.props.handleTagsChange(tag)
    }
  }

  renderTags(){
    return this.props.storyTags.map((tag, index) =>
      <div className="tag-elem" key={index}>{tag}
        <button className="btn-chromeless"
          onClick={()=>{
            let tags = this.props.storyTags.filter((item, i) => i !== index);
            this.props.handleTagRemove(tags);
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
              {this.props.storyTags.length < 5 && (<input onChange={this.handleChange} placeholder="Add a tag..." id="tagEditor" />)}
            </div>
          </div>
      </div>
    );
  }
}

HandleTags.propTypes = {
  storyTags: PropTypes.array,
  handleTagsChange: PropTypes.func.isRequired,
  handleTagRemove: PropTypes.func.isRequired
}

export default HandleTags;
