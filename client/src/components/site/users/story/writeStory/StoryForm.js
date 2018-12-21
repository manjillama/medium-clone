import React from 'react';
import ContentEditable from 'react-contenteditable'; //https://github.com/lovasoa/react-contenteditable

export default class StoryForm extends React.Component{
  renderPostPlaceHolder(){
    if(this.props.blog.post === '')
      return <span style={{position:'absolute',top:-5+'px',left:0,fontSize: 22+'px',zIndex: -1}} className="text--muted">Tell us your story...</span>
  }

  render(){
    return (
      <form>
        <input className="input-story-t" type="text" placeholder="Title" value={this.props.blog.title} onChange={this.props.handleTitleChange}/>
        <div style={{position:'relative'}}>
          {this.renderPostPlaceHolder()}
          <ContentEditable
            className="input-story-p"
            innerRef={this.contentEditable}
            html={this.props.blog.post}
            disabled={false}
            onChange={this.props.handlePostChange} />
        </div>
      </form>
    );
  }
}
