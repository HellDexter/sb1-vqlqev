export type ProspectStatus = 'new' | 'contacted' | 'meeting' | 'negotiation' | 'contract' | 'rejected';

export interface Prospect {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  status: ProspectStatus;
  contactPerson: string;
  phone: string;
  email: string;
  lastContact: string;
  notes: string;
}