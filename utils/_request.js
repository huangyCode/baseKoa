const request = require('request');

module.exports = function (options) {
    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error) { //请求异常时，返回错误信息
                reject(error);
            } else {
                //返回值的字符串转JSON
                resolve(JSON.parse(body));
            }
        });
    })
};