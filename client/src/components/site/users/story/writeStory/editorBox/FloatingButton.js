import React, { Component } from 'react';
import { uploadStoryImage } from 'services/blogImageService';
import { validateImage } from 'components/site/utils/validateImage';

export default class FloatingBar extends Component{
  constructor(){
    super();
    this.state = {
      error: {
        status: false,
        message: ''
      }
    }
  }

  componentDidMount(){
    this.userToken = localStorage.getItem('token');
    document.getElementById('floatImgInputBtn').onclick = () => {
      this.currentSelection = this.saveSelection();
      document.getElementById('editorImgInput').click();
    };
  }

  /*
  * https://stackoverflow.com/questions/3315824/preserve-text-selection-in-contenteditable-while-interacting-with-jquery-ui-dial
  */
  saveSelection() {
    if (window.getSelection) {
      let sel = window.getSelection();
      if (sel.getRangeAt && sel.rangeCount) {
        return sel.getRangeAt(0);
      }
    } else if (document.selection && document.selection.createRange) {
      return document.selection.createRange();
    }
    return null;
  }

  restoreSelection(range) {
    if (range) {
      if (window.getSelection) {
          let sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (document.selection && range.select) {
        range.select();
      }
    }
  }

  handleFile = (e) => {
    const image = e.target.files[0];
    if(image){
      if(validateImage(image)){
        if(image.size < 1000000){
          let formData = new FormData();
          formData.append("storyImage", image);
          this.props.imageIsUploading();
          uploadStoryImage(formData, this.userToken, this.props.blogId).then(res=>{
            const src = res.data.story_image;
            this.restoreSelection(this.currentSelection);
            document.execCommand('insertHTML', false, '<img src="' + src + '" class="img-responsive"/>');
            this.props.imageUploadCompleted();
          });
        }else{
          this.setState({error: {status: true, message: 'Please use image less than 1 MB'}}, ()=>{
            setTimeout(()=>{
              this.setState({error: {status: false, message:'Please use image less than 1 MB'}});
            }, 3000);
          });
        }
      }else{

        this.setState({error: {status: true, message: 'Please upload image only'}}, ()=>{
          setTimeout(()=>{
            this.setState({error: {status: false, message:'Please upload image only'}});
          }, 3000);
        });

      }
    }
  }


  __render(){
    const editor = document.getElementById('storyBox');
    const documentWidth = document.body.clientWidth;
    const editorWidth = editor.clientWidth;
    const offset = (documentWidth-editorWidth)/2; // Divide by 2 so that we can get offset from left
    const floatX = offset+editorWidth;

    if(this.props.imageUploadStatus){
      return <div id="floatSpinner" className="mjl-lds-circle" style={{transform: `translate(${floatX}px, ${0})`}}><div></div></div>
    }else{
      return (
        <div id="editorFloatBar" style={{transform: `translate(${floatX}px, ${0})`}}>
          <button id="floatImgInputBtn" className="edit-float-btn btn-chromeless">

              <svg className="svgIcon-use" width="25" height="25">
                <g fillRule="evenodd">
                  <path d="M4.042 17.05V8.857c0-1.088.842-1.85 1.935-1.85H8.43C8.867 6.262 9.243 5 9.6 5.01L15.405 5c.303 0 .755 1.322 1.177 2 0 .077 2.493 0 2.493 0 1.094 0 1.967.763 1.967 1.85v8.194c-.002 1.09-.873 1.943-1.967 1.943H5.977c-1.093.007-1.935-.85-1.935-1.937zm2.173-9.046c-.626 0-1.173.547-1.173 1.173v7.686c0 .625.547 1.146 1.173 1.146h12.683c.625 0 1.144-.53 1.144-1.15V9.173c0-.626-.52-1.173-1.144-1.173h-3.025c-.24-.63-.73-1.92-.873-2 0 0-5.052.006-5 0-.212.106-.87 2-.87 2l-2.915.003z">
                  </path>
                  <path d="M12.484 15.977a3.474 3.474 0 0 1-3.488-3.49A3.473 3.473 0 0 1 12.484 9a3.474 3.474 0 0 1 3.488 3.488c0 1.94-1.55 3.49-3.488 3.49zm0-6.08c-1.407 0-2.59 1.183-2.59 2.59 0 1.408 1.183 2.593 2.59 2.593 1.407 0 2.59-1.185 2.59-2.592 0-1.406-1.183-2.592-2.59-2.592z">
                  </path>
                </g>
              </svg>
            <input id="editorImgInput" style={{display: 'none'}} type="file" onChange={this.handleFile} accept="image/png,image/jpeg"/>

          </button>
        </div>
      );
    }
  }

  render(){
    const errorAlertClass = this.state.error.status ? 'bg--danger fixed--alert fixed--alert-active':'bg--danger fixed--alert';

    return (
      <div>
        <p className={errorAlertClass}>{this.state.error.message}</p>
        {this.__render()}
      </div>
    );
  }
}
