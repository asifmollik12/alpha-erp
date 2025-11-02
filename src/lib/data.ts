import { Client, Application, ApplicationStatus, Agent } from './types';
import { PlaceHolderImages } from './placeholder-images';

export const initialClients: Client[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', passportNumber: 'A12345678', country: 'USA', visaType: 'Work Permit', status: 'Approved', appliedDate: '2023-10-15', avatar: PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl || '' },
  { id: '2', name: 'Bob Williams', email: 'bob@example.com', passportNumber: 'B87654321', country: 'UK', visaType: 'Student Visa', status: 'In Progress', appliedDate: '2023-11-20', avatar: PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl || '' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', passportNumber: 'C55555555', country: 'Canada', visaType: 'Tourist Visa', status: 'Submitted', appliedDate: '2024-01-05', avatar: PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl || '' },
  { id: '4', name: 'Diana Miller', email: 'diana@example.com', passportNumber: 'D44444444', country: 'Australia', visaType: 'Permanent Resident', status: 'New', appliedDate: '2024-02-12', avatar: PlaceHolderImages.find(img => img.id === 'avatar-4')?.imageUrl || '' },
  { id: '5', name: 'Ethan Davis', email: 'ethan@example.com', passportNumber: 'E33333333', country: 'Germany', visaType: 'Work Permit', status: 'Rejected', appliedDate: '2023-09-30', avatar: PlaceHolderImages.find(img => img.id === 'avatar-5')?.imageUrl || '' },
  { id: '6', name: 'Fiona Garcia', email: 'fiona@example.com', passportNumber: 'F22222222', country: 'USA', visaType: 'Student Visa', status: 'Approved', appliedDate: '2023-12-01', avatar: PlaceHolderImages.find(img => img.id === 'avatar-6')?.imageUrl || '' },
  { id: '7', name: 'George Rodriguez', email: 'george@example.com', passportNumber: 'G11111111', country: 'Canada', visaType: 'Work Permit', status: 'In Progress', appliedDate: '2024-01-22', avatar: PlaceHolderImages.find(img => img.id === 'avatar-7')?.imageUrl || '' },
  { id: '8', name: 'Hannah Wilson', email: 'hannah@example.com', passportNumber: 'H99999999', country: 'UK', visaType: 'Tourist Visa', status: 'New', appliedDate: '2024-02-18', avatar: PlaceHolderImages.find(img => img.id === 'avatar-8')?.imageUrl || '' },
  { id: '9', name: 'Ian Martinez', email: 'ian@example.com', passportNumber: 'I88888888', country: 'Australia', visaType: 'Student Visa', status: 'Submitted', appliedDate: '2024-02-01', avatar: PlaceHolderImages.find(img => img.id === 'avatar-9')?.imageUrl || '' },
  { id: '10', name: 'Jane Smith', email: 'jane@example.com', passportNumber: 'J77777777', country: 'USA', visaType: 'Tourist Visa', status: 'In Progress', appliedDate: '2024-03-01', avatar: PlaceHolderImages.find(img => img.id === 'avatar-10')?.imageUrl || '' },
];

export const initialAgents: Agent[] = [
    { id: '1', name: 'Agent Smith', email: 'agent.smith@example.com', country: 'USA', visaType: 'Work Permit', due: 500, paid: 2000, totalFiles: 10, avatar: PlaceHolderImages.find(img => img.id === 'avatar-1')?.imageUrl || '' },
    { id: '2', name: 'Agent Jones', email: 'agent.jones@example.com', country: 'UK', visaType: 'Student Visa', due: 1000, paid: 1500, totalFiles: 8, avatar: PlaceHolderImages.find(img => img.id === 'avatar-2')?.imageUrl || '' },
    { id: '3', name: 'Agent Brown', email: 'agent.brown@example.com', country: 'Canada', visaType: 'Tourist Visa', due: 0, paid: 3000, totalFiles: 15, avatar: PlaceHolderImages.find(img => img.id === 'avatar-3')?.imageUrl || '' },
    { id: '4', name: 'Agent White', email: 'agent.white@example.com', country: 'Australia', visaType: 'Permanent Resident', due: 200, paid: 2500, totalFiles: 12, avatar: PlaceHolderImages.find(img => img.id === 'avatar-4')?.imageUrl || '' },
    { id: '5', name: 'Agent Green', email: 'agent.green@example.com', country: 'Germany', visaType: 'Work Permit', due: 1500, paid: 1000, totalFiles: 5, avatar: PlaceHolderImages.find(img => img.id === 'avatar-5')?.imageUrl || '' },
];

export const getApplications = (clients: Client[]): Application[] => clients.map(client => ({
    id: client.id,
    clientName: client.name,
    visaType: client.visaType,
    destination: client.country,
    status: client.status,
    lastUpdate: client.appliedDate,
    avatar: client.avatar,
}));

export const getRecentApplications = (clients: Client[]): Application[] => getApplications(clients).sort((a,b) => new Date(b.lastUpdate).getTime() - new Date(a.lastUpdate).getTime()).slice(0, 5);

export const getStats = (clients: Client[]) => {
  const applications = getApplications(clients);
  const completedApplications = applications.filter(a => a.status === 'Approved' || a.status === 'Rejected').length;

  return {
    totalClients: clients.length,
    newClientsThisMonth: clients.filter(c => new Date(c.appliedDate) > new Date(new Date().setDate(new Date().getDate() - 30))).length,
    inProgressApplications: applications.filter(a => a.status === 'In Progress').length,
    successRate: completedApplications > 0 ? Math.round((applications.filter(a => a.status === 'Approved').length / completedApplications) * 100) : 0,
    avgProcessingTimeDays: 45, // This remains a static value for now
  };
};

export const getApplicationStatusCounts = (clients: Client[]) => {
    const applications = getApplications(clients);
    const counts: Record<ApplicationStatus, number> = {
        'New': 0,
        'In Progress': 0,
        'Submitted': 0,
        'Approved': 0,
        'Rejected': 0,
    };
    applications.forEach(app => {
        counts[app.status]++;
    });
    return Object.entries(counts).map(([status, count]) => ({ status, count }));
};

export const getSuccessRateData = (clients: Client[]) => {
    const applications = getApplications(clients);
    const approved = applications.filter(app => app.status === 'Approved').length;
    const rejected = applications.filter(app => app.status === 'Rejected').length;
    const inProgress = applications.length - approved - rejected;
    return [{ name: 'Approved', value: approved, fill: 'hsl(var(--chart-2))' }, { name: 'Rejected', value: rejected, fill: 'hsl(var(--destructive))' }, { name: 'In Progress', value: inProgress, fill: 'hsl(var(--chart-1))' }];
};

export const getProcessingTimeData = () => {
    return [
        { visa: 'Work Permit', days: 60 },
        { visa: 'Student Visa', days: 45 },
        { visa: 'Tourist Visa', days: 30 },
        { visa: 'Permanent Resident', days: 90 },
    ];
};

export const getClientDemographicsData = (clients: Client[]) => {
    const demographics: Record<string, number> = {};
    clients.forEach(client => {
        demographics[client.country] = (demographics[client.country] || 0) + 1;
    });
    return Object.entries(demographics).map(([country, count]) => ({ country, count }));
};
