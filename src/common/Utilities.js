exports.responseSuccess = function (data = null, message = null, code = 200,) {
    let result = {
        code: code,
        data: data,
        message: message ? message : 'success'
    }
    if (!result.data) delete (result.data);

    return result;
};

exports.responseError = function (message = null, code = 500) {
    let result = {
        code: code,
        message: message ? message : '500 Internal server'
    }

    return result;
}