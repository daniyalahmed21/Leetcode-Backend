import axios from "axios";
import { Worker } from "bullmq";

export default async function evaluationQueueWorker(fastify, options) {
  new Worker(
    "EvaluationQueue",
    async (job) => {
      if (job.name === "EvaluationJob") {
        const { response, userID, submissionId } = job.data;
        console.log("status", response.status);

        await fastify.submissionRepository.updateStatus(
          submissionId,
          response.status
        );
      }
    },
    { connection: fastify.redis }
  );
}
