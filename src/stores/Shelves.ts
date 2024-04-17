import { defineStore } from 'pinia';
import { v4 as uuid } from 'uuid';
import { useApiManager } from 'src/stores/ApiManager';
import { useSettingsStore } from 'src/stores/Settings';
import { ShelvesStore, Shelf } from 'src/stores/ShelvesTypes';

const CONFIG_ROOT_KEY = 'bookrium';
const CONFIG_SHELVES_KEY = CONFIG_ROOT_KEY + '.shelves';

export const useShelvesStore = defineStore('shelves', {
  
  state: (): ShelvesStore => ({
    shelves: new Map(),
  }),

  getters: {
    list: (state): Shelf[] => [...state.shelves.values()],
  },

  actions: {

    // --------------------------------
    //  comoon functions
    // --------------------------------
    async init(): Promise<void> {
      await this.load();
    },

    /**
     * load store from file.
     */
    async load(): Promise<boolean> {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      if (!apiManager.configApi.hasConfig(path, CONFIG_SHELVES_KEY)) { return false; }
      const shelves = (await apiManager.configApi.loadConfig(path, CONFIG_SHELVES_KEY)) as Map<string, Shelf>;
      Object.entries(shelves).forEach(([key, value]) => this.shelves.set(key, value));
      return true;
    },

    /**
     * save store to file.
     */
    // async save() : Promise<void> {
    //   const apiManager = useApiManager();
    //   const settingsStore = useSettingsStore();
    //   const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
    //   const shelves = new Map<string, Shelf>();
    //   this.shelves.forEach((value, key) => shelves.set(key, deproxyShelf(value)));
    //   await apiManager.configApi.saveConfig(path, CONFIG_SHELVES_KEY, shelves);
    // }

    /**
     * create new Shelf. but not store.
     */
    newShelf(): Shelf {
      return {
        id: uuid(),
        name: '',
        description: '',
        books: [],
      }
    },

    /**
     * create new Shelf from already Shelf. not store.
     */
    clone(shelf: Shelf): Shelf {
      return deproxyShelf(shelf);
    },

    /**
     * check to see if it exists on store.
     */
    // has(id: string): boolean {
    //   return this.shelves.has(id);
    // },

    /**
     * get Shelf from store.
     */
    get(id: string): Shelf {
      if (this.shelves.has(id)) {
        return this.shelves.get(id) as Shelf;
      } else {
        // Todo: implements
        throw new Error('not implements');
      }
    },

    /**
     * add store and save file.
     */
    async add(shelf: Shelf) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      this.shelves.set(shelf.id, shelf);
      // update file
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      const key = CONFIG_SHELVES_KEY + '.' + shelf.id;
      const value = deproxyShelf(shelf);
      apiManager.configApi.saveConfig(path, key, value);
    },

    /**
     * update store and save file.
     */
    async update(shelf: Shelf) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      this.shelves.set(shelf.id, shelf);
      // update file
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      const key = CONFIG_SHELVES_KEY + '.' + shelf.id;
      const value = deproxyShelf(shelf);
      apiManager.configApi.saveConfig(path, key, value);
    },

    /**
     * delete from store and file.
     * @param id 
     */
    async del(id: string) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      this.shelves.delete(id);
      // update file
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      const key = CONFIG_SHELVES_KEY + '.' + id;
      await apiManager.configApi.deleteConfig(path, key);
    },
  }
});

const deproxyShelf = (shelf: Shelf): Shelf => {
  return {
    id: shelf.id,
    name: shelf.name,
    description: shelf.description,
    books: shelf.books.concat([]),
  }
}
