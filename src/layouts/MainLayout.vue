<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <router-view name="header" @toggleLeftDrawer="toggleLeftDrawer"/>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" behavior="desktop" bordered>
      <SlideMenu />
    </q-drawer>

    <q-page-container>
      <router-view name="page" />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SlideMenu from 'components/SlideMenu.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    SlideMenu
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
});
</script>
