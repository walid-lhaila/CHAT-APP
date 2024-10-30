export interface IChannel {
  name: string;
  members: number[];
  type: string;
  badWords?: string[];
}
