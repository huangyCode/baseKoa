/**
 * MD5
 *
 * Created by leovs on 2015/12/12
 */
'use strict'

const crypto = require('crypto');

let encrypt = (str, secret)=> {
    var cipher = crypto.createCipher('aes192', secret);
    var enc = cipher.update(str, 'utf8', 'hex');
    enc += cipher.final('hex');
    return enc;
};
let decrypt = (str, secret)=> {
    var decipher = crypto.createDecipher('aes192', secret);
    var dec = decipher.update(str, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
};
let md5 = (str)=> {
    var md5sum = crypto.createHash('md5');
    md5sum.update(str);
    str = md5sum.digest('hex');
    return str;
};
let sha1 = (str)=> {
    var sha1sum = crypto.createHash('sha1');
    sha1sum.update(str);
    str = sha1sum.digest('hex');
    return str;
};
let randomString = (size)=> {
    size = size || 6;
    var code_string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var max_num = code_string.length - 1;
    var new_pass = '';
    while (size > 0) {
        new_pass += code_string.charAt(Math.floor(Math.random() * max_num));
        size--;
    }
    return new_pass;
};

/**
 * 自定义加密，例：'1234567' -> 'a1bb23ccc456dddd7xxxxxx'
 */
let bitEncrypt = (str, size)=> {
    let arr = [];

    for (let i = 0, k = 0; k < str.length; k += i) {
        i++
        let random = randomString(i);//随机加密字符串
        arr.push(`${random}${str.slice(k, k + i)}`);//在截取的内容前端加密
    }
    arr.push(randomString(size || 6));//末端加密，对应->xxxxxx
    return arr.join('');
}

/**
 * 自定义解密，例：str = 'a1bb23ccc456dddd7xxxxxx' -> '1234567'
 */
let bitDecrypt = (str, size)=> {
    str = str.slice(0, str.length - (size || 6));//剔除末端加密，默认6位

    let arr = [];

    for (let i = 0, k = 0; k < str.length; k += 2 * i) {
        i++
        arr.push(str.slice(k + i, k + 2 * i))
    }
    return arr.join('');
}

module.exports = {
    encrypt: encrypt,
    decrypt: decrypt,
    md5: md5,
    sha1: sha1,
    randomString: randomString,
    bitEncrypt: bitEncrypt,
    bitDecrypt: bitDecrypt
}