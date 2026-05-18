import express from 'express';
import cors from 'cors';
import { config } from './config';
import projectsRouter from './routes/projects';
import votingRouter from './routes/voting';

const app = express();

app.use(cors({ origin: config.cors.origin }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/projects', projectsRouter);
app.use('/api/voting', votingRouter);

app.listen(config.port, () => {
  console.log(`Backend running on port ${config.port}`);
});
