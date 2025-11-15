import { fetchProblemDetails } from "../apis/problem-service-api.js";

export async function createSubmissionService(fastify, payload) {
  try {
    const { submission } = fastify.queues;
    const { submissionRepository } = fastify;

    const problem = await fetchProblemDetails(payload.problemId);


    const stub = problem.codeStubs.find((c) => c.language === payload.language);
    if (!stub) {
      throw new Error(`No code stub found for language: ${payload.language}`);
    }

    const fullCode = `
${stub.startSnippet}
${payload.code}  
${stub.endSnippet}
`;

    const newSubmission = await submissionRepository.create({
      ...payload,
      code: fullCode,
    });

    const firstTestcase = problem.testcases[0] ?? { input: "", output: "" };

    const job = await submission.add("process-submission", {
      submissionId: newSubmission._id,
      userId: payload.userId,
      code: fullCode,
      language: payload.language,
      inputTestCase: firstTestcase.input,
      outputTestCase: firstTestcase.output,
    });

    return { job };
  } catch (err) {
    console.error("Error in createSubmissionService:", err);
    throw err;
  }
}
