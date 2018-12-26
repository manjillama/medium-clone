import React from 'react';
import Dropzone from 'react-dropzone';
import PropTypes from 'prop-types';
import { fetchPost, uploadStoryImage, removeStoryImage } from 'services/blogService';

class HandleThumbnail extends React.Component{

  constructor(){
    super();
    this.state = {
      image: null,
      dropHovered: false,
      imageFilePreview: null,
      disableDropzone: false,
      error: {
        show: false,
        message: ''
      },
      showImageUploading: false
    }
    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount(){
    this.token = localStorage.getItem('token');
    fetchPost(this.props.blogId, this.token).then(res => {
      const {story_thumbnail} = res.data.blog;
        if(story_thumbnail)
          this.setState({imageFilePreview: story_thumbnail+'?'+Date.now(), disableDropzone: true});
    });
  }

  onDrop(acceptedFile, rejectedFile) {
    this.setState({dropHovered: false});
    /*
    * If none file were rejected
    * All files will be rejected if multiple files were dropped
    */
    if(rejectedFile.length > 0){
      this.setState({error: {show: true, message:'Please upload a single image file.'} }, () => {
        setTimeout(()=>{
          this.setState({error: {...this.state.error, show:false}});
        }, 3000)
      });
    }else{
      if(acceptedFile[0].size < 1000000){
        this.handleImageUpload(acceptedFile[0]);

      }else{
        this.setState({error: {show: true, message:'Please use image less than 1 MB'} }, () => {
          setTimeout(()=>{
            this.setState({error: {...this.state.error, show:false}});
          }, 3000)
        });
      }
    }
  }

  onCancel = () => {
    this.handleImageDelete();
  }

  handleImageUpload(image){
    let formData = new FormData();
    formData.append("storyImage", image);
    this.setState({showImageUploading: true});
    uploadStoryImage(formData, this.token, this.props.blogId).then(res=>{
      this.setState({
        imageFilePreview: res.data.story_thumbnail+'?'+Date.now(),
        disableDropzone: true,
        showImageUploading: false
      });
    });
  }

  handleImageDelete(){
    removeStoryImage(this.token, this.props.blogId);
    this.setState({
      imageFilePreview: null,
      disableDropzone: false,
    });
  }

  render(){
    const dropZoneClass = this.state.dropHovered ? 'border-p-color p-modal-image-drop' : 'p-modal-image-drop';
    const errorAlertClass = this.state.error.show ? 'bg--danger fixed--alert fixed--alert-active':'bg--danger fixed--alert';
    return (
      <div>
        <p className={errorAlertClass}>{this.state.error.message}</p>

        <h2>Story Thumbnail</h2>
        <p>Setup a thumbnail picture that goes well with your story.</p>

        <Dropzone
          accept="image/png,image/jpeg"
          onDrop={this.onDrop}
          multiple={false}
          disabled={this.state.disableDropzone}
          onDragEnter={()=>{
            this.setState({dropHovered: true});
          }}
          onDragLeave={()=>{
            this.setState({dropHovered: false});
          }}
        >
          {({getRootProps, getInputProps}) => (
            <div {...getRootProps()} className={dropZoneClass}>
              <input {...getInputProps()} />
              {
                this.state.imageFilePreview ?
                (
                  <div className="thumb-wrapper">
                    <button className="thumb-del-btn btn-chromeless" onClick={this.onCancel}><span>x</span></button>
                    <img src={this.state.imageFilePreview} className="thumbnail-img" alt="story-thumbnail"/>
                  </div>
                )
                :
                this.state.showImageUploading ? (<span className="drop-caption">Image uploading Please wait...</span>)
                :
                (<span className="drop-caption">{this.state.dropHovered ? 'Drop your thumbnail.' : 'Include a high-quality image in your story to make it more inviting to readers.'}</span>)
              }
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}

HandleThumbnail.propTypes = {
  blogId: PropTypes.number.isRequired
}

export default HandleThumbnail;
