const esConfig = require('../../config/es-config');
const client = esConfig.client;

exports.searchBlogs = async (req, res) => {
  const {q} = req.params;
  const response = await client.search({
    index: esConfig.index,
    type: esConfig.type,
    body: {
      _source: {
        excludes: [ "blogs" ]
      },
      query: {
        nested: {
          path: 'blogs',
          query: {
            bool: {
              should: [
                { match: { "blogs.tags": q }},
                { match: { "blogs.title": q }}
              ]
            }
          },
          inner_hits: {
            _source: [
              "blogs.id",
              "blogs.title",
              "blogs.story_summary",
              "blogs.created_at",
              "blogs.story_thumbnail"
            ]
          }
        }
      }
    }
  });

  /*
  * Ok what the hell is going on?
  * If response is not empty
  *
  *   loop though each response and extract relavent user info save it in 'hitObj'
  *     loop though each user blog (inner hits)
  *       Again extract relavent story info and save it in 'innerHitObj'
  *       Push each innerHitObj into stories array
  *     store user 'stories' obj in hitObj
  *     Finally store individual user hitObj in hitsArray (Hits array is an array of relevant stories along with user info)
  *
  * If response is empty then send empty array
  */
  if(response.hits.hits.length > 0){
    let hitsArray = [];

    response.hits.hits.forEach(hit => {
      const {fullname, username, bio, profile_image} = hit._source;
      const hitObj = {
        fullname,
        username,
        bio,
        profile_image
      };

      let stories = [];
      hit.inner_hits.blogs.hits.hits.forEach(innerHit => {
        const {id, title, story_summary, created_at, story_thumbnail} = innerHit._source;
        const innerHitObj = {
          id, title, story_summary, created_at, story_thumbnail
        }
        stories.push(innerHitObj);
      });
      hitObj.stories = stories;
      hitsArray.push(hitObj);
    });
    res.send(hitsArray);
  }else{
    res.send([]); // empty json array
  }
}
