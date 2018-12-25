const Blog = require('../models/blog');
const BlogImage = require('../models/blogImage');

const sharp = require('sharp');
var sizeOf = require('image-size');
const fs = require('fs');
const config = require('../config/config');

exports.uploadThumbnail = async (req, res) => {

  const file = req.files;
  const postId = req.params.id;

  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(async blog => {
    if(blog){
      if(file){
        const {storyImage} = file;
        const storyThumbnail = await uploadStoryThumnail(storyImage, postId);

        if(storyThumbnail){
          Blog.findByPk(postId).then(blog => {
            if(blog){
              blog.update({
                story_thumbnail: storyThumbnail
              }).then(blog => res.json(blog));
            }
          });
        };
      }else{
        res.json({error: "No file found"});
      }
    }
  });

}

exports.removeThumbnail = (req, res) => {
  const postId = req.params.id;

  /*
  * Removing story image
  */
  removeStoryImage(postId, req.user.id);

  /*
  * Removing story thumbnail
  */
  Blog.findOne({
    where: {
      id: postId,
      blogger_id: req.user.id
    }
  }).then(blog => {
    const imageName = blog.story_thumbnail.match(/[\w-]+\.jpg/g)[0];
    // Extracting image name from url
    blog.update({story_thumbnail: null});

    try {
      fs.unlinkSync(config.storyImageDir()+imageName);
    } catch (err) {
      // handle the error
    }
    res.send("ok");
  }).catch(()=>{
    res.send("ok");
  });
}

async function uploadStoryThumnail(storyImage, postId){
  let storyThumbnail = null;

  let mimeType = storyImage.mimetype;
  if(mimeType.split('/')[0] === 'image'){
    /*
    * Saving Real Size Image
    */
    uploadStoryImage(storyImage, postId)

    /*
    * Now Saving thumbnail
    * Resizing image to 300 * ? dimensions
    */
    const outputDir = config.storyImageDir();
    const imageName = postId+'_thumb.jpg';
    storyThumbnail = config.resourceHost+config.storyImageResourceUrl+imageName;
    const dimensions = sizeOf(storyImage.data);
    const { width, height } = dimensions;
    if(width > 300){
      /*
      * w: 1200 h:1000
      * =
      * w1: 300  h1
      * --------------
      * wh1 = hw1 or, h1 = hw1/w
      */
      const width1 = 300;
      const height1 = Math.ceil(height*width1/width);

      await sharp(storyImage.data).resize(width1, height1)
        .toFile(outputDir+imageName);
    }else{
      await sharp(storyImage.data).toFile(outputDir+imageName);
    }

  }
  return storyThumbnail;
}

async function uploadStoryImage(storyImage, postId){
  const imageName = postId+'.jpg';
  const story_image = config.resourceHost+config.storyImageResourceUrl+imageName;
  const outputDir = config.storyImageDir();

  sharp(storyImage.data).toFile(outputDir+imageName);

  BlogImage.create({
    story_image,
    blog_id: postId
  })
}

async function removeStoryImage(postId, bloggerId){
  BlogImage.findOne({
    include: [{
      model: Blog,
      attributes: [],
      where: {
        id: postId,
        blogger_id: bloggerId
      }
    }]
  }).then(blogImage => {
    if(blogImage){
      const imageName = blogImage.story_image.match(/[\w-]+\.jpg/g)[0];

      blogImage.destroy();
      try {
        fs.unlinkSync(config.storyImageDir()+imageName);
      } catch (err) {
      }
    }
  }).catch(() => {
  });
}
