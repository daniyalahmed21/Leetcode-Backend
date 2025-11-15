import { createSubmissionService } from "../services/submission-service.js";

async function createSubmissionController(request, reply, fastify) {
  try {
    const { payload } = request.body;

    const { job } = await createSubmissionService(fastify, payload);

    reply.code(200).send({
      message: "Job successfully submitted to queue",
      jobId: job.id,
      queueName: job.queue.name,
    });
  } catch (error) {
    reply
      .code(500)
      .send({
        message: "Failed to submit job due to an internal server error.",
      });
  }
}

export { createSubmissionController };
