class BaseError extends Error {
  constructor(name, statusCode, description, details) {
    super(description);
    this.name = name;
    this.statusCode = statusCode;
    this.details = details;
  }
}

module.exports = { BaseError };

// Internally, it still extends a normal Error, so it inherits:

// name
// message
// stack

// Adding your own custom properties:

// statusCode
// details
