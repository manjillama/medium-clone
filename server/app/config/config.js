var url = require('url');
var randomstring = require("randomstring");

// holds application secrets and config
module.exports = {
  SECRET: 'ksykd784ndg3399jjnm-338djddkdmdsd91hds-4hdk',
  HOME_DIR: require('os').homedir(),
  imageResourceDir: function(){
    return this.HOME_DIR+'/Documents/threadly/images/';
  },
  imageResourceUrl: '/static/images/',
  userImageResourceDir: function(userId){
    return this.imageResourceDir() + userId +'/';
  },
  userImageResourceUrl: function(userId){
    return this.imageResourceUrl+ userId +'/';
  },
  resourceHost: 'http://localhost:5000',
  getUtcTimestamp: function(){
    const now = new Date();
    return now.getTime() + now.getTimezoneOffset() * 60000;
  },
  getRandomString: function(){
    return randomstring.generate(12);
  }
};
