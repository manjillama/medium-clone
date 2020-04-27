/*
 * Extremely Important Never push this to git
 */

const AWS = require("aws-sdk");

//configuring the AWS environment
AWS.config.update({
  secretAccessKey: process.env.awsSecretKey,
  accessKeyId: process.env.awsAccessKey,
  region: process.env.awsRegion
});

s3 = new AWS.S3();
exports.AWS = AWS;

/*
 * @Params
 *   - Image buffer/stream
 *   - Image name
 * @return
 *   - Promise
 */
exports.fileUpload = (imageBuffer, imageName) => {
  return new Promise((resolve, reject) => {
    var uploadParams = { Bucket: process.env.awsBucket, Key: "", Body: "" };

    uploadParams.Body = imageBuffer;
    uploadParams.Key = imageName;

    s3.upload(uploadParams, function(err, data) {
      if (err) {
        reject(err);
      }
      if (data) {
        resolve(data.Location);
      }
    });
  });
};

/*
* @Params
* - objects in array with their keys
*   - [ { Key: '3_o6jgiht0nobfrRLZTvLQtGRGo5pTVgLK.jpg' },
      { Key: '3_tyl2ROp3BvCjH9K9hf6YGVBIiuh7q1Wj.jpg' } ]
*/
exports.fileDelete = _objects => {
  var params = {
    Bucket: process.env.awsBucket,
    Delete: {
      Objects: _objects,
      Quiet: false
    }
  };

  s3.deleteObjects(params, function(err, data) {
    // if (err) console.log(err, err.stack);
    // else console.log(data);
  });
};
