// hold application secrets and config
module.exports = {
  SECRET: 'ksykd784ndg3399jjnm-338djddkdmdsd91hds-4hdk',
  HOME_DIR: require('os').homedir(),
  imageDir: function(){
    return this.HOME_DIR+'/Documents/threadly/images/';
  }
};
