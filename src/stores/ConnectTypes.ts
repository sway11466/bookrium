import { KindleBook } from './BookTypes';

export interface ConnectApi {
  testKindle: (userid: string, password: string) => Promise<void>
  collectKindle: () => Promise<KindleBook[]>
};

export type ConnectType = 'kindle' | 'localfile';

export type BaseConnect = {
  id: number
  type: ConnectType
  lastConnectAt: Date | null
};

export type KindleConnect = BaseConnect & {
  userid: string
  password: string
};

export type LocalFileConnect = BaseConnect & {
  path: string
};
