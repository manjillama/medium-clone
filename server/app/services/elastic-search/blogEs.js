const esConfig = require('../../config/es-config');
const client = esConfig.client;
const Blog = require('../../models/blog');
const BlogTag = require('../../models/blogTag');
const BlogThumbnail = require('../../models/blogThumbnail');

exports.postBlog = async (bloggerId) => {
  Blog.findAll({
    attributes: ['id', 'title', 'story_summary', 'created_at'],
    where: {
      blogger_id: bloggerId,
      published: true
    },
    include: [
      {
        attributes: ['tag'],
        model: BlogTag,
        required: false
      },
      {
        model: BlogThumbnail,
        where: {
          is_thumb: false
        },
        attributes: ['story_thumb'],
        required: false
      }
    ]
  }).then(blogs => {
    /*
    * WTF is happening here?
    * First the above code finds all the published stories(blogs) from a user.
    * esBlogs hold all the blogs and is send to elastic search for indexing
    *   Looping through all the blogs and extrating relevant fields
    *     Further looping into blog to fetch blogTags and blogThumbnail
    *   A new 'blogObj' object per blog is created to store all these fields in cleanly defined structure
    *   List of blogObj is pushed to esBlogs array for indexing
    */
    let esBlogs = [];

    blogs.forEach(blog => {
      const {id, title, story_summary, created_at, blogTags, blogThumbnails} = blog;

      const blogObj = {
        id,
        title,
        story_summary,
        created_at
      }
      
      let esBlogTags = [];
      let esBlogThumbnails = [];

      blogTags.forEach(blogTag => {
        esBlogTags.push(blogTag.tag);
      });

      blogThumbnails.forEach(blogThumbnail => {
        esBlogThumbnails.push(blogThumbnail.story_thumb);
      });
      blogObj.tags = esBlogTags;
      blogObj.story_thumbnails = esBlogThumbnails;
      esBlogs.push(blogObj);
    });

    client.update({
      index: esConfig.index,
      type: esConfig.type,
      id: bloggerId,
      body: {
        doc: {
          blogs: esBlogs
        }
      }
    });
  })
}
