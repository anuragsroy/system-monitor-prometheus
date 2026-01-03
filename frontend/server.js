const express = require("express");
const app = express();

app.use(express.static(__dirname));

app.listen(5050, () => {
  console.log("Frontend running at http://localhost:5050");
});
