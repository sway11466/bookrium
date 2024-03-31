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
      await this.loadShelves();
    },

    async loadShelves(): Promise<boolean> {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      if (!apiManager.configApi.hasConfig(path)) { return false; }
      const shelves = (await apiManager.configApi.loadConfig(path, CONFIG_SHELVES_KEY)) as Map<string, Shelf>;
      Object.entries(shelves).forEach(([key, value]) => this.shelves.set(key, value));
      return true;
    },

    newShelf(): Shelf {
      return {
        id: uuid(),
        name: '',
        description: '',
        books: [],
      }
    },

    get(id: string): Shelf {
      if (this.shelves.has(id)) {
        return this.shelves.get(id) as Shelf
      } else {
        // Todo: implements
        throw new Error('not implements');
      }
    },

    /**
     * add store and update file.
     * @param shelf
     */
    async add(shelf: Shelf) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      this.shelves.set(shelf.id, shelf);
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      const key = CONFIG_SHELVES_KEY + '.' + shelf.id;
      const value = deproxyShelf(shelf);
console.log(value);
      apiManager.configApi.saveConfig(path, key, value);
    },

    /**
     * update store and file.
     * @param shelf
     */
    async update(shelf: Shelf) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      // update store
      //   No need. Because it has already been updated.
      const path = apiManager.path.join(settingsStore.storage.shelvesFolderPath, 'shelves.json');
      const key = CONFIG_SHELVES_KEY + '.' + shelf.id;
      const value = deproxyShelf(shelf);
      apiManager.configApi.saveConfig(path, key, value);
    },

    /**
     * delete from file and update file.
     * @param id 
     */
    async del(id: string) {
      const apiManager = useApiManager();
      const settingsStore = useSettingsStore();
      this.shelves.delete(id);
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
