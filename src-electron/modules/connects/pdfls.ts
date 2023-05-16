/**
 * PDF (Local Storage) Connector
 */

import { IpcMainInvokeEvent } from 'electron';
import crypto from 'crypto';
import fs from 'fs';
import { PDFDocument } from 'pdf-lib';
import ls from 'src-electron/modules/ls';

export default {

  testPdfLs: async (event:IpcMainInvokeEvent, path:string) :Promise<boolean> => {
    return (await ls.readdirSync(event, path, { filter: /.pdf$/ })).length > 0;
  },

  collectPdfLs: async (event:IpcMainInvokeEvent, path:string) :Promise<unknown[]> => {
    const files = await ls.readdirSync(event, path, { filter: /.pdf$/ });
    return await Promise.all(files.map(async item => {
      const file = fs.readFileSync(item);
      const pdf = await PDFDocument.load(file, { ignoreEncryption: true, updateMetadata: false });
      return {
        hash: crypto.createHash('md5').update(file).digest('hex'),
        path: item,
        title: pdf.getTitle(),
        author: pdf.getAuthor(),
        labels: pdf.getKeywords(),
      }
    }));
  },

}
