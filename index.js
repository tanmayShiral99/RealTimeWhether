const express = require("express");
const app = express();
const path = require("path");
const port = process.env.PORT || 5500;

app.use(express.static(path.join(__dirname)));
// console.log(path.join(__dirname));

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
