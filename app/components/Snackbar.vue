<template>
  <Transition name="snackbar">
    <div
      v-if="snackbar.show"
      class="fixed bottom-4 right-4 z-[9999] w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-2xl border border-white/10 px-4 py-3 text-sm text-white shadow-[0_20px_50px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md sm:bottom-6 sm:right-6 sm:w-full"
      :class="colorClass"
    >
      <div class="flex items-start gap-3">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <div
            class="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full bg-white/80"
          ></div>

          <span class="flex-1 break-words pr-1 font-medium leading-5">
            {{ snackbar.message }}
          </span>
        </div>

        <button
          type="button"
          @click="closeSnackbar"
          class="shrink-0 rounded-xl border border-white/15 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
        >
          Close
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { computed, watch } from "vue";

const snackbar = useState("snackbar", () => ({
  show: false,
  message: "",
  color: "success",
  timeout: 3000,
}));

let timer = null;

const colorClass = computed(() => {
  switch (snackbar.value.color) {
    case "error":
      return "bg-red-600";
    case "warning":
      return "bg-yellow-500 text-black";
    case "info":
      return "bg-blue-600";
    case "success":
    default:
      return "bg-green-600";
  }
});

const closeSnackbar = () => {
  snackbar.value.show = false;

  if (timer) {
    clearTimeout(timer);
    timer = null;
  }
};

watch(
  () => snackbar.value.show,
  (isVisible) => {
    if (!isVisible) return;

    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    if (snackbar.value.timeout !== -1) {
      timer = setTimeout(() => {
        snackbar.value.show = false;
        timer = null;
      }, snackbar.value.timeout);
    }
  },
);
</script>

<style scoped>
.snackbar-enter-active,
.snackbar-leave-active {
  transition: all 0.25s ease;
}

.snackbar-enter-from,
.snackbar-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
