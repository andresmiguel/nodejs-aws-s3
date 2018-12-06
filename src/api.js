import restify from "restify";

import logger from "./loggers/logger";
import accesslog from "./loggers/accessLogger";

import s3 from "./aws-s3/s3";

const port = process.env["NODE_PORT"] || 8110;
const server = restify.createServer({
    name: "aws-s3-test"
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.gzipResponse());

if (process.env.NODE_ENV !== 'test') {
    server.use(accesslog);
}

server.get("/buckets", (req, res, next) => {

    s3.listBuckets()
        .then(data => {
           res.send(data.Buckets);
        })
        .catch(err => {
            res.status(500);
            res.send(` Error: ${err}`);
        });

    return next();
});

server.post(/buckets\/file/, (req, res, next) => {

    const { name, content, bucket } = req.body;    

    logger.log("info", " File for upload to Bucket: %s. Name: %s Content: %s", bucket, name, content);

    s3.uploadFile(bucket, name, content)
        .then(data => {
           res.send(data);
        })
        .catch(err => {
            res.status(500);
            res.send(` Error: ${err}`);
        });

    return next();
});

server.post("/buckets/:name", (req, res, next) => {

    const { name } = req.params;
    
    s3.createBucket(name)
        .then(data => {
           res.send(data);
        })
        .catch(err => {
            res.status(400);
            res.send(`Error: ${err}`);
        });

    return next();
});

server.del("/buckets/:name", (req, res, next) => {

    const { name } = req.params;
    
    s3.deleteBucket(name)
        .then(data => {
           res.send(data);
        })
        .catch(err => {
            res.status(400);
            res.send(`Error: ${err}`);
        });

    return next();
});


server.listen(port, () => {
    logger.log("info", `App started at ${port}`);
});
