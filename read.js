const aws = require('aws-sdk');
const fs=require('fs');
var _ = require('underscore');
const s3 = new aws.S3({ accessKeyId:'AKIAI37WG3NNRIZFHXUQ', 
secretAccessKey:'DVDAvsugK8ZwswM0Cln+wgXWzUehBPQQX7MC+bRm'}); // Pass in opts to S3 if necessary

var getParams = {
    Bucket: 'billerxchange.io', // your bucket name,
    Key: 's4.csv' // path to the object
}

var paramObj=s3.getObject(getParams, function(err, data) {
    if (err)
        return err;

  // Convert Body from a Buffer to a String
  let objectData = data.Body.toString('utf-8'); // Use the encoding necessary
  var arr=new Array();
  arr=objectData.split(",");
var title=new Array("First_Name","Last_Name","Company", "cname","area","city");
var json = _.object(title, arr);
//Custom file name with first_column.pdf
var fileName=arr[0]+".pdf";
// console.log(fileName);

// create file & insert data  
 fs.appendFile(fileName, JSON.stringify(json),'utf-8', function (err) {
   if (err) throw err;
   console.log('Success!');
 });
})