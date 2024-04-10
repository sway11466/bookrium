<template>
  <q-layout view="hHh LpR fFf">

    <q-header elevated class="bg-primary text-white">
      <router-view name="header" />
    </q-header>

    <q-page-container>
      <router-view name="page" />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
</script>
