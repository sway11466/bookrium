<template>
  <q-item @click="edit(connect.id)" clickable v-ripple>
    <q-item-section avatar>
      <q-img src="kindle-48x48.svg" width="48px" />
    </q-item-section>
    <q-item-section>
      <q-item-label>
        Amazon Kindle
      </q-item-label>
      <q-item-label caption>{{ connect.extends.email }}</q-item-label>
    </q-item-section>
    <q-item-section side>
      <template v-if="connect.state.collect === 'collecting'">
        <q-spinner color="primary" size="2em" />
      </template>
      <template v-if="connect.bookCount > 0">
        <q-badge :label="connect.bookCount" />
      </template>
    </q-item-section>
  </q-item>
</template>

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
