/**
 * Kindle Scraping
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

  testKindle: async (event:IpcMainInvokeEvent, userid:string, password:string) => {
    // const window = new BrowserWindow({show: false});
    const window = new BrowserWindow();
    const page = await pie.getPage(browser, window);

    // トップページを表示する
    await page.goto('https://read.amazon.co.jp')

    // ログインページに遷移する
    await page.waitForSelector('#top-sign-in-btn')
    await page.click('#top-sign-in-btn')

    console.log(event)
    console.log(userid);
    console.log(password);

    // window.destroy();
  },

  collectKindle: async (event:IpcMainInvokeEvent) :Promise<KindleBook[]> => {
    console.log('not implements');
    console.log(event)
    return [
      {
          asin: 'B079Y1WDVZ',
          webReaderUrl: new URL('https://read.amazon.co.jp/kindle-library/manga-wr/B079Y1WDVZ'),
          productUrl: new URL('https://m.media-amazon.com/images/I/61LjdewoX5L._SY400_.jpg'),
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
  },

}
