import express from 'express';
import dotenv from 'dotenv';
import salesRoutes from './routes/sales.js';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/sales', salesRoutes);

app.get('/', (req, res) => res.send('Sales API is running'));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});