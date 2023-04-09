import { app, BrowserWindow, nativeTheme, ipcMain, dialog } from 'electron';
import path from 'path';
import os from 'os';
import fs from 'fs';
import useStore from 'electron-store';

// needed in case process is undefined under Linux
const platform = process.platform || os.platform();

try {
  if (platform === 'win32' && nativeTheme.shouldUseDarkColors === true) {
    require('fs').unlinkSync(
      path.join(app.getPath('userData'), 'DevTools Extensions')
    );
  }
} catch (_) {}

let mainWindow: BrowserWindow | undefined;

function createWindow() {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    icon: path.resolve(__dirname, 'icons/icon.png'), // tray icon
    width: 1000,
    height: 600,
    useContentSize: true,
    webPreferences: {
      contextIsolation: true,
      // More info: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/electron-preload-script
      preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
    },
  });

  mainWindow.loadURL(process.env.APP_URL);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
  } else {
    // we're on production; no access to devtools pls
    mainWindow.webContents.on('devtools-opened', () => {
      mainWindow?.webContents.closeDevTools();
    });
  }

  mainWindow.on('closed', () => {
    mainWindow = undefined;
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === undefined) {
    createWindow();
  }
});

ipcMain.handle('saveConfig', (event, config) => {
  const store = new useStore()
  store.set('bookrium', config)
});

ipcMain.handle('loadConfig', (event) => {
  const store = new useStore()
  return store.get('bookrium')
});

/**
 * Get User App Data Folder Path.
 * 
 * @return user app data folfder path
 * @see https://www.electronjs.org/docs/latest/api/app#appgetpathname
 */
ipcMain.handle('getUserAppDataFolder', async (event) => {
  return app.getAppPath('appData ');
});

/**
 * Show Folder Select Dialog.
 * 
 * @return canceled return true if dailog canceled.
 * @return filePaths selected folder paths.
 * @see https://www.electronjs.org/docs/latest/api/dialog
 */
ipcMain.handle('selectFolder', async (event) => {
  const { canceled, filePaths } = await dialog.showOpenDialog({
    properties: ['openDirectory'],
  });
  return { canceled, filePaths }
});

/**
 * Save a JSON object to a File.
 * 
 * @param path 
 * @param json
 */
ipcMain.handle('saveFile', async (event, path, json) => {
  fs.writeFileSync(path, JSON.stringify(json));
});
