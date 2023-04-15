/**
 * Kindle Scraping
 */

import { BrowserWindow, app, IpcMainInvokeEvent } from 'electron';
import pie from 'puppeteer-in-electron';
import puppeteer from 'puppeteer-core';

let browser = null;
const init = async () => {
  await pie.initialize(app);
  browser = await pie.connect(app, puppeteer);
}
init();

export default {

  test: async (event:IpcMainInvokeEvent) => {
    // const window = new BrowserWindow({show: false});
    const window = new BrowserWindow();
    const page = await pie.getPage(browser, window);

    // トップページを表示する
    await page.goto('https://read.amazon.co.jp')

    // ログインページに遷移する
    await page.waitForSelector('#top-sign-in-btn')
    await page.click('#top-sign-in-btn')

    // window.destroy();
  },
  
}
