import { KindleBook } from './BookTypes';

export interface ConnectApi {
  testKindle: (email: string, password: string) => Promise<boolean>
  collectKindle: (email: string, password: string) => Promise<KindleBook[]>
};

export type ConnectType = 'kindle' | 'localstrage';

export type DisplayConnect = {
  id: string
  type: ConnectType
  description: string
  lastConnectAt: Date | null
  kindleConnect: KindleConnect | null
  LocalStrageConnect: LocalStrageConnect | null
};

export type KindleConnect = {
  id: string
  email: string
  password: string
};

export type LocalStrageConnect = {
  path: string
};
