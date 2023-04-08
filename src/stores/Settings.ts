import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', {
  state: () => ({
    settingFilePath: './' as string
  }),

  getters: {
    doubleCount (state) {
      return state;
    }
  },

  actions: {
  }
});
