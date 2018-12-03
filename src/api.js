import restify from "restify";

import logger from "./loggers/logger";
import accesslog from "./loggers/accessLogger";

const port = process.env["NODE_PORT"] || 8110;
const server = restify.createServer({
    name: "aws-s3-test"
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.dateParser());
server.use(restify.queryParser());
server.use(restify.urlEncodedBodyParser());
server.use(restify.gzipResponse());

if (process.env.NODE_ENV !== 'test') {
    server.use(accesslog);
}

server.get("/", (req, res, next) => {

    res.send("OK");      

    return next();
});

server.listen(port, () => {
    logger.log("info", `App started at ${port}`);
});
