import v1Plugin from "./v1/v1-routes.js";

async function apiRoutes(fastify, options) {
  await fastify.register(v1Plugin, { prefix: "/v1" });
}

export default apiRoutes
