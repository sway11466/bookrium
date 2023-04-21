/**
 * Kindle Scraping
 */

import { BrowserWindow, app, IpcMainInvokeEvent } from 'electron';
import pie from 'puppeteer-in-electron';
import puppeteer, { Browser } from 'puppeteer-core';

let browser: Browser;
const init = async () => {
  await pie.initialize(app);
  browser = await pie.connect(app, puppeteer);
}
init();

export default {

  kindleTest: async (event:IpcMainInvokeEvent, userid:string, password:string) => {
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

  kindleCollect: async (event:IpcMainInvokeEvent) => {
    console.log('not implements');
    console.log(event)
  },

}
