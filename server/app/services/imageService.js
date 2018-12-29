var fs = require('fs');
const sharp = require('sharp'); // https://github.com/lovell/sharp
const config = require('../config/config');

/*
@params
** Blogger id
** Image Name
** Image Buffer
** Width (Optional)
** Height (Optional)
Images is save in individual user folder using blogger id
i.e. bloggerId/cat.jpg
*/
exports.saveImage = async (bloggerId,imageName, inputBuffer, w, h) => {
  const outputDir = config.userImageResourceDir(bloggerId);

  // Create directory if not already exist
  if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
  }

  if(w && h){
    await sharp(inputBuffer).resize(w, h)
      .toFile(outputDir+imageName);
  }else{
    await sharp(inputBuffer).toFile(outputDir+imageName);
  }
}

/*
* @Param
*    - Receives an array of images as an arguement
*    - Receives a database colName
* Table rows to be deleted are passed as an arguement.
* Iterate through each row and fetch image name column, which is passed as a second arguement.
* Only the image name is extracted from the url i.e. cat.jpg
* Deletes the file from directory. userId/cat.jpg
*/
exports.deleteUserImages = (userId, images, colName)  => {
  images.forEach(image => {
    const imageName = image[colName].match(/[\w-]+\.jpg/g)[0];
    try {
      fs.unlinkSync(config.userImageResourceDir(userId)+imageName);
    } catch (err) {
      console.log(err);
    }
  });
}

exports.validateImage = (image) => {
  if(image){
    let mimeType = image.mimetype;
    if(mimeType.split('/')[0] === 'image'){
      return true;
    }
  }
  return false;
}
