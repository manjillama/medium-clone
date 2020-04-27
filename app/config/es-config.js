var elasticsearch = require("elasticsearch");
var AWS = require("./prodEnvs").AWS;

var client;

if (process.env.MODE === "dev") {
  /*
   * For development
   */
  client = new elasticsearch.Client({
    host: process.env.ELASTIC_SEARCH_HOST
    // log: 'trace'
  });
} else {
  /*
   * For production
   */
  let options = {
    hosts: [process.env.ELASTIC_SEARCH_HOST], // array of amazon es hosts (required)
    connectionClass: require("http-aws-es"), // use this connector (required)
    awsConfig: AWS.config.update({
      region: process.env.AWS_REGION
    })
  };
  client = new elasticsearch.Client(options);
}

exports.client = client;
exports.index = "bloggers";
exports.type = "blogger";
