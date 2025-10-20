
export interface Note {
  id: string;
  recipient_email: string;
  recipient_name?: string;
  content: string;
  send_at: string;
  created_at: string;
  sent_at?: string;
}