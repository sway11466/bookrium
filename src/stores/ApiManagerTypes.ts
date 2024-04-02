import { ShellApi } from 'src-electron/modules/shell-api';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';

/**
 * ApiManager Store.
 */
export type ApiManagerStore = {
  initialized: boolean,
  shellApi: ShellApi,
  localStorageApi: LocalStorageApi,
  configApi: ConfigApi,
  connectApi: ConnectApi,
  settingApi: SettingApi,
  path: PathApi,
}

export interface PathApi {
  separator: () => string,
  join: (base: string, ...paths: string[]) => string,
}
