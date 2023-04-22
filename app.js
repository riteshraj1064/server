const express = require("express");
require("dotenv").config();
require("./db");
const cors = require("cors");

const userRouter = require("./routes/user");
const courseRouter = require("./routes/course");
const subjectRouter = require("./routes/subject");
const quizRouter = require("./routes/quizs");
const questionRouter = require("./routes/question");
const app = express();
const PORT = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/course", courseRouter);
app.use("/api/subject",subjectRouter)
app.use("/api/quiz",quizRouter)
app.use("/api/question",questionRouter)


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
