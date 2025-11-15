import fp from "fastify-plugin";
import Redis from "ioredis";

async function redisPlugin(fastify, options) {
  const { host, port, maxRetriesPerRequest } = options;

  const redisConnection = new Redis({
    port: parseInt(port, 10),
    host,
    maxRetriesPerRequest,
  });

  fastify.decorate("redis", redisConnection);

  fastify.addHook("onClose", (instance, done) => {
    instance.redis
      .quit()
      .then(() => {
        instance.log.info("Redis client disconnected.");
        done();
      })
      .catch((err) => {
        instance.log.error("Error disconnecting Redis client:", err);
        done();
      });
  });
}

export default fp(redisPlugin);
