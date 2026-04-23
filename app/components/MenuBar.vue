<template>
  <div>
    <header
      class="sticky top-0 z-30 border-b border-zinc-200/80 bg-white/90 shadow-sm backdrop-blur-md"
    >
      <div class="mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
        <button
          v-if="loggedIn"
          type="button"
          @click="drawer = true"
          class="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-700 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-900"
          aria-label="Open menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="1.8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <div class="flex-1"></div>

        <div v-if="!loggedIn">
          <NuxtLink
            to="/login"
            class="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H9m0 0l3-3m-3 3l3 3"
              />
            </svg>

            <span class="hidden sm:inline">Login</span>
          </NuxtLink>
        </div>

        <div v-else>
          <button
            type="button"
            @click="handleLogout"
            class="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2.5 text-sm font-semibold text-zinc-800 shadow-sm transition hover:bg-zinc-50 hover:text-zinc-950"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6A2.25 2.25 0 005.25 5.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H9m0 0l3-3m-3 3l3 3"
              />
            </svg>

            <span class="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>

    <Transition name="fade">
      <div
        v-if="drawer"
        class="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm"
        @click="drawer = false"
      />
    </Transition>

    <Transition name="slide">
      <aside
        v-if="drawer"
        class="fixed left-0 top-0 z-50 h-full w-[88vw] max-w-80 border-r border-zinc-200 bg-white/95 shadow-2xl backdrop-blur-md"
      >
        <div
          class="flex items-center justify-between border-b border-zinc-100 px-5 py-4"
        >
          <div>
            <h2 class="text-lg font-semibold tracking-tight text-zinc-900">
              Menu
            </h2>
            <p class="text-sm text-zinc-500">Navigation panel</p>
          </div>

          <button
            type="button"
            @click="drawer = false"
            class="rounded-xl border border-zinc-200 p-2 text-zinc-700 transition hover:bg-zinc-50"
            aria-label="Close menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="1.8"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav class="space-y-1 p-3 sm:p-4">
          <NuxtLink
            v-for="(menu, index) in menus"
            :key="index"
            :to="menu.rota"
            class="group flex items-center rounded-2xl px-4 py-3 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950"
            @click="drawer = false"
          >
            <span
              class="mr-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 transition group-hover:bg-white group-hover:text-zinc-800"
            >
              →
            </span>
            <span>{{ menu.desc }}</span>
          </NuxtLink>
        </nav>
      </aside>
    </Transition>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const drawer = ref(false);
const menus = ref([]);

const { user, loggedIn, logout, initAuth } = useAuth();
const config = useRuntimeConfig();

const getMenu = async () => {
  try {
    const data = await $fetch("/menu/menus", {
      baseURL: config.public.apiBase,
    });
    menus.value = data;
    console.log(menus.value);
  } catch (error) {
    console.error("Error loading menu:", error);
    menus.value = [];
  }
};

const handleLogout = async () => {
  try {
    logout();
    await navigateTo("/login");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

onMounted(() => {
  initAuth();
  getMenu();
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
