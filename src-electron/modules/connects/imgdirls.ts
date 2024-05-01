/**
 * Image Directory (Local Storage) Connector
 */

import crypto from 'crypto';
import { IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';
import fs from 'fs';
import jimp from 'jimp';
import pathUtil from 'path';
import { v4 as uuid } from 'uuid';
import ls from 'src-electron/modules/ls';
import { ImgDirLocalStorageConnect } from 'src/stores/ConnectTypes';
import { SettingStore } from 'src/stores/SettingTypes';
import { ImgDirBook } from 'src/stores/BookTypes';

export default {

  testImgDirLs: async (event:IpcMainInvokeEvent, path:string) :Promise<boolean> => {
    log.info('call test ImgDirLs.');
    log.info(`folder path is ${path}`);
    return (fs.statSync(path).isDirectory());
  },

  collectImgDirLs: async (event:IpcMainInvokeEvent, connect: ImgDirLocalStorageConnect, setting: SettingStore): Promise<ImgDirBook[]> => {
    log.info('call collectImgDirLs.');
    const dirs = await ls.readdirSync(connect.extends.path, { type: 'dir', recursive: true });
    const books = await createBooks(dirs, connect, setting);
    return books;
  },
}

const createBooks = async (dirs: string[], connector: ImgDirLocalStorageConnect, setting: SettingStore): Promise<ImgDirBook[]> => {
  log.info('call createBooks');
  const books: ImgDirBook[] = await Promise.all(dirs.map(async path => {
    const id = uuid();
    const type = 'imgdir';
    const connectorId = connector.id;
    const title = collectTitle(path);
    const author = collectAuthor(path);
    const readingPath = await collectCoverPath(path);
    const artworkPath = pathUtil.join(setting.storage.artworkFolderPath, connector.id, id + '.jpg');
    const artwork = await collectArtwork(readingPath, artworkPath);
    const labels = [] as string[];
    const hash = crypto.createHash('md5').update(path).digest('hex');
    return {
      id, type, connectorId, title, author, artwork, labels,
      extends: { hash, path, title, author, artworkPath, readingPath }
    }
  }));
  return books.filter(book => book.artwork);
}

const collectTitle = (path: string) => {
  const name = pathUtil.basename(path);
  const match = name.match(title_regex);
  if (match !== null) {
    return match[1];
  }
  return name;
}
const title_regex = /\[.+\]\s*(.+)\s*/;

const collectAuthor = (path: string) => {
  const name = pathUtil.basename(path);
  const match = name.match(author_regex);
  if (match !== null) {
    return match[1];
  }
  return '';
}
const author_regex = /\[(.+)\]/;

const collectCoverPath = async (bookPath: string) => {
  // find first page
  const files = await ls.readdirSync(bookPath, { type: 'file', filter: cover_regex });
  if (files.length === 0) { return ''; }
  return files[0];
}
const cover_regex = /.(jpg|jpeg|png|gif)$/i;

const collectArtwork = async (coverPath: string, artworkPath: string) => {
  // make artwork dir
  const distDir = pathUtil.dirname(artworkPath);
  if (!fs.existsSync(distDir)) { fs.mkdirSync(distDir, { recursive: true }); }
  // make thumbnail and artwork(base64)
  const image = await jimp.read(coverPath);
  image.scaleToFit(200, 320).quality(60).write(artworkPath);
  return await image.getBase64Async(jimp.MIME_JPEG);
}
