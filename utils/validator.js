/**
 * 接口参数校验
 *
 * Created by y.huang on 17/5/21.
 */

/**
 * 返回一个错误对象
 *
 * msg 提示语
 */
const _errJson = (message) => {
    return {
        code: '203',
        description: message,
        name: '数据错误',
        errKey: 'valid'
    };
};

/**
 * 数字校验方法、支持小数负数、支持字符串数字自动转换
 *
 * option object类型，包含校验条件，如下
 *   require 是否必须，boolean类型，默认false不必须
 *   empty 可以是空字符串, boolean类型，默认true可以
 *   isInteger 是否必须整数，boolean类型，默认false不必须
 *   equal 等于某个值，number类型
 *   equalArr 等于几个值中的一个，array类型，array元素为number类型，长度不限
 *   smaller 小于某个值，number类型
 *   bigger 大于某个值，number类型
 */
const _numberValid = (option) => {
    const value = option.value;

    // 设置默认值
    option.require = option.require === void(0) ? false : option.require;
    option.integer = option.integer === void(0) ? false : option.integer;
    option.empty = option.empty === void(0) ? true : option.empty;

    if (value === void(0)) {
        if (option.require === true) {
            throw _errJson(`${option.param} 参数是必须的`);
        } else {
            return value;
        }

    }

    if (typeof value === 'boolean' || typeof value === 'object') {
        throw _errJson(`${option.param} 参数类型必须是数字或字符串数字`);
    }

    if (value === '') {
        if (option.empty === false) {
            throw _errJson(`${option.param}  参数不能为空字符串`);
        } else {
            return void(0);
        }
    }

    const numValue = Number(value);

    if (!Number.isNaN(numValue) && Math.abs(numValue) !== Infinity) {
        if (option.equal !== void(0)) {
            if (numValue !== option.equal) {
                throw _errJson(`${option.param} 参数必须等于 ${option.equal}`);
            }
            return numValue;
        }
        if (option.equalArr !== void(0)) {
            let result = false;

            for (let item of option.equalArr) {
                if (item === numValue) {
                    result = true;
                    break;
                }
            }

            if (!result) {
                throw _errJson(`${option.param} 参数必须等于 ${option.equalArr} 中的某个`);
            }
            return numValue;
        }

        if (option.integer === true) {
            if (!Number.isInteger(numValue)) {
                throw _errJson(`${option.param} 参数必须是整数`);
            }
        }
        if (option.smaller !== void(0)) {
            if (!numValue < option.smaller) {
                throw _errJson(`${option.param} 参数必须小于 ${option.smaller}`);
            }
        }
        if (option.bigger !== void(0)) {
            if (!numValue > option.bigger) {
                throw _errJson(`${option.param} 参数必须大于 ${option.bigger}`);
            }
        }

        return numValue;
    } else {
        throw _errJson(`${option.param} 参数类型必须是数字或字符串数字`);
    }
};

/**
 * 字符串校验方法、支持数字自动转换
 *
 * option object类型，包含校验条件，如下
 *   require 是否必须，boolean类型，默认false不必须
 *   empty 是否可以为空字符串，boolean类型，默认true可以
 *   emptyFilter 过滤空字符串，boolean类型，true为需要过滤,  使用时empty必须为true
 *   regex 正则匹配，其值应该是'phone,email'中的一个，或是一个自定义的正则对象或正则自面量
 *   start 字符串长度大于，number类型
 *   end 字符串长度小于，number类型
 */
