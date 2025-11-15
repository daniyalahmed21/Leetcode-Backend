import fp from "fastify-plugin";
import { createSubmissionService } from "../services/submission-service.js";

async function servicePlugin(fastify, options) {
  fastify.decorate("submissionService", {
    createSubmission: (payload) => createSubmissionService(fastify, payload),
  });
}

export default fp(servicePlugin);
