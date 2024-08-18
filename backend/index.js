const express = require("express");
const axios = require("axios");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const cors = require("cors");
const { StatusCodes } = require("http-status-codes");

const app = express();

app.use(cors());

const limiter = rateLimit({
  windowMs: 1000,
  max: 5,
  message: "Too many requests from this IP, please try again later.",
});

// security middlewares
app.use(limiter);
app.use(helmet());
app.use(
  cors({
    origin: ["http://localhost:3000"],
  })
);

app.use(express.json());

const fetchMetadataFromUrl = async (url, index) => {
  try {
    const response = await axios.get(url);

    const title = response.data.name || "No title";
    const description = response.data.summary || "No description";
    const image = response.data.image?.medium || "";

    return { title, description, image };
  } catch (error) {
    return {
      error: `Invalid URL - Failed to fetch metadata for URL ${index + 1}`,
    };
  }
};

app.post("/fetch-metadata", async (req, res) => {
  const urls = req.body;

  if (!Array.isArray(urls) || urls.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error: "Invalid input, expected an array of URLs" });
  }

  try {
    const metadataPromises = urls.map((url, index) =>
      fetchMetadataFromUrl(url, index)
    );
    const metadataList = await Promise.all(metadataPromises);
    res.status(StatusCodes.OK).json(metadataList);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Network Issue - Failed to fetch metadata" });
  }
});

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
