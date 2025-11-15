import fp from 'fastify-plugin';
import SubmissionRepository from '../repositories/submission-repository.js';

async function repositoryPlugin(fastify, options) {
  const submissionRepository = new SubmissionRepository();
  fastify.decorate('submissionRepository', submissionRepository);
}

export default fp(repositoryPlugin);