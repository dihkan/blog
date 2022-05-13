<template>
  <div class="flex min-h-full">
    <navBar></navBar>
    <div class="bg-sky-700 w-0.5"></div>
    <router-view></router-view>
  </div>
</template>
<script setup>
import navBar from "./components/navBar.vue";
</script>
