export type ApplicationStatus = 'New' | 'In Progress' | 'Submitted' | 'Approved' | 'Rejected';

export type Client = {
  id: string;
  name: string;
  email: string;
  country: string;
  visaType: string;
  status: ApplicationStatus;
  appliedDate: string;
  avatar: string;
  agentId?: string;
};

export type Agent = {
  id: string;
  name: string;
  email: string;
  country: string;
  visaType: string;
  due: number;
  paid: number;
  totalFiles: number;
  avatar: string;
  assignedClients?: string[];
};

export type Application = {
  id:string;
  clientName: string;
  visaType: string;
  destination: string;
  status: ApplicationStatus;
  lastUpdate: string;
  avatar: string;
};
