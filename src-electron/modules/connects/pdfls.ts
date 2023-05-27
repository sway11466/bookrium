/**
 * PDF (Local Storage) Connector
 */

import { IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { PDFDocument } from 'pdf-lib';
import { v4 as uuid } from 'uuid';
import ls from 'src-electron/modules/ls';
// import puppeteer, { Browser } from 'puppeteer-core';
// import pie from 'puppeteer-in-electron';
import { PDFLocalStorageConnect } from 'src/stores/ConnectTypes';
import { SettingStore } from 'src/stores/SettingTypes';
import { PDFBook } from 'src/stores/BookTypes';

// let browser: Browser;
// const init = async () => {
//   await pie.initialize(app);
//   browser = await pie.connect(app, puppeteer);
// }
// init();

export default {

  testPdfLs: async (event:IpcMainInvokeEvent, path:string) :Promise<boolean> => {
    return (await ls.readdirSync(event, path, { filter: /.pdf$/ })).length > 0;
  },

  collectPdfLs: async (event:IpcMainInvokeEvent, connect: PDFLocalStorageConnect, setting: SettingStore): Promise<PDFBook[]> => {
    log.info('call collectPdfLs.');
    const files = await ls.readdirSync(event, connect.path, { filter: /.pdf$/ });
    const books = await collectMeta(files, connect, setting);
    // createArtworks(books);
    return books;
  },
}

const collectMeta = async (files: string[], connector: PDFLocalStorageConnect, setting: SettingStore): Promise<PDFBook[]> => {
  log.info('call collectMeta');
  return await Promise.all(files.map(async item => {
    const file = fs.readFileSync(item);
    const pdf = await PDFDocument.load(file, { ignoreEncryption: true, updateMetadata: false });
    const id = uuid();
    const artworkPath = path.join(setting.storage.artworkFolderPath, id + '.jpg');
    return {
      id,
      type: 'pdf',
      connectorId: connector.id,
      labels: [], // pdf.getKeywords(),
      hash: crypto.createHash('md5').update(file).digest('hex'),
      path: item,
      title: pdf.getTitle() ?? '',
      author: pdf.getAuthor() ?? '',
      artworkPath,
    }
  }));
}

// const createArtworks = async (books: PDFBook[]): Promise<void> => {
//   log.info('call createArtworks');
//   const window = new BrowserWindow(); // debug param {show: true}
//   const page = await pie.getPage(browser, window);
//   for (const book of books) { 
//     await page.goto(book.path);
//     await page.waitForNavigation();
//     await page.screenshot({ path: book.artworkPath });
//   }
// }
