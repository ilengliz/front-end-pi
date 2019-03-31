import { User } from './user';

export interface Project {
  id: string;
  name: string;
  budget: number;
  remainingBudget: number;
extraBudget: number;
TeamLeader: User;
users: User [];
}
