const express = require("express");
const app = express();

//Routers
// const noteRouter = require("./Routes/noteRouter");

const cors = require("cors");
app.use(cors());

app.use(express.json());

// app.use("/notes", noteRouter);

const PORT = 3001;

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
