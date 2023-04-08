<template>
  <q-list>
    <q-item clickable to="/home">
      <q-item-section avatar>
        <q-icon name="mdi-home-outline" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Home </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable to="/books">
      <q-item-section avatar>
        <q-icon name="eva-book-outline" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Books </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/shelf">
      <q-item-section avatar>
        <q-icon name="mdi-bookshelf" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Shelf </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/labels">
      <q-item-section avatar>
        <q-icon name="mdi-bookmark-outline" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Labels </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable to="/connects">
      <q-item-section avatar>
        <q-icon name="mdi-link" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Connects </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/settings">
      <q-item-section avatar>
        <q-icon name="mdi-cog-outline" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Settings </q-item-label>
      </q-item-section>
    </q-item>

  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
});
</script>
