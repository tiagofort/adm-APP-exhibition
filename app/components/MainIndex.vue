<template>
  <section
    class="mt-1 w-full bg-gradient-to-br from-zinc-50 via-white to-cyan-50/30 px-4 py-8 sm:px-6 lg:px-8"
    id="login-page"
  >
    <div class="mx-auto grid max-w-7xl grid-cols-12">
      <div class="hidden sm:col-span-2 sm:block"></div>

      <div class="col-span-12 sm:col-span-8 self-center">
        <div
          class="flex min-h-[70vh] flex-col items-center justify-center rounded-3xl border border-white/60 bg-white/90 px-6 py-10 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm sm:px-10"
        >
          <div class="mb-8">
            <img
              :src="logoLuna"
              alt="Luna logo"
              class="mx-auto w-full max-w-[220px] sm:max-w-[280px] lg:max-w-[350px] drop-shadow-sm"
            />
          </div>

          <div class="mx-auto max-w-2xl space-y-4">
            <div class="welcome">
              <span
                class="text-base font-semibold uppercase tracking-[0.18em] text-zinc-800 sm:text-lg"
              >
                Welcome to the Luna Crystals Admin Page
              </span>
            </div>

            <div v-if="loggedIn" class="welcome">
              <div
                class="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm sm:text-base"
              >
                {{ fullName }} YOU ARE LOGGED IN
              </div>
            </div>

            <div v-else class="welcome">
              <div
                class="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 shadow-sm sm:text-base"
              >
                YOU ARE NOT LOGGED IN
              </div>
            </div>

            <div v-if="!loggedIn" class="welcome mt-4">
              <NuxtLink
                to="/login"
                class="inline-flex items-center justify-center rounded-2xl bg-zinc-900 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-300 sm:text-base"
              >
                Login
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <div class="hidden sm:col-span-2 sm:block"></div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import logoLuna from "../assets/logo/logoLuna.svg";

const { user, loggedIn, initAuth } = useAuth();

const quote = ref({
  content: "",
  author: "",
});

const fullName = computed(() => {
  const firstName = user.value?.nome?.toUpperCase?.() || "";
  const lastName = user.value?.sobrenome?.toUpperCase?.() || "";
  return `${firstName} ${lastName}`.trim();
});

onMounted(() => {
  initAuth();
});
</script>

<style scoped>
#login-page {
  margin-top: 10px;
}

.welcome {
  display: flex;
  justify-content: center;
  font-family: Monaco, monospace;
  font-size: 18px;
}
</style>
