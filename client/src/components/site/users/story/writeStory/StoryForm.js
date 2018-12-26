import React from 'react';
import ContentEditable from 'react-contenteditable'; //https://github.com/lovasoa/react-contenteditable
import EditorActionBox from './EditorActionBox';

export default class StoryForm extends React.Component{
  constructor() {
    super();
    this.state = {
      showEditorBox: null,
    }
  };

  componentWillUnmount(){
    document.removeEventListener('click', this.hideEditorBox, true);
  }

  renderPostPlaceHolder(){
    if(this.props.blog.description === '')
      return <span style={{position:'absolute',top:-5+'px',left:0,fontSize: 22+'px',zIndex: -1}} className="text--muted">Tell us your story...</span>
  }

  hideEditorBox = (e) => {
    const node = document.getElementById('editorBox');
    // If user clicks outside editorBox
    if(!node.contains(e.srcElement)){
      setTimeout(()=>{
        this.setState({showEditorBox:null}, ()=>{
          document.removeEventListener('click', this.hideEditorBox, true);
        });
      }, 100);
    }
  }

  onTextSelection = (e) => {
    console.log(e);
    const selectedText = window.getSelection();
    if(selectedText && selectedText.toString() !== ''){
      this.setState({
        showEditorBox: {
          clientX: e.clientX,
          clientY: e.clientY
        }
      }, () => {
        /*
        * Adding timeout of 100 so that the event listner
        * Gets added after we trigger the text selection
        */
        setTimeout(()=>{
          document.addEventListener('click', this.hideEditorBox, true);
        }, 100);
      })
    }
  }

  render(){
    return (
      <div>
        <input className="input-story-t" type="text" placeholder="Title" value={this.props.blog.title} onChange={this.props.handleTitleChange}/>
        <div style={{position:'relative'}}>
          {this.renderPostPlaceHolder()}
          <ContentEditable
            className="input-story-p"
            innerRef={this.contentEditable}
            html={this.props.blog.description}
            disabled={false}
            onMouseUp = {this.onTextSelection}
            onChange={this.props.handlePostChange}
            />
        </div>
        { this.state.showEditorBox && <EditorActionBox
                                        clientX={this.state.showEditorBox.clientX}
                                        clientY={this.state.showEditorBox.clientY}/>}
      </div>
    );
  }
}
