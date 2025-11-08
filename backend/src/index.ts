import express from 'express';
import cors from 'cors';
import { initDatabase } from './db/database';
import authRouter from './routes/auth';
import problemsRouter from './routes/problems';
import usersRouter from './routes/users';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Initialize database
initDatabase().catch(console.error);

// Routes
app.use('/api/auth', authRouter);
app.use('/api/problems', problemsRouter);
app.use('/api/users', usersRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});