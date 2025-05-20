const express = require("express");
const app = express();
require("dotenv").config();

const describeRoute = require("./routes/describe");

app.use(express.json());
app.use(express.static("public"));

app.use("/describe", describeRoute);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
