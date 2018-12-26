import React from 'react';
import ContentEditable from 'react-contenteditable'; //https://github.com/lovasoa/react-contenteditable

export default class StoryForm extends React.Component{
  constructor() {
    super()
    this.contentEditable = React.createRef();
  };


  renderPostPlaceHolder(){
    if(this.props.blog.description === '')
      return <span style={{position:'absolute',top:-5+'px',left:0,fontSize: 22+'px',zIndex: -1}} className="text--muted">Tell us your story...</span>
  }

  render(){
    return (
      <form>
        <input className="input-story-t" type="text" placeholder="Title" value={this.props.blog.title} onChange={this.props.handleTitleChange}/>
        <div style={{position:'relative'}}>
          {this.renderPostPlaceHolder()}

          <EditButton cmd="bold" />
          <EditButton cmd="italic" />
          <EditButton cmd="formatBlock" arg="h1" name="heading" />
          <EditButton
            cmd="createLink"
            arg="https://github.com/lovasoa/react-contenteditable"
            name="hyperlink"
          />
          <ContentEditable
            className="input-story-p"
            innerRef={this.contentEditable}
            html={this.props.blog.description}
            disabled={false}
            onChange={this.props.handlePostChange}
            />
        </div>
      </form>
    );
  }
}

function EditButton(props) {
  return (
    <button
      type="button"
      key={props.cmd}
      onMouseDown={evt => {
        evt.preventDefault(); // Avoids loosing focus from the editable area
        document.execCommand(props.cmd, false, props.arg); // Send the command to the browser
      }}
    >
      {props.name || props.cmd}
    </button>
  );
}
