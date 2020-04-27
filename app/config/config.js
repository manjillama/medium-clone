var url = require("url");
var randomstring = require("randomstring");

/*
 * Holds application development configs and generic helper functions
 */
module.exports = {
  HOME_DIR: require("os").homedir(),
  imageResourceDir: function() {
    return this.HOME_DIR + process.env.IMAGE_RESOURCE_FOLDER;
  },
  imageResourceUrl: "/static/images/",
  resourceHost: process.env.RESOURCE_HOST,
  getUtcTimestamp: function() {
    const now = new Date();
    return now.getTime() + now.getTimezoneOffset() * 60000;
  },
  getRandomString: function(n) {
    if (n) return randomstring.generate(n);
    return randomstring.generate();
  }
};
