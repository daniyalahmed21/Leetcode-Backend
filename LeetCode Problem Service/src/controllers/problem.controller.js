const { StatusCodes } = require("http-status-codes");
const { NotImplemented } = require("../errors/NotImplemented.error");
const { ProblemService } = require("../services");
const { ProblemRepository } = require("../repositories");

const problemService = new ProblemService(new ProblemRepository());

async function getProblem(req, res, next) {
  try {
    const { id } = req.params;
    const problem = await problemService.getProblem(id);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched problem",
      error: [],
      data: problem,
    });
  } catch (error) {
    next(error);
  }
}

function pingProblemController(req, res, next) {
  return res.json({ message: "Problem controller is up" });
}

async function getProblems(req, res, next) {
  try {
    const problems = await problemService.getAllProblems();
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully fetched problems",
      error: [],
      data: problems,
    });
  } catch (error) {
    next(error);
  }
}

async function addProblem(req, res, next) {
  try {
    const newProblem = await problemService.createProblem(req.body);
    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Successfully created problem",
      error: [],
      data: newProblem,
    });
  } catch (error) {
    next(error);
  }
}

async function deleteProblem(req, res, next) {
  try {
    const { id } = req.params;
    const deletedProblem = await problemService.deleteProblem(id);
    console.log("hello");
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully deleted problem",
      error: [],
      data: deletedProblem,
    });
  } catch (error) {
    next(error);
  }
}

async function updateProblem(req, res, next) {
  try {
    const { id } = req.params;
    const data = req.body
    const updatedProblem = await problemService.updateProblem(id,data);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Successfully updated problem",
      error: [],
      data: updatedProblem,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getProblem,
  getProblems,
  addProblem,
  deleteProblem,
  updateProblem,
  pingProblemController,
};
