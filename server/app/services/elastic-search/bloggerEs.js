const esConfig = require('../../config/es-config');
const client = esConfig.client;

exports.createBlogger = async (blogger) => {
  /*
  * Indexing blogger to elastic search
  */
  client.index({
    index: esConfig.index,
    type: esConfig.type,
    id: blogger.id,
    body: {
      fullname: blogger.fullname,
      username: blogger.username,
      bio: null,
      profile_image: null
    }
  });
}

/*
* When blogger info is updated
*/
exports.updateBlogger = async (blogger) => {
  const {id, fullname, bio, profile_image} = blogger;

  client.update({
    index: esConfig.index,
    type: esConfig.type,
    id,
    body: {
      doc: {
        fullname,
        bio,
        profile_image
      }
    }
  });
}

/*
* when blogger username is updated
*/
exports.updateBloggerUsername = async (bloggerId, username) => {
  client.update({
    index: esConfig.index,
    type: esConfig.type,
    id: bloggerId,
    body: {
      doc: {
        username
      }
    }
  });
}
