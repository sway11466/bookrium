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

/**
 * Connection settings for setting file.
 */
export type ConnectorSetting = {
  kindle: KindleConnect[],
  localstrage: LocalStorageConnect[]
}

/**
 * Kindle Connect Setting.
 */
export type KindleConnect = {
  id: string
  email: string
  password: string
};

/**
 * LocalStorage Connect Setting.
 */
export type LocalStorageConnect = {
  path: string
};
