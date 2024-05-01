<template>
  <q-card @click="edit(connect.id)" flat bordered>
    <q-item class="q-pa-sm">
      <q-item-section side>
        <q-img src="img-folder.svg" width="96px" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Image Folder (Local Storage)</q-item-label>
        <q-item-label caption>{{ connect.extends.path }}</q-item-label>
        <q-separator class="q-my-sm" />
        <q-item-label caption>
          <q-badge :label="connect.bookCount" /> books collected.
        </q-item-label>
        <q-item-label caption>
          9999/99/99
        </q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<style scoped>
.q-card {
  width: 32em;
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { ref, Ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConnectsStore } from 'src/stores/Connects';
import { ImgDirLocalStorageConnect } from 'src/stores/ConnectTypes';

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const connects = useConnectsStore();
const connect: Ref<ImgDirLocalStorageConnect> = ref(connects.get(props.id) as ImgDirLocalStorageConnect);

const router = useRouter();
function edit(id: string) {
  router.push(`/connects/${id}`);
}
</script>
