import { User } from './user';

export interface Project {
  id: number;
  name: string;
  budget: number;
  remainingBudget: number;
extraBudget: number;
TeamLeader: User;
users: User [];
}
