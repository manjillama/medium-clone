import React from 'react';
import Dropzone from 'react-dropzone';

export default class HandleThumbnail extends React.Component{

  constructor(){
    super();
    this.state = {
      imageFile: null,
      dropHovered: false,
      imageFilePreview: null,
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
        this.setState({imageFilePreview: URL.createObjectURL(this.state.imageFile)});
      });
    }
  }

  onCancel() {
    this.setState({imageFile: null});
  }

  render(){
    const dropZoneClass = this.state.dropHovered ? 'border-p-color p-modal-image-drop' : 'p-modal-image-drop';

    return (
      <div>
        {this.state.showError && <h1 style={{color: 'red'}}>Error</h1>}
        <h2>Story Thumbnail</h2>
        <p>Setup a thumbnail picture that goes well with your story.</p>

        <Dropzone
          accept="image/png,image/jpeg"
          onDrop={this.onDrop}
          onFileDialogCancel={this.onCancel.bind(this)}
          multiple={false}
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
                (<img src={this.state.imageFilePreview} className="thumbnail-img" alt="story-thumbnail"/>) : (<span>{this.state.dropHovered ? 'Drop your thumbnail.' : 'Include a high-quality image in your story to make it more inviting to readers.'}</span>)
              }
            </div>
          )}
        </Dropzone>
      </div>
    );
  }
}
