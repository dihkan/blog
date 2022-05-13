<template>
  <div class="h-full bg-zinc-500 w-4/5">
    <div
      class="my-20 p-4 w-4/5 h-3/5 rounded-xl mx-auto bg-sky-700 text-slate-900 border-4 border-zinc-50 shadow-2xl"
    >
      <h2 class="text-4xl">Hızlı Yazma Egzersizleri</h2>
      <p class="py-6">
        Klavye Hızınızı Test Edebilirsiniz...Süreniz mavi kutucukta yazmaktadır.
      </p>
      <div class="fixed left-1/2 bottom-2">
        <button
          class="bg-sky-700 h-full mx-2 border-2 border-zinc-50 text-white rounded-full p-20 text-8xl"
          disabled
        >
          {{ timer }}
        </button>
      </div>
      <div
        class="status bg-light mb-3 fs-5 d-flex justify-content-between align-content-center"
      >
        <div class="mesaj">
          Doğru Kelime Sayısı : {{ trueCount }} - Yanlış Kelime Sayısı :
          {{ falseCount }}
        </div>
        <div>
          <button
            class="w-full p-3 bg-sky-700 text-slate-50 font-bold"
            type="button"
            @click="yenile"
          >
            Yenile
          </button>
        </div>
      </div>
      <div v-if="!isFinished" class="flex-wrap">
        <div class="my-2 w-full">
          <div class="bg-neutral-300 p-4 rounded-md text-black flex flex-wrap">
            <span
              v-for="(k, i) in state.kelime.filter((data, index) => index < 15)"
              :key="i"
              :class="i != 0 || classControl"
              class="m-2 text-3xl font-normal"
            >
              {{ k }}
            </span>
          </div>
        </div>

        <div class="card">
          <div class="card-body bg-secondary">
            <div class="input-group input-group-lg flex my-10">
              <input
                type="text"
                class="w-full block bg-zinc-200 py-3 px-3 rounded-md focus:outline-2"
                placeholder="Start Typing"
                v-model="writed"
                @keydown="isStarted != true ? startTimer() : ''"
                @keydown.enter="bittiMi"
              />
              <div class="input-group-append" id="button-addon4">
                <button
                  class="w-20 bg-sky-700 h-full mx-2 text-white border-zinc-50 border-2 rounded-md"
                  disabled
                >
                  {{ timer }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>SÜRE TAMAMLANDI</h1>
      </div>
    </div>
  </div>
</template>
<script setup>
import { reactive, watch, ref, onMounted } from "vue";
import kelimeler from "../assets/data.json";
const state = reactive({
  kelime: []
});

let isTrue = ref(1);
const classControl = ref("");
const trueCount = ref(0);
const falseCount = ref(0);
const timer = ref(60);

const isStarted = ref(false);
const isFinished = ref(false);

// onMounted
onMounted(() => {
  state.kelime = kelimeler.sort(() => Math.random() - 0.5).splice(0, 250);
});
const writed = ref("");

// watch
watch(writed, newV => {
  if (isStarted) {
    let lastNew = newV.replace(" ", "");
    if (state.kelime[0].slice(0, newV.length) === lastNew) {
      isTrue = 1;
    } else {
      isTrue = 0;
    }
    classControl.value =
      isTrue == 1
        ? "rounded-md p-2 bg-green-100"
        : "rounded-md  p-2 bg-rose-600";
    if (newV.indexOf(" ") !== -1) {
      isTrue == 1 ? trueCount.value++ : falseCount.value++;
      state.kelime.splice(0, 1);
      writed.value = "";
    }
  }
});

// methods

const bittiMi = () => {
  if (state.kelime[0] === writed.value) {
    isTrue = 1;
  } else {
    isTrue = 0;
  }
  classControl.value = isTrue == 1 ? "wordClass" : "wordClass bg-danger";
  isTrue == 1 ? trueCount.value++ : falseCount.value++;
  state.kelime.splice(0, 1);
  writed.value = "";
};
const startTimer = () => {
  isStarted.value = true;

  setInterval(() => {
    if (timer.value != 0) {
      timer.value--;
    } else {
      clearInterval();
      isFinished.value = true;
    }
  }, 1000);
};
const yenile = () => {
  location.reload();
};
</script>

<style scoped>
.lead {
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
}

.cervceve {
  background-color: #111;
}
.mesaj {
  height: 45px;
  line-height: 45px;
}
</style>
