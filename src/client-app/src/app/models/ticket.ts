export interface Ticket {
  id: string;
  title: string;
  description: string;
  reporter: string;
  assignee: string;
  priority: number;
  status: number;
  creationDate: string;
}
