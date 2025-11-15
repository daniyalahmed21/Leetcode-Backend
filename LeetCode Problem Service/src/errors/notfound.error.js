const { BaseError } = require("./base.error");
const { StatusCodes } = require("http-status-codes");

class NotFound extends BaseError {
  constructor(resourceName, resourceValue) {
    super(
      "NotFound",
      StatusCodes.NOT_FOUND,
      `Requested resource ${resourceName} with value ${resourceValue} not found`,
      {resourceName,resourceValue}
    );
  }
}

module.exports = { NotFound };
