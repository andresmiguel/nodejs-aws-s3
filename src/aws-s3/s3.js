import AWS from "aws-sdk";
import logger from "../loggers/logger";

// Set the region
AWS.config.update({region: "sa-east-1"});
// Log api method calls
AWS.config.logger = console;
// Create S3 service object
const s3 = new AWS.S3({apiVersion: "2006-03-01"});

const createBucket = (name) => {
    // Create the parameters for calling createBucket
    const bucketParams = {
        Bucket: name
    };
    
    return new Promise((resolve, reject) => {
        // Call S3 to create the bucket
        s3.createBucket(bucketParams, function(err, data) {
            if (err) {
                logger.log("error", "Error: %s", err);
                reject(err);
            } else {
                logger.log("info", "Success: %s", data.Location);
                resolve(data);
            }
        });
    });    
};

const listBuckets = () => {
    return new Promise((resolve, reject) => {
        // Call S3 to list buckets
        s3.listBuckets((err, data) => {
            if (err) {
                logger.log("error", "Error: %s", err);
                reject(err);
            } else {                
                logger.log("info", data.Buckets);                        
                resolve(data);
            }
        });
    });    
};

const deleteBucket = (name) => {
    // Create the parameters for calling deleteBucket
    const bucketParams = {
        Bucket: name
    };

    return new Promise((resolve, reject) => {
        // Call S3 to delete the bucket
        s3.deleteBucket(bucketParams, function(err, data) {
            if (err) {
                logger.log("error", "Error: %s", err);
                reject(err);
            } else {
                logger.log("info", "Success: %s", data.Location);
                resolve(data);
            }
        });
    });
};

export default {
    listBuckets,
    createBucket,
    deleteBucket
};