import React from 'react';
import ContentEditable from 'react-contenteditable'; //https://github.com/lovasoa/react-contenteditable
import EditorActionBox from './editorBox/EditorActionBox';
import FloatingButton from './editorBox/FloatingButton';

export default class StoryForm extends React.Component{
  constructor() {
    super();
    this.state = {
      showEditorBox: null,
      showFloatingButton: false,
      imageIsUploading: false
    }
  };

  componentDidMount(){
    document.addEventListener('click', this.handleFloatingBar, true);
  }

  componentWillUnmount(){
    document.removeEventListener('click', this.handleFloatingBar, true);
  }

  renderPostPlaceHolder(){
    if(this.props.blog.draft === '')
      return <span style={{position:'absolute',top:-5+'px',left:0,fontSize: 22+'px',zIndex: -1}} className="text--muted">Tell us your story...</span>
  }

  hideEditorBox = () => {
    const node = document.getElementById('editorBox');
    // If user clicks outside editorBox
    if(node){
      this.setState({showEditorBox:null});
    }
  }

  instantHideEditBox = () => {
    this.setState({showEditorBox:null});
  }

  onTextSelection = (e) => {
    const selectedText = window.getSelection().getRangeAt(0);
    /*
    * Maybe a more positioning accurate approach?
    * console.log(selectedText.getRangeAt(0).getBoundingClientRect());
    */
    if(selectedText && selectedText.toString() !== ''){
      this.setState({
        showEditorBox: {
          clientX: e.pageX,
          clientY: e.pageY
        }
      });
    }else{
      this.hideEditorBox();
    }
  }

  handleFloatingBar = e => {
    const editor = document.getElementById('storyBox');
    const floatingBar = document.getElementById('editorFloatBar');
    if(editor && editor.contains(e.target)){
      this.setState({showFloatingButton:true});
    }else{
      if(floatingBar && floatingBar.contains(e.target)){
        // Do nothing
      }else{
        this.setState({showFloatingButton:false});
      }
    }
  }

  imageIsUploading = () => {
    this.setState({imageIsUploading: true})
  }

  imageUploadCompleted = () => {
    this.setState({imageIsUploading: false})
  }

  render(){
    return (
      <div>
        <input className="input-story-t" type="text" placeholder="Title" value={this.props.blog.title_draft} onChange={this.props.handleTitleChange}/>
        <div style={{position:'relative'}}>
          {this.renderPostPlaceHolder()}
          <ContentEditable
            id="storyBox"
            className="input-story-p"
            innerRef={this.contentEditable}
            html={this.props.blog.draft}
            disabled={false}
            onBlur = {this.hideEditorBox}
            onMouseUp = {this.onTextSelection}
            onChange={this.props.handlePostChange}
            />
            {this.props.blog.id && this.state.showFloatingButton && <FloatingButton
                                                blogId={this.props.blog.id}
                                                imageUploadStatus={this.state.imageIsUploading}
                                                imageIsUploading={this.imageIsUploading}
                                                imageUploadCompleted={this.imageUploadCompleted}/>}
        </div>
        { this.state.showEditorBox && <EditorActionBox
                                        hideEditorBox = {this.instantHideEditBox}
                                        clientX={this.state.showEditorBox.clientX}
                                        clientY={this.state.showEditorBox.clientY}/>}
      </div>
    );
  }
}
