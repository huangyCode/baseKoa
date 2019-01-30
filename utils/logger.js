var log4js = require('log4js');
// logger configure
log4js.configure({
    appenders: [
        {type: 'console'}
        ,
        {
            type: 'dateFile',
            filename: 'logs/middle',
            pattern: "-yyyy-MM-dd.log",
            alwaysIncludePattern: false
        }
    ],
    levels: {
        "[all]": "debug"
    },
    replaceConsole: true
});

module.exports = log4js;