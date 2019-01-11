const esConfig = require('../../config/es-config');
const client = esConfig.client;

/*
* Index Mapping
Mapping is the process of defining how a document, and the fields it contains, are stored and indexed. For instance, use mappings to define:

which string fields should be treated as full text fields.
which fields contain numbers, dates, or geolocations.
whether the values of all fields in the document should be indexed into the catch-all _all field.
the format of date values.
custom rules to control the mapping for dynamically added fields.
Visit: https://www.elastic.co/guide/en/elasticsearch/reference/6.3/mapping.html for more info
*/
module.exports = async (req, res) => {
  const response = await client.indices.create({
    index: 'bloggers',
    body: {
      mappings: {
        blogger: {
          properties:{
            fullname: { type: "text" },
            bio: { type: "text" },
            username: {type: "text"},
            profile_image: {enabled: false},
            blogs: {
              type: "nested",
              properties: {
                id: { enabled: false },
                title: { type: "text" },
                story_summary: { enabled: false },
                created_at: {enabled: false},
                story_thumbnails: {enabled: false}
              }
            }
          }
        }
      }
    }
  });
  res.send(response);
}
