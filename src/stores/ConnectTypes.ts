import { KindleBook } from './BookTypes';

export interface ConnectApi {
  testKindle: (userid: string, password: string) => Promise<void>
  collectKindle: () => Promise<KindleBook[]>
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
  userid: string
  password: string
};

export type LocalStrageConnect = {
  path: string
};
