<template>
  <q-toolbar>
    <q-btn dense flat round icon="menu" @click="emit('toggleLeftDrawer')" />
    <q-toolbar-title>
      bookrium
    </q-toolbar-title>
  </q-toolbar>
</template>

<script setup lang="ts">
const emit = defineEmits(['toggleLeftDrawer']);
</script>
