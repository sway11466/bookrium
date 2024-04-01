import { ShellApi } from 'src-electron/modules/shell-api';
import { LocalStorageApi } from 'src-electron/modules/ls-api';
import { ConfigApi } from 'src-electron/modules/config-api';
import { ConnectApi } from 'src-electron/modules/connects/connect-api';
import { SettingApi } from 'src-electron/modules/settings/setting-api';

/**
 * ApiManager Store.
 */
export type ApiManagerStore = {
  shellApi: ShellApi | null,
  localStorageApi: LocalStorageApi | null,
  configApi: ConfigApi | null,
  connectApi: ConnectApi | null,
  settingApi: SettingApi | null,
  path: PathApi,
}

export interface PathApi {
  separator: () => string,
  join: (base: string, ...paths: string[]) => string,
}
