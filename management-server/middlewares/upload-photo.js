 const aws = require('aws-sdk');
 const multer = require('multer');
 const multerS3 =require('multer-s3');

aws.config.update({
  maxRetries: 3,
  httpOptions: { timeout: 30000, connectTimeout: 5000 },
  region: 'eu-central-1',
  secretAccessKey: process.env.AWSSecretKey,
  accessKeyId: process.env.AWSAccessKeyId,
})

const s3 = new aws.S3();

 const upload = multer ({
    storage: multerS3({
      s3: s3,
      bucket: 'amazon-store-antiques-v1',
      acl: 'public-read',
      metadata: (req, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (req, file, cb) => {
        cb(null, Date.now().toString());
      }
    })
 })

 module.exports = upload;