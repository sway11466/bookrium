/**
 * Config Library
 */

import { IpcMainInvokeEvent } from 'electron';
import useStore from 'electron-store';

export default {

  saveConfig: (event:IpcMainInvokeEvent, config:object) => {
    const store = new useStore()
    store.set('bookrium', config)
  },
  
  loadConfig: () => {
    const store = new useStore()
    return store.get('bookrium')
  },
  
}
