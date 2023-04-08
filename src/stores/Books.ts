import { defineStore } from 'pinia';

type BaseBook = {
  bookriumid: number
  type: ConnectType
  title: string
  author: string
  image: string
};
type ConnectType = 'kindle' | 'pdf';

type KindleBook = BaseBook & {
  gp: string
};

export const useBooksStore = defineStore('books', {
  state: () => ({
    kindles: [] as KindleBook[]
  }),

  getters: {
    all (state) {
      return state.kindles
    }
  },

  actions: {
    fillSample () {
      if (this.kindles.length == 0) {
        this.kindles.push({bookriumid:0, type:'kindle', title:'プログラマー脳', author:'フェリエンヌ・ヘルマンス, 水野貴明他', image:'https://m.media-amazon.com/images/I/41u4r0mRSeL.jpg', gp:'B0BVDQM5H1'});
        this.kindles.push({bookriumid:1, type:'kindle', title:'Vue.js 3 超入門', author:'掌田津耶乃', image:'https://m.media-amazon.com/images/I/51l49nHkKQL.jpg', gp:'B08WYKVPF5'});
      }
    },
  }
});
