<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-white text-black">
      <q-toolbar>
        <q-btn @click="goToAbout" icon="info" />
        <q-toolbar-title class="text-center"> explorenote-app </q-toolbar-title>
        <q-btn @click="toggleApi" icon="swap_horiz" />
        <q-btn @click="toggleDarkMode" icon="contrast" />
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-footer elevated class="bg-white text-black">
      <q-tabs class="q-pa-sm" active-color="black" indicator-color="black" align-tabs="justify">
        <q-route-tab to="/" icon="travel_explore" />
        <q-route-tab to="/explore" icon="add_circle" />
        <q-route-tab to="/connections" icon="chat" />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { QFooter, QTabs } from 'quasar'
import { useQuasar } from 'quasar'
import { toggleApi } from '@/apis/explorenoteapi'

const router = useRouter()
const $q = useQuasar()
function toggleDarkMode() {
  $q.dark.toggle()
}
function goToAbout() {
  router.push({ name: 'AboutView' })
}
</script>

<style scoped>
/* Additional styling if needed */
</style>
