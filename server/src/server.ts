import dotenv from "dotenv";
dotenv.config();

import app from "./app";

console.log("JWT_SECRET =", process.env.JWT_SECRET);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});