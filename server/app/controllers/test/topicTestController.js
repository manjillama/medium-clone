const Blog = require('../../models/blog');
const BlogTag = require('../../models/blogTag');
const BlogThumbnail = require('../../models/blogThumbnail');
const Blogger = require('../../models/blogger');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

function topicKeywords(){
  return topics = {
    technology: [
      'accessibility', 'android dev', 'artificial intelligence', 'ai', 'blockchain', 'cryptocurrency', 'cybersecurity',
      'data science', 'gadgets', 'ios dev', 'javascript', 'machine learning', 'math', 'neuroscience', 'programming',
      'self-driving cars', 'software engineering', 'tech', 'technology', 'UI', 'UX', 'Graphic Design'
    ],
    entertainment: [
      'books', 'comics', 'culture', 'fiction', 'film', 'movie', 'gaming', 'humor', 'magazine', 'music',
      'photography', 'podcasts', 'poetry', 'social media', 'sports', 'style', 'tv', 'writing', 'entertainment'
    ],
    startups: [
      'startups', 'new business'
    ],
    industry: [
      'business', 'startups', 'economy', 'freelancing', 'leadership', 'marketing', 'product management',
      'productivity', 'work', 'industry'
    ],
    life: [
      'addiction', 'cannabis', 'creativity', 'disability', 'blog', 'vlog', 'family', 'lifestyle',
      'mental health', 'fun', 'travel', 'food', 'mindfulness', 'parenting', 'pets', 'relationships', 'self', 'life',
      'sexuality', 'spirituality'
    ],
    design: [
      'art', 'desgin', 'artwork', 'graphic design', 'visual design', 'sketch', 'painting'
    ],
    health: [
      'biology', 'health', 'neuroscience'
    ],
    country: [
      'Cities', 'City', 'Country', 'nepal', 'education', 'environment', 'equality', 'history', 'justice', 'race',
      'culture', 'religion'
    ],
    politics: [
      'politics', 'prime minister', 'ministry', 'PM'
    ]
  }
}

exports.findByTopic = (req, res) => {
  const topic = req.params.topic;

  if(topicKeywords()[topic]){
    let keywords = []
    topicKeywords()[topic].forEach(function(keyword){
      keywords.push({tag: {$iLike: keyword}})
    });

    Blog.findAll({
      where: {
        published: true
      },
      attributes: ['id', 'title', 'story_summary', 'created_at'],
      include: [
        {
          attributes: [],
          model: BlogTag,
          where: {
            [Op.or]: keywords

            //tag: {$iLike: topic} // $iLike for case-insensitive
          }
        },
        {
          attributes: ['story_thumb'],
          model: BlogThumbnail,
          where: {is_thumb: true},
          required: false
        },
        {
          attributes: ['fullname', 'username'],
          model: Blogger,
        }
      ],
      order: [
        ['created_at', 'DESC'],
      ],
    }).then(blogs => {
      res.send(blogs);
    });
  }else{
    res.send({'error': '404 not found'});
  }

}
