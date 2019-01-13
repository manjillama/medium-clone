const esConfig = require('../../../config/es-config');
const client = esConfig.client;
const Blogger = require('../../../models/blogger');

module.exports = async (req, res) => {
  await Blogger.findAll()
    .then(bloggers => {
      bloggers.forEach(blogger => {
        const {id, fullname, username, bio, profile_image} = blogger;
        const body = {
          fullname, username, bio, profile_image
        }

        /** Create user index if not already exist **/
        client.create({
          index: esConfig.index,
          type: esConfig.type,
          id,
          body
        }).catch(err=>err);

      });
    });

  res.send("Users re-indexing completed!!!")
}
