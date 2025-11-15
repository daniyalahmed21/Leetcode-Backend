import fp from "fastify-plugin";
import submissionQueuePlugin from "../queues/submission-queue.js";

async function queuesPlugin(fastify, options) {
  await fastify.register(submissionQueuePlugin);
}

export default fp(queuesPlugin);
