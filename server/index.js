const express = require("express");
const router = require("./routes");

const app = express();

const PORT = 3000;

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server Listening 👂 on at http://localhost:${PORT}`);
});
