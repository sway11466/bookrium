<template>
  <q-page>
    <q-list>
      <template v-for="book in books.display" :key="book.id">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img :src="book.image.toString()" fit="fill" />
          </q-item-section>
          <q-item-section>
            <q-item-label>{{book.title}}</q-item-label>
            <q-item-label caption>{{book.author}}</q-item-label>
          </q-item-section>
        </q-item>
        <q-separator />
      </template>
    </q-list>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn fab icon="add" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script setup lang="ts">
import { useBooksStore } from 'src/stores/Books.js';

const books = useBooksStore();
books.fillSample()
</script>
