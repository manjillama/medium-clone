import React from 'react';
import Dropzone from 'react-dropzone';

export default class HandleThumbnail extends React.Component{

  constructor(){
    super();
    this.state = {
      imageFile: null,
      dropHovered: false,
      imageFilePreview: null,
      disableDropzone: false,
      showError: false
    }
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(acceptedFile, rejectedFile) {
    this.setState({dropHovered: false});
    /*
    * If none file were rejected
    * All files will be rejected if multiple files were dropped
    */
    if(rejectedFile.length > 0){
      this.setState({showError: true}, () => {
        setTimeout(()=>{
          this.setState({showError: false});
        }, 3000)
      });
    }else{
      this.setState({imageFile: acceptedFile[0]}, ()=>{
        this.setState({
          imageFilePreview: URL.createObjectURL(this.state.imageFile),
          disableDropzone: true
        });
      });
    }
  }

  onCancel = () => {
    this.setState({
      imageFile: null,
      imageFilePreview: null,
      disableDropzone: false,
    });
  }

  render(){
    const dropZoneClass = this.state.dropHovered ? 'border-p-color p-modal-image-drop' : 'p-modal-image-drop';
    const errorAlertClass = this.state.showError ? 'bg--danger fixed--alert fixed--alert-active':'bg--danger fixed--alert';
    return (
      <div>
        <p className={errorAlertClass}>Please upload a single image file.</p>

        <h2>Story Thumbnail</h2>
        <p>Setup a thumbnail picture that goes well with your story.</p>

        <Dropzone
          accept="image/png,image/jpeg"
          onDrop={this.onDrop}
          onFileDialogCancel={this.onCancel.bind(this)}
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
                (<span className="drop-caption">{this.state.dropHovered ? 'Drop your thumbnail.' : 'Include a high-quality image in your story to make it more inviting to readers.'}</span>)
              }
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
