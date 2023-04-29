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

import { KindleBook } from 'src/stores/BookTypes';

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('configApi', {
  // ./modules/config
  getPath: async () :Promise<string> => await ipcRenderer.invoke('getPath'),
  hasConfig: async () :Promise<boolean> => await ipcRenderer.invoke('hasConfig'),
  saveConfig: async (config:object) :Promise<boolean> => await ipcRenderer.invoke('saveConfig', config),
  loadConfig: async () :Promise<object> => await ipcRenderer.invoke('loadConfig'),
  hasKey: async (key:string) :Promise<boolean> => await ipcRenderer.invoke('hasKey'),
})

contextBridge.exposeInMainWorld('localStorageApi', {
  // ./modules/ls
  getUserAppDataFolder: async () :Promise<string> => await ipcRenderer.invoke('getUserAppDataFolder'),
  selectFolder: async () :Promise<Electron.OpenDialogReturnValue> => await ipcRenderer.invoke('selectFolder'),
  saveFile: async (path:string, json:object) :Promise<void> => await ipcRenderer.invoke('saveFile', path, json),
})

contextBridge.exposeInMainWorld('connectApi', {
  // ./modules/connects/kindle
  testKindle: async (email:string, password:string) :Promise<boolean> => await ipcRenderer.invoke('testKindle', email, password),
  collectKindle: async (email:string, password:string) :Promise<KindleBook[]> => await ipcRenderer.invoke('collectKindle', email, password),
})
