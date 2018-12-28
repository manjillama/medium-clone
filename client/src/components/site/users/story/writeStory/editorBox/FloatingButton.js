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
  }

  handleFile = (e) => {
    const image = e.target.files[0];
    if(image){
      if(validateImage(image)){
        if(image.size < 1000000){
          let formData = new FormData();
          formData.append("storyImage", image);

          uploadStoryImage(formData, this.userToken, this.props.blogId).then(res=>{
            const src = res.data.story_image;
            document.execCommand('insertHTML', false, '<img src="' + src + '" class="img-responsive"/>');
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

  render(){
    const editor = document.getElementById('storyBox');
    const documentWidth = document.body.clientWidth;
    const editorWidth = editor.clientWidth;
    const offset = (documentWidth-editorWidth)/2; // Divide by 2 so that we can get offset from left
    const floatX = offset+editorWidth;
    const errorAlertClass = this.state.error.status ? 'bg--danger fixed--alert fixed--alert-active':'bg--danger fixed--alert';

    return (
      <div>
        <p className={errorAlertClass}>{this.state.error.message}</p>

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
      </div>
    );
  }
}
