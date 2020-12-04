const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname)));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
