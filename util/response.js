class UtilResponse {
    constructor({ statusCode }) {
        this.success = true;
        this.code = statusCode;
        this.message = null;
        this.result = null;
    }
}
UtilResponse.prototype.setResult = function (result) {
    this.result = result
    return this
}
UtilResponse.prototype.setMessage = function (message) {
    this.message = message
    return this
}
UtilResponse.prototype.setSuccess = function (success) {
    this.success = success
    return this
}
module.exports = UtilResponse