<template>
  <div class="deneme w-5/6 mt-0 bg-sky-700 h-full">
    <div class="dikCizgi" :style="`--position:${clientX}`"></div>
    <div class="headline w-5/6 ml-64 mt-10">
      <h1 class="text-4xl">Currency</h1>
      <!-- <li v-for="(item, i) in store.kurlar[0]" :key="i"> --><br />
      <p class="baslik">
        {{ tarih }}
      </p>
      <br />
      <p class="baslik">1 $ = {{ kur }} ₺</p>
      <!-- </li> -->
    </div>
    <div class="sparkline" @mousemove="coord"></div>
  </div>
</template>

<script setup>
import { onMounted, reactive, watch, ref } from "vue";

import axios from "axios";
import Sparkline from "sparklines";

const newLocal = "https://netorganizasyon.net/doviz/";
const store = reactive({
  kurlar: [],
  index: 0,
  currency: [],
});
const currentIndex = ref(0);
const tarih = ref();
const clientX = ref(0);
const kur = ref(0.0);

onMounted(async () => {
  const div = document.querySelector(".sparkline");
  await axios
    .get(newLocal)
    .then((res) => {
      store.kurlar = [...res.data];
    })
    .catch((err) => {
      console.log(err);
    });
  let canvas = new Sparkline(div, {
    width: window.innerWidth - window.innerWidth / 6,
    height: window.innerHeight - 200,
    minValue: 0,
    maxValue: 20,
    dotRadius: 7,
    minColor: "green",
    maxColor: "red",
  });

  canvas.draw(yaz());
});

const yaz = () => {
  store.kurlar.forEach((kur, i) => {
    store.currency = [...store.currency, parseFloat(kur.dolarAlis)];
  });
  return store.currency;
};
watch(currentIndex, (newV) => {
  tarih.value = JSON.stringify(store.kurlar[newV].kurTarihi);
  kur.value = JSON.stringify(store.kurlar[newV].dolarSatis);
});
const coord = (e) => {
  const percent =
    ((e.clientX - window.innerWidth / 6) /
      (window.innerWidth - window.innerWidth / 6 - 3)) *
    100;
  currentIndex.value = Math.ceil((percent * store.kurlar.length) / 100);
  store.index = currentIndex.value > 0 ? currentIndex.value - 1 : 0;
  clientX.value = e.clientX - window.innerWidth / 6 + "px";
};
</script>
<style scope>
.headline {
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
h1 {
  font-size: 4em;
  color: azure;
}
.sparkline {
  height: 50%;
}
.deneme .dikCizgi {
  position: absolute;
  top: 0px;
  left: 0px;
  width: 1px;
  height: 100%;
  background-color: red;
  transform: translateX(var(--position));
}
.deneme {
  display: flex;
  flex-direction: column;
  height: 100%;
  position: relative;
}

.baslik {
  font-size: 2em;
  color: aliceblue;
}
</style>
