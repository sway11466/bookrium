/**
 * Connection settings for setting file.
 */
export type ConnectStore = {
  connectors: Map<string, KindleConnect | LocalStorageConnect>,
}

export type Connect = {
  id: string
  type: ConnectType
  //Todo: LastCollect: string
};

/**
 * Kindle Connect Setting.
 */
export type KindleConnect = Connect & {
  email: string
  password: string
};

/**
 * LocalStorage Connect Setting.
 */
export type LocalStorageConnect = Connect & {
  path: string
};

/**
 * 
 */
export type ConnectType = 'kindle' | 'localstrage';

/**
 * Connection settings for screen display.
 */
export type DisplayConnect = {
  id: string
  type: ConnectType
  description: string
  lastConnectAt: Date | null
  kindleConnect: KindleConnect | null
  LocalStrageConnect: LocalStorageConnect | null
};
