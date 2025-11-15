import fp from 'fastify-plugin';
import { Queue } from 'bullmq';

async function submissionQueuePlugin(fastify, options) {
  const submissionQueue = new Queue('SubmissionQueue', {
    connection: fastify.redis
  });

  fastify.decorate('queues', {
    submission: submissionQueue
  });

  fastify.addHook('onClose', async () => {
    fastify.log.info('Closing BullMQ queue connection...');
    await submissionQueue.close();
    fastify.log.info('BullMQ queue connection closed.');
  });
}

export default fp(submissionQueuePlugin);