import fp from "fastify-plugin";
import redisPlugin from "./plugins/redis.js";
import queuesPlugin from "./plugins/queues.js";
import mongooseDB from "./plugins/mongoose-db.js";
import repositoryPlugin from "./plugins/repository.js";
import servicePlugin from "./plugins/service.js";
import apiRoutes from "./routes/api/api-routes.js";
import workersPlugin from "./plugins/workers.js"
async function appRootPlugin(fastify, options) {
  // Mongo
  await fastify.register(mongooseDB, {
    mongoURI: fastify.config.MONGO_URI,
  });

  // Repository
  await fastify.register(repositoryPlugin);

  // Redis
  await fastify.register(redisPlugin, {
    host: fastify.config.REDIS_HOST,
    port: fastify.config.REDIS_PORT,
    maxRetriesPerRequest: null,
  });

  // Queues
  await fastify.register(queuesPlugin);

  //workers
  await fastify.register(workersPlugin);

  // Services
  await fastify.register(servicePlugin);

  await fastify.register(apiRoutes, { prefix: "/api" });

}

export default fp(appRootPlugin);
