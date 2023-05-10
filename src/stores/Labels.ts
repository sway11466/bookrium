import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
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
      this.list.forEach(label => index.set(label.id, {...label, children:[]}));
      // create tree
      const tree = [] as TreedLabel[];
      [...index.values()].forEach(label => {
        if (label.parent_id) {
          index.get(label.parent_id)?.children.push(label); //Todo: remove ?
        } else {
          tree.push(label);
        }
      });
      return tree;
    },
    names(): string[]  {
      return this.list.map(label => label.name);
    },
  },

  actions: {
    // --------------------------------
    //  comoon functions
    // --------------------------------
    async init(): Promise<void> {
      await this.loadAllConnects();
      this.labels.set("1", { id: '1', name: 'root1', fore_color: '', back_color:'', parent_id: null, count: 12, createdAt: new Date(), });
      this.labels.set("2", { id: '2', name: 'hoge', fore_color: '', back_color:'', parent_id: '1', count: 29, createdAt: new Date(), });
      this.labels.set("3", { id: '3', name: 'piyo', fore_color: '', back_color:'', parent_id: '1', count: 32, createdAt: new Date(), });
      this.labels.set("4", { id: '4', name: 'poke', fore_color: '', back_color:'', parent_id: '3', count: 4, createdAt: new Date(), });
      this.labels.set("5", { id: '5', name: 'root2', fore_color: '', back_color:'', parent_id: null, count: 53, createdAt: new Date(), });
      this.labels.set("6", { id: '6', name: 'foo', fore_color: '', back_color:'', parent_id: '5', count: 16, createdAt: new Date(), });
      this.labels.set("7", { id: '7', name: 'bar', fore_color: '', back_color:'', parent_id: '5', count: 47, createdAt: new Date(), });
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
        id: uuid(),
        name: '',
        fore_color: '#000000',
        back_color: '#BBBBBB',
        parent_id: null,
        count: 0,
        createdAt: new Date(),
      }
    },

    get(id: string): Label {
      if (this.labels.has(id)) {
        return this.labels.get(id) as Label
      } else {
        // Todo: implements
        throw new Error('not implements');
      }
    },

    async add(label: Label) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // add store
      this.labels.set(label.id, label);
      // TODO: save to file
      // const path = apiManager.path.join(settingsStore.settingPath, 'labels');
      // const key = CONFIG_CONNECTOR_KEY + '.' + label.id;
      // const value = deproxyLabel(label);
      // apiManager.configApi.saveConfig(path, key, value);
    },

    async update(label: Label) {
      // update store
      //   No need. Because it has already been updated.
      // TODO: save to file
    },

    async del(id: string) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // pick up child label
      const new_parent_id = (this.labels.get(id) as Label).parent_id;
      this.list.forEach(label => {
        if (label.parent_id === id) { label.parent_id = new_parent_id; }
      })
      // delete from store
      this.labels.delete(id);
      // TODO: delete from file
      // const path = apiManager.path.join(settingsStore.settingPath, 'labels');
      // const key = CONFIG_CONNECTOR_KEY + '.' + label.id;
      // const value = deproxyLabel(label);
      // await apiManager.configApi.deleteConfig(path, key);
    },
  }
});

const deproxyLabel = (label: Label): Label => {
  return {
    id: label.id,
    name: label.name,
    fore_color: label.fore_color,
    back_color: label.back_color,
    parent_id: label.parent_id,
    count: label.count,
    createdAt: label.createdAt,
  }
}
