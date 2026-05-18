import { Router, Request, Response } from 'express';
import { Contribution, MatchingResult } from '../types';
import { calculateMatching } from '../services/quadraticFunding';

const router = Router();
const contributions: Contribution[] = [];
let matchingPool = 0;

router.get('/pool', (_req: Request, res: Response) => {
  res.json({ matchingPool });
});

router.post('/pool', (req: Request, res: Response) => {
  const { amount } = req.body;
  if (typeof amount !== 'number' || amount <= 0) {
    res.status(400).json({ error: 'valid amount required' });
    return;
  }
  matchingPool += amount;
  res.json({ matchingPool });
});

router.get('/contributions', (_req: Request, res: Response) => {
  res.json(contributions);
});

router.post('/contribute', (req: Request, res: Response) => {
  const { donor, projectId, amount } = req.body;
  if (!donor || !projectId || !amount) {
    res.status(400).json({ error: 'donor, projectId, and amount required' });
    return;
  }
  contributions.push({ donor, projectId, amount });
  res.status(201).json({ success: true });
});

router.get('/matching', (_req: Request, res: Response) => {
  const results: MatchingResult[] = calculateMatching(contributions, matchingPool);
  res.json(results);
});

export default router;
