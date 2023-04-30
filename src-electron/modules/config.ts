/**
 * Config Library
 */
import { IpcMainInvokeEvent } from 'electron';
import fs from 'fs';
import pt from 'path';
import useStore from 'electron-store';

export default {

  hasConfig: async (event:IpcMainInvokeEvent, path:string): Promise<boolean> => {
    return fs.existsSync(path);
  },

  saveConfig: async (event:IpcMainInvokeEvent, path:string, key:string, config:object): Promise<boolean> => {
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    store.set(key, config);
    return true;
    // TODO: error handling
  },
  
  loadConfig: async (event:IpcMainInvokeEvent, path:string, key:string): Promise<object> => {
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    return fs.existsSync(path) ? store.get(key) as object : {};
  },

  hasKey: async (event:IpcMainInvokeEvent, path:string, key:string): Promise<boolean> => {
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    return store.has(key);
  },
}
