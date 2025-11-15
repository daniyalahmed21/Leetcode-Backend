const schema = {
  type: "object",
  required: ["PORT", "HOST", "REDIS_PORT", "REDIS_HOST"],
  properties: {
    PORT: {
      type: "string",
      default: "3000",
    },
    HOST: {
      type: "string",
      default: "0.0.0.0",
    },
    REDIS_PORT: {
      type: "string",
      default: "6379",
    },
    REDIS_HOST: {
      type: "string",
      default: "127.0.0.1",
    },
    MONGO_URI: {
      type: "string",
      default: "mongodb://localhost:27017/my_submission_service",
    },
  },
};

export default schema;
