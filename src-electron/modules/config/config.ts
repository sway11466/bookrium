/**
 * Config Library
 */
import { IpcMainInvokeEvent } from 'electron';
import fs from 'fs';
import pt from 'path';
import useStore from 'electron-store';

export default {

  hasConfig: async (event: IpcMainInvokeEvent, path: string, key: string): Promise<boolean> => {
    if (!fs.existsSync(path)) { return false; }
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    return store.has(key);
  },

  saveConfig: async (event: IpcMainInvokeEvent, path: string, key: string, config: object): Promise<boolean> => {
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    store.set(key, config);
    return true;
    // TODO: error handling
  },
  
  loadConfig: async (event: IpcMainInvokeEvent, path: string, key: string): Promise<unknown> => {
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    return fs.existsSync(path) ? store.get(key) as object : {};
  },

  deleteConfig: async (event: IpcMainInvokeEvent, path: string, key: string): Promise<boolean> => {
    const {dir, name, ext} = pt.parse(path);
    const store = new useStore({cwd: dir, name: name, fileExtension: ext.replace('.', '')});
    store.delete(key);
    return true;
  },
}
