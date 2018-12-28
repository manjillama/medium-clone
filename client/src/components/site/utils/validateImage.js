export const validateImage = (image) => {
  if(image){
    let mimeType=image['type'];
    if(mimeType.split('/')[0] === 'image'){
      return true;
    }
  }
  return false;
}
