import express from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res) => {
  res.send("API Running 🚀");
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});