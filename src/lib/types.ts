export interface Message {
  text: string;
  sender: string;
  time: string;
}

export interface InboxItem {
  id: number;
  sender: string;
  subject: string;
  preview: string;
  time: string;
  messages: Message[];
}
