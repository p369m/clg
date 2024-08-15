import express from "express";
import mongoose, { Schema } from "mongoose";
import cors from "cors";
const port = 3000;
mongoose.connect("mongodb://127.0.0.1:27017/clg");
const questionSchema = Schema({
  question: String,
  keyword: String,
  options: String,
  answer: String,
});
const Question = mongoose.model("Question", questionSchema);
const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.post("/upload", async (req, res) => {
  try {
    const { question, keyword, options, answer } = req.body;
    console.log(req.body);
    console.log({ question, keyword, options, answer });
    const newQuestion = await Question.create({
      question,
      keyword,
      options,
      answer,
    });
    console.log(newQuestion);
    res.status(200).json(newQuestion);
  } catch (error) {
    res.status(400).json({ error: "something went wrong" });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
