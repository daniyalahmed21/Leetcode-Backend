const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const problemSchema = new Schema({
  title: {
    type: String,
    required: [true, "Title cannot be empty"],
  },
  description: {
    type: String,
    required: [true, "Description cannot be empty"],
  },
  difficulty: {
    type: String,
    enum: ["easy", "hard", "medium"],
    required: [true, "Difficulty cannot be empty"],
    default: "easy",
  },
  testcases: [
    {
      input: {
        type: String,
        required: true,
      },
      output: {
        type: String,
        required: true,
      },
    },
  ],
  codeStubs: [
    {
      language: {
        type: String,
        required: true,
      },
      startSnippet: {
        type: String,
        required: true,
      },
      userSnippet: {
        type: String,
        required: true,
      },
      endSnippet: {
        type: String,
        required: true,
      },
    },
  ],
  editorial: {
    type: String,
  },
});

const Problem = mongoose.model("Problem", problemSchema); //logical view

module.exports = { Problem }; //actual object
