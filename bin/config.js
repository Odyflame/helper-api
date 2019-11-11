
function getConfig() {
    if (process.env.NODE_ENV ===  'production') {
        return require('./config/production');
    }
    else if(process.env.NODE_ENV === 'development') {
        return require('./config/development');
    }
    else {
        return require('./config/mydb');
    }
}

module.exports = getConfig();