<template>
  <q-list>

    <q-expansion-item expand-separator>
      <template v-slot:header>
        <q-item-section avatar>
          <q-avatar size="md"><img src="show-book-cuteui-64x64.png" /></q-avatar>
        </q-item-section>
        <q-item-section>
          Book Read Setting
        </q-item-section>
      </template>
      <q-list class="q-ml-md">
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-avatar size="md"><img src="kindle-48x48.svg" /></q-avatar>
              Kindle Reading App
            </q-item-label>
            <q-item-label>
              <q-radio v-model="kindleShowapp" val="builtin" label="built-in browser (Chrome)" class="q-pl-lg" />
              <q-radio v-model="kindleShowapp" val="os" label="os default app" class="q-pl-lg" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <q-avatar size="md"><img src="pdf-47x47.png" /></q-avatar>
              PDF Reading App
            </q-item-label>
            <q-item-label>
              <q-radio v-model="pdfShowapp" val="builtin" label="built-in browser (Chrome)" class="q-pl-lg" />
              <q-radio v-model="pdfShowapp" val="os" label="os default app" class="q-pl-lg" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-separator />

    <q-expansion-item expand-separator icon="mdi-database-outline" label="Strage Settings">
      <q-list class="q-ml-md">
        <q-item>
          <q-item-section>
            <q-item-label>Setting File Path</q-item-label>
            <q-item-label caption>It is now for display only and cannot be changed.</q-item-label>
            <q-item-label>
              <q-input readonly v-model="settingFilePath" outlined dense>
                <template v-slot:append>
                  <q-btn icon="mdi-folder-settings" @click="selectDataFolderPath" round unelevated />
                </template>
              </q-input>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>Data Folder Path</q-item-label>
            <q-item-label caption>It is now for display only and cannot be changed.</q-item-label>
            <q-item-label>
              <q-input readonly v-model="dataFolderPath" outlined dense>
                <template v-slot:append>
                  <q-btn icon="mdi-folder-settings" @click="selectDataFolderPath" round unelevated />
                </template>
              </q-input>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-separator />

    <q-expansion-item expand-separator icon="mdi-information-outline" label="About">
      <q-list class="q-ml-md">
        <q-item>
          <q-item-section>
            <q-item-label>Application Version</q-item-label>
            <q-item-label>
              <q-input readonly v-model="store.version" outlined dense />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>licenses</q-item-label>
            <q-item-label>
              <ul>
                <li>icon by <a target="_blank" href="https://icons8.com">Icons8</a></li>
              </ul>
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
    <q-separator />

  </q-list>

  <template v-if="changed">
    <q-page-sticky position="bottom" :offset="[0, 0]">
      <q-item>
        <q-btn @click="reset" color="primary" class="q-mx-lg" padding="xs xl" no-caps outline>Reset</q-btn>
        <q-btn @click="save" color="primary" class="q-mx-lg" padding="xs xl" no-caps>Save</q-btn>
      </q-item>
    </q-page-sticky>
  </template>
</template>

<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue';
import { useSettingsStore } from 'src/stores/Settings.js';
import { ShowAppType } from 'src/stores/SettingTypes';

// --------------------------------
//  store init
// --------------------------------
const store = useSettingsStore();

// --------------------------------
//  edit control
// --------------------------------
const kindleShowapp: Ref<ShowAppType> = ref('builtin');
const pdfShowapp: Ref<ShowAppType> = ref('builtin');
const settingFilePath: Ref<string> = ref('');
const dataFolderPath: Ref<string> = ref('');

onMounted(() => {
  load();
});

function load() {
  kindleShowapp.value = store.showapp.kindle;
  pdfShowapp.value = store.showapp.pdf;
  settingFilePath.value = store.settingPath;
  dataFolderPath.value = store.storage.dataFolderPath;
};

const changed = computed(() => {
  return (
    (kindleShowapp.value != store.showapp.kindle) ||
    (pdfShowapp.value != store.showapp.pdf) ||
    (settingFilePath.value != store.settingPath) ||
    (dataFolderPath.value != store.storage.dataFolderPath)
  );
})

function reset() {
  if (!changed.value) { return; }
  // Todo: confirm dialog.
  load();
};

function save() {
  if (!changed.value) { return; }
  store.update({
    settingPath: settingFilePath.value,
    storage: {
      dataFolderPath: dataFolderPath.value,
    },
    showapp: {
      kindle: kindleShowapp.value,
      pdf: pdfShowapp.value,
    }
  });
};

// --------------------------------
//  
// --------------------------------
async function selectDataFolderPath () {
  console.log('not implements.');
  // const { canceled, filePaths } = await settings.selectFolder();
  // if (canceled) { return }
  // bookriumSetting.value.storageSetting.dataFolderPath = filePaths[0];
}
</script>
