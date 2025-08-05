const express = require("express");
require("dotenv").config();
const upload = require("./routes/Document");
const app = express();

app.use(express.json())
app.use("/upload", upload);
app.listen(3000, () => {
    console.log(process.env.DO_SPACES_REGION);
    console.log("server is now running on port 3000..");
});
