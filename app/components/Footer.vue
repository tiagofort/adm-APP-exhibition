<template>
  <footer class="border-t border-zinc-800 bg-zinc-950 text-white">
    <div class="border-b border-zinc-800 bg-zinc-900/80 backdrop-blur-sm">
      <div
        class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center sm:flex-row sm:text-left"
      >
        <div class="space-y-1">
          <p class="text-sm font-semibold tracking-wide text-white">
            Get connected with us
          </p>
          <p class="text-sm text-zinc-400">
            Follow Luna on social networks for updates and inspiration.
          </p>
        </div>

        <button
          type="button"
          @click="abrirInsta"
          class="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-zinc-700 bg-white/5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-pink-400/40 hover:bg-white/10"
          aria-label="Open Luna Instagram"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.88 1.12a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z"
            />
          </svg>
        </button>
      </div>
    </div>

    <div class="mx-auto max-w-7xl px-4 py-5">
      <div
        class="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left"
      >
        <p class="text-sm text-zinc-300">
          <span class="text-zinc-500">{{ currentYear }} — </span>
          <strong class="font-semibold text-white">
            Webdesigner ©Tiago Fortaleza Gai
          </strong>
        </p>

        <button
          type="button"
          @click="abrirInstaDeveloper"
          class="inline-flex items-center gap-2 rounded-full border border-zinc-700 bg-white/5 px-3 py-2 text-sm text-zinc-300 transition duration-200 hover:border-zinc-500 hover:bg-white/10 hover:text-white"
          aria-label="Open developer Instagram"
        >
          <span>Developer</span>

          <span
            class="inline-flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm8.88 1.12a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Z"
              />
            </svg>
          </span>
        </button>
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();

const abrirInsta = () => {
  window.open(
    "https://www.instagram.com/lunapedraria.ie/?igshid=YmMyMTA2M2Y%3D",
    "_blank",
  );
};

const abrirInstaDeveloper = () => {
  window.open("https://www.instagram.com/tiagofort/", "_blank");
};
</script>
