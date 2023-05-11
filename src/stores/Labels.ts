import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useSettingsStore } from 'src/stores/Settings';
import { Label, LabelsStore, TreedLabel } from 'src/stores/LabelTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_LABEL_KEY = CONFIG_ROOT_KEY + '.labels';

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
    },

    async loadAllConnects(): Promise<boolean> {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      const path = apiManager.path.join(settingsStore.storage.labelFolderPath, 'labels.json');
      if (!apiManager.configApi.hasConfig(path)) { return false; }
      const labels = (await apiManager.configApi.loadConfig(path, CONFIG_LABEL_KEY)) as Map<string, Label>;
      Object.entries(labels).forEach(([key, value]) => this.labels.set(key, value));
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
      const path = apiManager.path.join(settingsStore.storage.labelFolderPath, 'labels.json');
      const key = CONFIG_LABEL_KEY + '.' + label.id;
      const value = deproxyLabel(label);
      apiManager.configApi.saveConfig(path, key, value);
    },

    async update(label: Label) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      //   No need. Because it has already been updated.
      const path = apiManager.path.join(settingsStore.storage.labelFolderPath, 'labels.json');
      const key = CONFIG_LABEL_KEY + '.' + label.id;
      const value = deproxyLabel(label);
      apiManager.configApi.saveConfig(path, key, value);
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
      const path = apiManager.path.join(settingsStore.storage.labelFolderPath, 'labels.json');
      const key = CONFIG_LABEL_KEY + '.' + id;
      await apiManager.configApi.deleteConfig(path, key);
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
