/**
 * This file is used specifically for security reasons.
 * Here you can access Nodejs stuff and inject functionality into
 * the renderer thread (accessible there through the "window" object)
 *
 * WARNING!
 * If you import anything from node_modules, then make sure that the package is specified
 * in package.json > dependencies and NOT in devDependencies
 *
 * Example (injects window.myAPI.doAThing() into renderer thread):
 *
 *   import { contextBridge } from 'electron'
 *
 *   contextBridge.exposeInMainWorld('myAPI', {
 *     doAThing: () => {}
 *   })
 *
 * WARNING!
 * If accessing Node functionality (like importing @electron/remote) then in your
 * electron-main.ts you will need to set the following when you instantiate BrowserWindow:
 *
 * mainWindow = new BrowserWindow({
 *   // ...
 *   webPreferences: {
 *     // ...
 *     sandbox: false // <-- to be able to import @electron/remote in preload script
 *   }
 * }
 */

import { contextBridge, ipcRenderer } from 'electron';
import { SettingStore } from 'src/stores/SettingTypes';
import { ImgDirLocalStorageConnect, KindleConnect, PDFLocalStorageConnect } from 'src/stores/ConnectTypes';
import { ImgDirBook, PDFBook } from 'src/stores/BookTypes';

contextBridge.exposeInMainWorld('shellApi', {
  // src-electron/modules/shell
  openElectron: async (url: string, option: object) :Promise<void> => await ipcRenderer.invoke('openElectron', url, option),
  openExternal: async (url: string, option: object) :Promise<void> => await ipcRenderer.invoke('openExternal', url, option),
})

contextBridge.exposeInMainWorld('localStorageApi', {
  // src-electron/modules/ls
  getUserAppDataFolder: async () :Promise<string> => await ipcRenderer.invoke('getUserAppDataFolder'),
  selectFolder: async () :Promise<Electron.OpenDialogReturnValue> => await ipcRenderer.invoke('selectFolder'),
  readdirSync: async (path: string, option: object) :Promise<unknown> => await ipcRenderer.invoke('readdirSync', path, option),
  saveFile: async (path: string, json: object) :Promise<void> => await ipcRenderer.invoke('saveFile', path, json),
})

contextBridge.exposeInMainWorld('configApi', {
  // src-electron/modules/config/config
  hasConfig: async (path: string,  key: string) :Promise<boolean> => await ipcRenderer.invoke('hasConfig', path, key),
  saveConfig: async (path: string, key: string, config: object) :Promise<boolean> => await ipcRenderer.invoke('saveConfig', path, key, config),
  loadConfig: async (path: string, key: string) :Promise<unknown> => await ipcRenderer.invoke('loadConfig', path, key),
  deleteConfig: async (path: string, key: string) :Promise<boolean> => await ipcRenderer.invoke('deleteConfig', path, key),
})

contextBridge.exposeInMainWorld('settingApi', {
  // src-electron/modules/settings/setting
  getPlatform: async () :Promise<string> => await ipcRenderer.invoke('getPlatform'),
  getAppVersion: async () :Promise<string> => await ipcRenderer.invoke('getAppVersion'),
})

// todo: Change Return Type to Book[]?
contextBridge.exposeInMainWorld('connectApi', {
  // src-electron/modules/connects/kindle
  testKindle: async (email: string, password: string) :Promise<boolean> => await ipcRenderer.invoke('testKindle', email, password),
  collectKindle: async (connect: KindleConnect) :Promise<PDFBook[]> => await ipcRenderer.invoke('collectKindle', connect),
  // src-electron/modules/connects/pdfls
  testPdfLs: async (testPath: string) :Promise<boolean> => await ipcRenderer.invoke('testPdfLs', testPath),
  collectPdfLs: async (connect: PDFLocalStorageConnect, setting: SettingStore) :Promise<PDFBook[]> => await ipcRenderer.invoke('collectPdfLs', connect, setting),
  // src-electron/modules/connects/imgdirls
  testImgDirLs: async (path: string) :Promise<boolean> => await ipcRenderer.invoke('testImgDirLs', path),
  collectImgDirLs: async (connect: ImgDirLocalStorageConnect, setting: SettingStore) :Promise<ImgDirBook[]> => await ipcRenderer.invoke('collectImgDirLs', connect, setting)

})
