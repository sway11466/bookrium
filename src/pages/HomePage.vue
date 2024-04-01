<template>
  <ApiManager />
  <q-page>
    <q-list>
      <q-item-label class="q-pb-none" header>Books</q-item-label>
      <q-item>
        <BookSlide />
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup lang="ts">
import ApiManager from 'src/components/api/ApiManager.vue';
import BookSlide from 'src/components/home/BookSlide.vue';
</script>
