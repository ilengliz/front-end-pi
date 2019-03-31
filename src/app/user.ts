import { Project } from './Project';

export interface User {
  email: string;
  firstname: string;
  lastname: string;
  id: number;
projects: Project [];
password: string;
  cin: string;
  sex: string;
  phoneNum: string;
  jobpost: string;
  profilPic: string;
  qrcode: string;
  roles: string[];


}
