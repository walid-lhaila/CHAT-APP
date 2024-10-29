export interface IMessage {
    text: string;
    sender: string;
    channel: string; 
    isOpen?: boolean;
    isDeleted?: boolean;
  }