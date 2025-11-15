const { NotFound } = require("../errors/notfound.error");
const { Problem } = require("../models");
const { logger } = require("../config/logger.config.js");

class ProblemRepository {
  async createProblem(problemData) {
    try {
      const problem = await Problem.create({
        title: problemData.title,
        description: problemData.description,
        testcases: problemData.testcases ? problemData.testcases : [],
        codeStubs: problemData.codeStubs,
      });

      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllProblems() {
    try {
      const problems = await Problem.find();
      return problems;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getProblem(id) {
    try {
      const problem = await Problem.findById(id);

      if (!problem) {
        logger.error(`No problem find with this ${id}`);
        throw new NotFound("Problem", id);
      }
      return problem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async deleteProblem(id) {
    try {
      const deletedProblem = await Problem.findByIdAndDelete(id);
      if (!deletedProblem) {
        throw new NotFound("Problem", id);
      }
      return deletedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateProblem(id, data) {
    try {
      console.log("hello");

      const updatedProblem = await Problem.findByIdAndUpdate(id, data, {
        new: true,
      });

      console.log(updatedProblem);

      if (!updatedProblem) {
        throw new NotFound("Problem", id);
      }

      return updatedProblem;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

module.exports = { ProblemRepository };
