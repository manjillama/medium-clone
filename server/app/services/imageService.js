const sharp = require('sharp'); // https://github.com/lovell/sharp
const config = require('../config/config');
const fs = require('fs');

/*
* @params
*   - Blogger id
*   - Image Buffer
    - Image Name (Optional)
      -- Pass it when updating image
*   - Width (Optional)
*   - Height (Optional)
* Returns
*   Saved story url
*/
exports.saveImage = async (bloggerId,inputBuffer,imageName, w, h) => {
  //console.log(process.env.MODE === 'PRODUCTION');
  let imgName = '';
  if(imageName){
    // If image is to update
    imgName = imageName;
  }else{
    // Creating new image | image name consist of user id _ as suffix followed by random strings
    imgName = `${bloggerId}_${config.getRandomString()}.jpg`;
  }

  const outputDir = config.imageResourceDir();

  if(w && h){
    await sharp(inputBuffer).resize(w, h)
      .toFile(outputDir+imgName);
  }else{
    await sharp(inputBuffer).toFile(outputDir+imgName);
  }

  const story_url = config.resourceHost+config.imageResourceUrl+imgName;
  return story_url;
}

/*
* @Param
*    - Receives an array of images as an arguement
*    - Receives a database colName
*************************
* Table rows to be deleted are passed as an arguement.
* Iterate through each row and fetch image name column, which is passed as a second arguement.
* Only the image name is extracted from the url i.e. cat.jpg
* Deletes the file from directory.
*/
exports.deleteUserImages = (images, colName)  => {
  images.forEach(image => {
    const imageName = image[colName].match(/[\w-]+\.jpg/g)[0];
    try {
      fs.unlinkSync(config.imageResourceDir()+imageName);
    } catch (err) {
      console.log(err);
    }
  });
}

/*
* @params
*   - Receives file
* Returns
*   - true if file is image
*   - false if no file or file is not image
*/
exports.validateImage = (image) => {
  if(image){
    let mimeType = image.mimetype;
    if(mimeType.split('/')[0] === 'image'){
      return true;
    }
  }
  return false;
}
