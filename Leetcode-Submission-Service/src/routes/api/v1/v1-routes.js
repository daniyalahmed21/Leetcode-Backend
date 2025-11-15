import SubmissionRoutes from "./submission-routes.js";

async function v1Plugin(fastify, options) {
  await fastify.register(SubmissionRoutes, { prefix: "/submit-job" });
}

export default v1Plugin;
