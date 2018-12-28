var fs = require('fs');
const sharp = require('sharp'); // https://github.com/lovell/sharp

/*
@params
** Destination Directory
** Image Name
** Image Buffer
** Width (Optional)
** Height (Optional)
*/
exports.saveImage = async (outputDir,imageName, inputBuffer, w, h) => {
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

exports.validateImage = (image) => {
  if(image){
    let mimeType = image.mimetype;
    if(mimeType.split('/')[0] === 'image'){
      return true;
    }
  }
  return false;
}
