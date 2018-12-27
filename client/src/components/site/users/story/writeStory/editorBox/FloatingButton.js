import React, { Component } from 'react';

export default class FloatingBar extends Component{
  handleFile(e){
    const file = e.target.files[0];
    if(file){
      const src = URL.createObjectURL(file);
      document.execCommand('insertHTML', false, '<img src="' + src + '" class="img-responsive"/>');
    }
  }

  render(){
    const editor = document.getElementById('storyBox');
    const documentWidth = document.body.clientWidth;
    const editorWidth = editor.clientWidth;
    const offset = (documentWidth-editorWidth)/2; // Divide by 2 so that we can get offset from left
    const floatX = offset+editorWidth;
    return (
      <div id="editorFloatBar" style={{transform: `translate(${floatX}px, ${0})`}}>
        <button onClick={this.handleSelection} className="edit-float-btn btn-chromeless">

        <label htmlFor="editorImgInput">
          <svg className="svgIcon-use" width="25" height="25">
            <path d="M20 12h-7V5h-1v7H5v1h7v7h1v-7h7" fillRule="evenodd"></path>
          </svg>
        </label>
        <input id="editorImgInput" style={{display: 'none'}} type="file" onChange={this.handleFile}/>

        </button>
      </div>
    );
  }
}
