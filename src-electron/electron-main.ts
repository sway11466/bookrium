import { app, BrowserWindow, nativeTheme, ipcMain } from 'electron';
import path from 'path';
import os from 'os';

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
  mainWindow.setMenuBarVisibility(false);

  if (process.env.DEBUGGING) {
    // if on DEV or Production with debug enabled
    mainWindow.webContents.openDevTools();
    const { default: installExtension, VUEJS_DEVTOOLS } = require('electron-devtools-installer');
    // eslint-disable-next-line
    installExtension(VUEJS_DEVTOOLS).then((name: any) => console.log(name)).catch((err: any) => console.log(err));
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

// import and handle shell
import shell from 'src-electron/modules/shell';
for (const [k,v] of Object.entries(shell)) { ipcMain.handle(k, v) }

// import and handle LocalStrage
import ls from 'src-electron/modules/ls';
for (const [k,v] of Object.entries(ls)) { ipcMain.handle(k, v) }

// import and handle Config
import config from 'src-electron/modules/config/config';
for (const [k,v] of Object.entries(config)) { ipcMain.handle(k, v) }

// import and handle Connects(kindle)
import kindle from 'src-electron/modules/connects/kindle';
for (const [k,v] of Object.entries(kindle)) { ipcMain.handle(k, v) }

// import and handle Connects(pdfls)
import pdfls from 'src-electron/modules/connects/pdfls';
for (const [k,v] of Object.entries(pdfls)) { ipcMain.handle(k, v) }

// import and handle Connects(imgdirls)
import imgdirfs from 'src-electron/modules/connects/imgdirls';
for (const [k,v] of Object.entries(imgdirfs)) { ipcMain.handle(k, v) }

// import and handle Connects
import settings from 'src-electron/modules/settings/setting';
for (const [k,v] of Object.entries(settings)) { ipcMain.handle(k, v) }
