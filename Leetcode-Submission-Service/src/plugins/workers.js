import fp from "fastify-plugin";
import evaluationQueueWorker from "../workers/evaluation-workers.js";

async function workersPlugin(fastify, options) {
  await fastify.register(evaluationQueueWorker);
}

export default fp(workersPlugin);
