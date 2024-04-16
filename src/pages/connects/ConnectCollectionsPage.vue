<template>
  <q-page class="col">
    <ConnectCollections />
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab @click="add" round padding="xs">
        <q-avatar square>
          <q-img src="add-link-cuteui-64x64.png" no-spinner />
        </q-avatar>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import ConnectCollections from 'src/components/connects/ConnectCollections.vue';
import { useConnectsStore } from 'src/stores/Connects';
const connects = useConnectsStore();
connects.init();
const router = useRouter();
function add() {
  router.push('/connects/new');
}
</script>
