const { cleanMarkdown } = require("../utils");

class ProblemService {
  constructor(ProblemRepository) {
    this.ProblemRepository = ProblemRepository;
  }

  async createProblem(problemData) {
    problemData.description = cleanMarkdown(problemData.description);
    const problem = await this.ProblemRepository.createProblem(problemData);
    return problem;
  }

  async getAllProblems() {
    const problems = await this.ProblemRepository.getAllProblems();
    return problems;
  }

  async getProblem(id) {
    const problem = await this.ProblemRepository.getProblem(id);
    return problem;
  }

  async deleteProblem(id) {
    const deletedProblem = await this.ProblemRepository.deleteProblem(id);
    return deletedProblem;
  }

  async updateProblem (id,data){

    const updatedProblem = await this.ProblemRepository.updateProblem(id,data)
    return updatedProblem
  }
}
module.exports = { ProblemService };
