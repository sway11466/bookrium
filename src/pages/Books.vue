<template>
  <q-page>
    <q-list>
      <template v-for="book in books.all" :key="book.id">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-img :src="book.image" fit="fill" />
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

<script lang="ts">
import { defineComponent } from 'vue';
import { useBooksStore } from 'src/stores/Books.js';

export default defineComponent({
  name: 'ConnectsPage',
  components: { },
  setup () {
    const books = useBooksStore();
    books.fillSample()
    return { books };
  }
});
</script>
