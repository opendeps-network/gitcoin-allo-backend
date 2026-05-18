export interface Project {
  id: number;
  owner: string;
  name: string;
  description: string;
  matchMultiplier: number;
}

export interface Contribution {
  donor: string;
  projectId: number;
  amount: number;
}

export interface MatchingResult {
  projectId: number;
  matchAmount: number;
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  owner: string;
}

export interface ContributeRequest {
  donor: string;
  projectId: number;
  amount: number;
}
