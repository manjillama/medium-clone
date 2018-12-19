import React, { Component } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import Modal from 'components/modals/Modal';
/*
* Demo: https://www.npmjs.com/package/react-image-crop
* https://codesandbox.io/s/lmr9m677m
*/
export default class ImageCropper extends Component{
  constructor(props){
    super(props);
    this.state = {
      src: URL.createObjectURL(this.props.uploadedImage),
      crop: {
        aspect: 1,
        width: 120,
        height: 120,
        x: 0,
        y: 0
      },
      croppedImage: null
    };
  }

  onSave = () => {
    let { croppedImage } = this.state;
    this.props.setUploadedImage(croppedImage);
  }

  closeModal = () => {
    this.props.closeModal();
  }

  onImageLoaded = (image, pixelCrop) => {
    this.imageRef = image;
    // Make the library regenerate aspect crops if loading new images.
    const { crop } = this.state;

    if (crop.aspect && crop.height && crop.width) {
      this.setState({
        crop: { ...crop, height: null }
      });
    } else {
      this.makeClientCrop(crop, pixelCrop);
    }
  };

  onCropComplete = (crop, pixelCrop) => {
    this.makeClientCrop(crop, pixelCrop);
  };

  onCropChange = crop => {
    this.setState({ crop });
  };

  async makeClientCrop(crop, pixelCrop) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImage = await this.getCroppedImg(
        this.imageRef,
        pixelCrop,
        "newFile.jpeg"
      );
      this.setState({ croppedImage });
    }
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;
    const ctx = canvas.getContext("2d");

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(blob => {
        blob.name = fileName;
        resolve(blob);
      }, "image/jpeg");
    });
  }

  render(){
    const { crop, src } = this.state;

    return (
      <Modal closeModal={this.closeModal} modalOverlayColor="#000" modalBackgroundColor="rgb(232, 243, 236)" displayCloseBtn={false}>
        <p>Create Profile Picture</p><br/>
        {src && (
          <ReactCrop
            src={src}
            crop={crop}
            onImageLoaded={this.onImageLoaded}
            onComplete={this.onCropComplete}
            onChange={this.onCropChange}
            keepSelection={true}
          />
        )}
        <br/><br/>
        <button className="mjl-btn btn--dark" onClick={this.onSave}>Looks Good !</button> &nbsp;&nbsp;
        <button className="mjl-btn btn--d-hollow" onClick={this.closeModal}>Nevermind</button>

      </Modal>
    )
  }
}
