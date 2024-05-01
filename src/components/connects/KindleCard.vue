<template>
  <q-card @click="edit(connect.id)" flat bordered>
    <q-item class="q-pa-sm">
      <q-item-section side>
        <q-img src="kindle-48x48.svg" width="96px" />
      </q-item-section>
      <q-item-section>
        <q-item-label>Amazon Kindle</q-item-label>
        <q-item-label caption>{{ connect.extends.email }}</q-item-label>
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
import { KindleConnect } from 'src/stores/ConnectTypes';

const props = defineProps({
  id: {
    type: String,
    required: true,
  }
});

const connects = useConnectsStore();
const connect: Ref<KindleConnect> = ref(connects.get(props.id) as KindleConnect);

const router = useRouter();
function edit(id: string) {
  router.push(`/connects/${id}`);
}
</script>
