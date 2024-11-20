export interface Appointment {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  location: string;
  prospectId?: string;
  type: 'meeting' | 'call' | 'follow-up' | 'other';
  status: 'scheduled' | 'completed' | 'cancelled';
}