import express from 'express';
import { connect } from 'mongoose';
import { config } from 'dotenv';
import courseRoutes from './routes/courseRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import cors from 'cors';

config();

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:5173'
}));
connect(process.env.MONGODB_URI).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/api/courses', courseRoutes);
app.use('/api/students', studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
