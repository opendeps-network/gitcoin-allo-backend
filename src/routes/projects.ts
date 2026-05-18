import { Router, Request, Response } from 'express';
import { Project } from '../types';

const router = Router();
const projects = new Map<number, Project>();
let nextId = 1;

router.get('/', (_req: Request, res: Response) => {
  res.json(Array.from(projects.values()));
});

router.get('/:id', (req: Request, res: Response) => {
  const project = projects.get(Number(req.params.id));
  if (!project) {
    res.status(404).json({ error: 'Project not found' });
    return;
  }
  res.json(project);
});

router.post('/', (req: Request, res: Response) => {
  const { name, description, owner } = req.body;
  if (!name || !owner) {
    res.status(400).json({ error: 'name and owner are required' });
    return;
  }
  const project: Project = {
    id: nextId++,
    owner,
    name,
    description: description || '',
    matchMultiplier: 0,
  };
  projects.set(project.id, project);
  res.status(201).json(project);
});

export default router;
