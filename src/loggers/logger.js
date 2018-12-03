/*istanbul ignore next*/
import winston from "winston";
import path from "path";
/*istanbul ignore next*/
const timestamp = function () {
    return Date.now();
};
/*istanbul ignore next*/
const formatter = function (options) {
    // Return string will be passed to logger.
    const message = undefined !== options.message ? options.message : '';
    const meta = options.meta && Object.keys(options.meta).length ? ` meta="${JSON.stringify(options.meta)}"` : "";

    return `time="${options.timestamp()}" level="${options.level.toUpperCase()}" message="${message}"` + meta;
};

const transports = [
    new(winston.transports.Console)({
        timestamp,
        formatter
    })
];

const logger = new(winston.Logger)({
    transports
});

export default logger;