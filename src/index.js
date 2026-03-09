import express from 'express';
import cors from 'cors';
import salesRouter from "./routes/sales.js";

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use("/api/sales", salesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.use((error, req, res, next) => {
  console.error(error);

  res.status(error.statusCode || 500).json({
    error: error.message || "Internal server error",
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});