const _stringValid = (option) => {
    const value = option.value;

    // 设置默认值
    option.require = option.require || false;
    option.empty = option.empty || true;

    if (value === void(0)) {
        if (option.require === true) {
            throw _errJson(`${option.param} 参数是必须的`);
        } else {
            return value;
        }
    }

    if (Number.isNaN(value) || Math.abs(value) === Infinity ||
        typeof value === 'boolean' || typeof value === 'object') {
        throw _errJson(`${option.param} 参数类型必须是数字或字符串`);
    }

    const strValue = String(value).trim();

    if (strValue === '') {
        if (option.empty === false) {
            throw _errJson(`${option.param} 参数不能为空`);
        } else {
            if (option.emptyFilter === true) {
                return void(0);
            }
            return strValue;
        }
    }
    if (option.regex !== void(0)) {
        switch (option.regex) {
            case 'phone':
                if (!/^1[0-9]{10}$/.test(strValue)) {
                    throw _errJson(`${option.param} 参数不符合手机格式`);
                }
                break;
            case 'email':
                if (!/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(strValue)) {
                    throw _errJson(`${option.param} 参数不符合邮箱格式`);
                }
                break;
            default:
                if (!option.regex.test(strValue)) {
                    throw _errJson(`${option.param} 参数不符合自定义格式`);
                }
        }
        return strValue;
    }
    if (option.end !== void(0)) {
        if (!strValue.length < option.end) {
            throw _errJson(`${option.param} 参数长度必须小于 ${option.end}`);
        }
    }
    if (option.start !== void(0)) {
        if (!strValue.length > option.start) {
            throw _errJson(`${option.param} 参数长度必须大于 ${option.start}`);
        }
    }
    return strValue;
};

/**
 * 布尔校验方法、支持字符串布尔类型自动转换
 *
 * option object类型，包含校验条件，如下
 *   require 是否必须，boolean类型，默认false不必需
 *   empty 是否可以为空字符串，boolean类型，默认true可以
 *   emptyFilter 过滤空字符串，boolean类型，true为需要过滤,  使用时empty必须为true
 */
const _booleanValid = (option) => {
    const value = option.value;

    // 设置默认值

    option.require = option.require || false;
    option.empty = option.empty || true;

    if (value === void(0)) {
        if (option.require === true) {
            throw _errJson(`${option.param} 参数是必须的`);
        } else {
            return value;
        }
    }

    if (value === '') {
        if (option.empty === false) {
            throw _errJson(`${option.param} 参数不能为空`);
        } else {
            if (option.emptyFilter === true) {
                return void(0);
            }
            return value;
        }
    } else {
        if (typeof value !== 'boolean' && value !== 'true' && value !== 'false') {
            throw _errJson(`${option.param} 参数类型必须为boolean`);
        }
        return Boolean(value);
    }
};

const _objectValid = (option) => {
    const value = option.value;

    // 设置默认值
    option.require = option.require || false;
    option.empty = option.empty || true;

    if (value === void(0) || value === null) {
        if (option.require === true) {
            throw _errJson(`${option.param} 参数是必须的`);
        } else {
            return null;
        }
    }
    if (typeof value === 'object') {
        let valueArr = Object.keys(value);

        if (!valueArr.length) {
            if (option.empty === false) {
                throw _errJson(`${option.param} 参数不能为空`);
            } else {
                return null;
            }
        } else {
            return value;
        }
    } else {
        throw _errJson(`${option.param} 参数格式错误`);
    }
};

/*
 * data: 需要校验的数据对象
 * option: 校验规则对象，eg: {'name', {type: 'string', require: true}}
 *
 */
const valid = (data, option) => {
    Object.keys(option).forEach(item => {
        let opt = option[item];

        opt.value = data[item];
        opt.param = item;

        switch (opt.type) {
            case 'number':
                data[item] = _numberValid(opt);
                if (data[item] === void(0)) {
                    delete data[item];
                }
                break;
            case 'string':
                data[item] = _stringValid(opt);
                if (data[item] === void(0)) {
                    delete data[item];
                }
                break;
            case 'boolean':
                data[item] = _booleanValid(opt);
                if (data[item] === void(0)) {
                    delete data[item];
                }
                break;
            case 'object':
                data[item] = _objectValid(opt);
                if (data[item] === void(0)) {
                    delete data[item];
                }
                break;
            default:
                break;
        }
    });

    return data;
};

module.exports = valid;
