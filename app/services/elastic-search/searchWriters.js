const esConfig = require("../../config/es-config");
const client = esConfig.client;

exports.searchWriters = async (req, res) => {
  /*
   Elastic search disabled
   -- remove the line below if you have elastic search setup correctly
  */
  return res.send([]);

  const { q } = req.params;
  const response = await client.search({
    index: esConfig.index,
    type: esConfig.type,
    body: {
      _source: {
        excludes: ["blogs"]
      },
      query: {
        bool: {
          should: [
            { match: { fullname: q } },
            { match: { bio: q } },
            { match: { username: q } }
          ]
        }
      }
    }
  });

  let writers = [];

  response.hits.hits.forEach(hit => {
    const id = hit._id;
    const { profile_image, bio, fullname, username } = hit._source;
    const writer = {
      id,
      fullname,
      username,
      bio,
      profile_image
    };
    writers.push(writer);
  });

  res.send(writers);
};
