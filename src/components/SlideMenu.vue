<template>
  <q-list>
    <q-item clickable to="/home">
      <q-item-section avatar>
        <q-img src="home-80x80.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Home </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable to="/books">
      <q-item-section avatar>
        <q-img src="book-80x80.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Books </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/shelf">
      <q-item-section avatar>
        <q-img src="shelf-80x80.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Shelf </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/labels">
      <q-item-section avatar>
        <q-img src="tag-80x80.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Labels </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable to="/connects">
      <q-item-section avatar>
        <q-img src="connection-80x80.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Connects </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/settings">
      <q-item-section avatar>
        <q-img src="setting-80x80.png" />
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
