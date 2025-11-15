import { createSubmissionController } from "../../../controllers/submission-controller.js";

async function SubmissionRoutes(fastify, options) {
  fastify.post("/", async (request, reply) => {
    return createSubmissionController(request, reply, fastify);
  });
}

export default SubmissionRoutes;
