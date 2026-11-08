export type MinuteStatus = 'ok' | 'degraded';

export type ServiceRow = {
  id: string;
  name: string;
  tech: string;
  minutes: MinuteStatus[];
};

export const WINDOW_MINUTES = 60;
export const WINDOW_END = new Date('2026-11-01T14:52:00');

export const HEARTBEAT_INTERVAL_SEC = 30;

const withDegraded = (degraded: number[]): MinuteStatus[] =>
  Array.from({ length: WINDOW_MINUTES }, (_, i) => (degraded.includes(i) ? 'degraded' : 'ok'));

export const services: ServiceRow[] = [
  { id: 'api', name: 'API', tech: 'NestJS', minutes: withDegraded([]) },
  { id: 'heartbeat', name: 'Heartbeat intake', tech: 'from terminals', minutes: withDegraded([38, 39, 40]) },
  { id: 'db', name: 'Database', tech: 'PostgreSQL', minutes: withDegraded([]) },
  { id: 'notifications', name: 'Notifications', tech: 'for incidents', minutes: withDegraded([]) },
];
