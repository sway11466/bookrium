import { defineStore } from 'pinia';
import { useApiManager } from 'src/stores/ApiManager';
import { useSettingsStore } from 'src/stores/Settings';
import { Label, LabelsStore, TreedLabel } from 'src/stores/LabelTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_CONNECTOR_KEY = CONFIG_ROOT_KEY + '.labels';

export const useLabelsStore = defineStore('labels', {
  
  state: (): LabelsStore => ({
    labels: new Map(),
  }),

  getters: {
    list: (state): Label[] => [...state.labels.values()],
    tree(): TreedLabel[] {
      // convert TreedLabel
      const index = new Map<string, TreedLabel>();
      this.list.forEach(label => index.set(label.name, {...label, children:[]}));
      // create tree
      const tree = [] as TreedLabel[];
      [...index.values()].forEach(label => {
        if (label.parent) {
          index.get(label.parent)?.children.push(label); //Todo: remove ?
        } else {
          tree.push(label);
        }
      });
      return tree;
    },
  },

  actions: {
    // --------------------------------
    //  comoon functions
    // --------------------------------
    async init(): Promise<void> {
      await this.loadAllConnects();
      this.labels.set("root1", { name: 'root1', color: '', parent: null, count: 12, createdAt: new Date(), });
      this.labels.set("hoge", { name: 'hoge', color: '', parent: 'root1', count: 29, createdAt: new Date(), });
      this.labels.set("piyo", { name: 'piyo', color: '', parent: 'root1', count: 32, createdAt: new Date(), });
      this.labels.set("poke", { name: 'poke', color: '', parent: 'piyo', count: 4, createdAt: new Date(), });
      this.labels.set("root2", { name: 'root2', color: '', parent: null, count: 53, createdAt: new Date(), });
      this.labels.set("foo", { name: 'foo', color: '', parent: 'root2', count: 16, createdAt: new Date(), });
      this.labels.set("bar", { name: 'bar', color: '', parent: 'root2', count: 47, createdAt: new Date(), });
    },

    async loadAllConnects(): Promise<boolean> {
      // const apiManager = useApiManager();
      // const settingsStore = useSettingsStore();
      // if (!apiManager.configApi.hasConfig(settingsStore.settingPath)) { return false; }
      // const connectors = (await apiManager.configApi.loadConfig(settingsStore.settingPath, CONFIG_CONNECTOR_KEY)) as Map<string, KindleConnect | LocalStorageConnect>;
      // Object.entries(connectors).forEach(([key, value]) => this.connectors.set(key, value));
      return true;
    },

    // --------------------------------
    //  kindle functions
    // --------------------------------
    newLabel(): Label {
      return {
        name: '',
        color: '#BBBBBB',
        parent: null,
        count: 0,
        createdAt: new Date(),
      }
    },

    add(label: Label) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // add store if new connect
      // if (!this.connectors.has(connect.id)) {
      //   this.connectors.set(connect.id, connect);
      // }
      // save to file
      // const key = CONFIG_CONNECTOR_KEY + '.' + connect.id;
      // const value = deproxyKindleConnect(connect);
      // apiManager.configApi.saveConfig(settingsStore.settingPath, key, value);
    },

    async remove(name: string) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // Todo: show confirm dialog
      // const key = CONFIG_CONNECTOR_KEY + '.' + id;
      // await apiManager.configApi.deleteConfig(settingsStore.settingPath, key);
      // this.connectors.delete(id);
      // Todo: delete all books on delete connection
    },
  }
});
