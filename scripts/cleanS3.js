// npm i node-fetch aws-sdk

const fetch = require('node-fetch')
var AWS = require('aws-sdk');

AWS.config.update({accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, region: 'us-west-2'});
s3 = new AWS.S3({apiVersion: '2006-03-01'});

var bucketParams = {
  Bucket : process.env.BUCKET,
};

fetch('https://geokit-api.herokuapp.com/report/')
  .then(response => response.json())
  .then(reports => {
    const usedUrls = reports.map(
      report => report.image_url.replace('https://geokit-pothole-bucket.s3.amazonaws.com/', '').replace('%3A', ":").replace('%3A', ":")
    ).map(path => decodeURI(path))

    s3.listObjects(bucketParams, function(err, data) {
      if (err) {
        console.log("Error", err);
      } else {
        const toDelete = data.Contents.filter(({Key}) => {
          return !usedUrls.includes(Key)
        }).map(obj => ({Key: obj.Key}))

        console.log("toDelete", toDelete)
        const options = {
          ...bucketParams,
          Delete: {
            Objects: toDelete
          }
        }
        s3.deleteObjects(options, function(err, data){
          if(err){
            console.log("Check with error message " + err);
          } else {
            console.log("Files successfully deleted", data);
          }
        });
      }
    });
  })
