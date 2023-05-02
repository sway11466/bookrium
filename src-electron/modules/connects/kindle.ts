/**
 * Kindle Scraping Library
 */

import { BrowserWindow, app, IpcMainInvokeEvent } from 'electron';
import puppeteer, { Browser } from 'puppeteer-core';
import pie from 'puppeteer-in-electron';
import { KindleBook } from 'src/stores/BookTypes';

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

  collectKindle: async (event:IpcMainInvokeEvent, email:string, password:string) :Promise<KindleBook[]> => {
    const window = new BrowserWindow({show: true}); // debug param {show: true}
    try {
      const page = await pie.getPage(browser, window);

      // go to the top page.
      await page.goto('https://read.amazon.co.jp');

      // go to the login page.
      // await page.waitForSelector('#top-sign-in-btn');
      // await page.click('#top-sign-in-btn');
  
      // // login with email and password
      // await page.waitForSelector('#signInSubmit');
      // await page.type('input[name=email]', email);
      // await page.type('input[name=password]', password);
      // await page.click('#signInSubmit');

      // // wait loguin success
      // await page.waitForSelector('#header-desktop');

      return [
        {
            id: 'sample-book-02',
            type: 'kindle',
            connectorId: 'sample-connctor-01',
            asin: 'B079Y1WDVZ',
            webReaderUrl: 'https://read.amazon.co.jp/kindle-library/manga-wr/B079Y1WDVZ',
            productUrl: 'https://m.media-amazon.com/images/I/61LjdewoX5L._SY400_.jpg',
            title: 'Dr.STONE 5 (ジャンプコミックスDIGITAL) (Japanese Edition)',
            percentageRead: 0,
            authors: [
                '稲垣理一郎:Boichi:'
            ],
            resourceType: 'EBOOK',
            originType: 'PURCHASE',
            mangaOrComicAsin: true,
        }
      ]
    } catch (e) {
      console.log(e);
      return [];
    } finally {
      // window.destroy();
    }
  },

}
