const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const uri =
  "mongodb+srv://alexey:12345alex@creativenotesdb.u4t6fr4.mongodb.net/users";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

app.use(require("./routes/userRoutes"));
app.use(require("./routes/noteRoutes"));

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
