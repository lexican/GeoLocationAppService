const appService = require('./AppService');

module.exports = app => {
    app.use('/App', appService);
};