const express = require("express");
const { default: subjectRoute } = require("./routes/subject.route");
const cors = require("cors");
const app = express();
require("dotenv").config();
const morgan = require("morgan");
const path = require("path");
const { default: stdRoute } = require("./routes/std.route.js");
const { default: pRouter } = require("./routes/professor.route.js");
const { default: dbRouter } = require("./routes/dashboard.route.js");

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use(subjectRoute);
app.use(stdRoute);
app.use(pRouter);
app.use(dbRouter);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.get("/health", async (req, res) => {
  res.json({ status: "OK" });
});

app.listen(5000, () => {
  console.log("Server start at port : 5000");
});
