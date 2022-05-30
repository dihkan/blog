<template>
  <div
    class="bg-zinc-900 p-5 text-zinc-900 w-1/6 min-h-full flex-col divide-x-4 border-sky-50"
  >
    <div class="flex items-start justify-center w-full pt-2">
      <img src="../assets/img/ihsan.jpeg" class="rounded-full w-48" alt="" />
    </div>
    <router-link to="/" tag="li" :class="linkClasses">
      <a href="#" class="aClasses">
        <el-icon size="20px"><HomeFilled /></el-icon> Ana Sayfa
      </a></router-link
    >
    <router-link to="/fastTyping" :class="linkClasses">
      <a href="#" class="aClasses">
        <el-icon size="20px"><Promotion /></el-icon>
        Fast Typing</a
      >
    </router-link>
    <router-link to="/currency" :class="linkClasses">
      <a href="#" :class="aClasses">
        <el-icon size="20px"><TrendCharts /></el-icon>
        Currency</a
      >
    </router-link>
  </div>
</template>

<script setup>
import { ref } from "vue";
const linkClasses = ref("w-full bg-sky-700 inline-block p-3 mt-6 rounded-md");
const aClasses = ref("mt-5  font-bold");
</script>

<style scoped></style>
