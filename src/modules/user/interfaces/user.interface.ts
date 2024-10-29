export interface IUser {
    username: string;
    email: string;
    password: string;
    status?: string;
    friends?: string[]; 
    channels?: string[]; 
    score?: number;
  }