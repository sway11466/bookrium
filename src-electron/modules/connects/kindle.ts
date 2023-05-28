/**
 * Kindle Connector
 */

import { app, BrowserWindow, IpcMainInvokeEvent } from 'electron';
import log from 'electron-log';
import puppeteer, { Browser } from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import { v4 as uuid } from 'uuid';
import { KindleBook } from 'src/stores/BookTypes';
import { KindleConnect } from 'src/stores/ConnectTypes';

let browser: Browser;
const init = async () => {
  await pie.initialize(app);
  browser = await pie.connect(app, puppeteer);
}
init();

export default {

  testKindle: async (event:IpcMainInvokeEvent, email:string, password:string) :Promise<boolean> => {
    const window = new BrowserWindow(); // debug param {show: true}
    try {
      const page = await pie.getPage(browser, window);

      // go to the top page.
      await page.goto('https://read.amazon.co.jp');

      // return true if logined.
      const logined = await page.$('#header-desktop');
      if (logined) { return true; }

      // go to the login page.
      await page.waitForSelector('#top-sign-in-btn');
      await page.click('#top-sign-in-btn');
  
      // login with email and password
      await page.waitForSelector('#signInSubmit');
      await page.type('input[name=email]', email);
      await page.type('input[name=password]', password);
      await page.click('#signInSubmit');

      // wait loguin success
      await page.waitForSelector('#header-desktop');

      return true;
    } catch (e) {
      console.log(e);
      return false;
    } finally {
      window.destroy();
    }
  },

  // Todo: KindleBook[] type to be knknown[].
  collectKindle: async (event: IpcMainInvokeEvent, connect: KindleConnect) :Promise<KindleBook[]> => {
    log.info('call collectKindle.');
    const window = new BrowserWindow({show: true}); // debug param {show: true}
    try {
      const page = await pie.getPage(browser, window);

      // go to the top page.
      await page.goto('https://read.amazon.co.jp');

      // check login status.
      const logined = await page.$('#header-desktop');
      if (!logined) {
        // go to the login page.
        await page.waitForSelector('#top-sign-in-btn');
        await page.click('#top-sign-in-btn');
  
        // // login with email and password
        await page.waitForSelector('#signInSubmit');
        await page.type('input[name=email]', connect.email);
        await page.type('input[name=password]', connect.password);
        await page.click('#signInSubmit');

        // wait loguin success
        await page.waitForSelector('#header-desktop');
      }

      // collect books
      let books: KindleBook[] = []
      const paginationToken = 0;
      // for (let paginationToken=0; paginationToken != undefined;) {
        await page.goto('https://read.amazon.co.jp/kindle-library/search?&sortType=acquisition_asc&paginationToken=' + paginationToken)
        const respons = JSON.parse((await page.$eval('pre', e => e.textContent)) ?? '{}')
        books = books.concat(respons.itemsList)
      //  paginationToken = respons.paginationToken
      // }

      for (const book of books) {
        Object.assign(book, {
          id: uuid(),
          type: 'kindle',
          connectorId: connect.id,
          labels: [],
        });
      }

      return books;
    } catch (e) {
      console.log(e);
      return [];
    } finally {
      // window.destroy();
    }
  },

}
