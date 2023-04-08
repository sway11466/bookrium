<template>
  <q-page>
    <q-list>
      <q-expansion-item expand-separator icon="mdi-file-cog-outline" label="Application Settings">
        <q-list class="q-ml-md">
          <q-item clickable @click="test">
            <q-item-section>
              <q-item-label>
                <q-input outlined v-model="settings.settingFilePath" label="Application Config File Path" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-expansion-item>
      <q-separator />
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useSettingsStore } from 'src/stores/Settings.js';

function useTest() {
  async function test() {
    await window.native.saveConfig({a: 'yes', b: 'no'});
    const message = await window.native.loadConfig();
    console.log(message);
  }
  return { test };
}

export default defineComponent({
  name: 'ConnectsPage',
  components: { },
  setup () {
    const settings = useSettingsStore();
    return { ...useTest(), settings };
  }
});
</script>
