<template>
  <q-list>
    <q-item clickable to="/home">
      <q-item-section avatar>
        <q-img src="home-cuteui-64x64.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Home </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable to="/books">
      <q-item-section avatar>
        <q-img src="books-cuteui-64x64.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Books </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/shelves">
      <q-item-section avatar>
        <q-img src="shelf-cuteui-64x64.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Shelf </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/labels">
      <q-item-section avatar>
        <q-img src="label-cuteui-64x64.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Labels </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-item clickable to="/connects">
      <q-item-section avatar>
        <q-img src="connection-cuteui-64x64.png" />
      </q-item-section>
      <q-item-section>
        <q-item-label> Connects </q-item-label>
      </q-item-section>
    </q-item>

    <q-item clickable to="/settings">
      <q-item-section avatar>
        <q-img src="setting-cuteui-64x64.png" />
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
