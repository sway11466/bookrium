import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    dataFolderPath: null
  }),

  getters: {
    doubleCount (state) {
      return state;
    }
  },

  actions: {
  }
});
