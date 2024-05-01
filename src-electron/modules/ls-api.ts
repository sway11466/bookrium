export interface LocalStorageApi {
  getUserAppDataFolder: () => Promise<string>,
  selectFolder: () => Promise<Electron.OpenDialogReturnValue>,
  readdirSync: (path: string, option: object) => Promise<unknown>,
  saveFile: (path: string, json: object) => Promise<void>,
};

export type ReaddirSyncOption = {
  // Original options
  encoding?: BufferEncoding | null,
  withFileTypes?: true | false | undefined | null,
  recursive?: true | false | undefined | null,
  // Extends options
  filter?: RegExp,
  type?: 'file' | 'dir' | 'all',
}
