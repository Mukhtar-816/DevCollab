const logger = (...args) => process.env.NODE_ENV == "DEV" && console.log(...args);


module.exports = {
    logger
};