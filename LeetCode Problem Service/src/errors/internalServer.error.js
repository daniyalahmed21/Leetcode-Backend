const {BaseError} = require("./base.error")
const { StatusCodes } = require("http-status-codes");

class InternalServer extends BaseError{
    constructor(){
        super("InternalServer",StatusCodes.InternalServer,`something went wrong`,{})
    }
}

module.exports = {InternalServer}