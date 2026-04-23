<template>
  <section
    id="login-page"
    class="min-h-screen w-full bg-gradient-to-br from-zinc-50 via-white to-slate-100 px-4 py-6 sm:px-6 lg:px-8"
  >
    <div
      class="mx-auto grid min-h-[calc(100vh-3rem)] w-full max-w-7xl grid-cols-1 items-center gap-8 lg:grid-cols-2"
    >
      <div class="hidden lg:block">
        <div class="mx-auto max-w-xl">
          <div class="mb-8">
            <img
              :src="imgLogo"
              alt="Luna logo"
              class="w-full max-w-[360px]"
              id="logo-image"
            />
          </div>

          <div class="space-y-4">
            <div
              class="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-4 py-2 text-sm text-zinc-600 shadow-sm backdrop-blur"
            >
              Admin access
            </div>

            <h1
              class="max-w-lg text-4xl font-semibold tracking-tight text-zinc-900"
            >
              Welcome back
            </h1>

            <p class="max-w-xl text-base leading-7 text-zinc-600">
              Sign in to manage products, users, reports, and the rest of your
              admin dashboard in one place.
            </p>
          </div>
        </div>
      </div>

      <div class="mx-auto flex w-full max-w-md items-center">
        <div
          class="w-full overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 shadow-2xl shadow-zinc-200/60 backdrop-blur"
        >
          <div class="border-b border-zinc-100 px-6 pb-4 pt-6 sm:px-8">
            <div class="flex flex-col items-center text-center lg:hidden">
              <img
                :src="imgLogo"
                alt="Luna logo"
                class="mb-4 w-full max-w-[220px]"
              />
            </div>

            <h2 class="text-2xl font-semibold text-zinc-900">Sign in</h2>
            <p class="mt-1 text-sm text-zinc-500">
              Enter your credentials to continue.
            </p>
          </div>

          <div class="px-6 py-6 sm:px-8">
            <form class="space-y-5" @submit.prevent="handleSubmit">
              <div>
                <label class="mb-1.5 block text-sm font-medium text-zinc-700">
                  Email
                </label>
                <div class="relative">
                  <input
                    v-model="usuInfo.email"
                    type="email"
                    placeholder="Email"
                    class="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 pr-11 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/70"
                  />
                  <span
                    class="pointer-events-none absolute inset-y-0 right-4 flex items-center text-sm font-medium text-zinc-400"
                  >
                    @
                  </span>
                </div>
                <p v-if="errors.email" class="mt-1.5 text-sm text-red-600">
                  {{ errors.email }}
                </p>
              </div>

              <div>
                <label class="mb-1.5 block text-sm font-medium text-zinc-700">
                  Password
                </label>
                <div class="relative">
                  <input
                    v-model="usuInfo.senha"
                    :type="mostrarSenha ? 'text' : 'password'"
                    placeholder="Password"
                    class="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 pr-16 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/70"
                  />
                  <button
                    type="button"
                    @click="mostrarSenha = !mostrarSenha"
                    class="absolute inset-y-1.5 right-2 flex items-center rounded-xl px-3 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-700"
                  >
                    {{ mostrarSenha ? "Hide" : "Show" }}
                  </button>
                </div>
                <p v-if="errors.senha" class="mt-1.5 text-sm text-red-600">
                  {{ errors.senha }}
                </p>
              </div>

              <div class="flex items-center justify-end">
                <button
                  type="button"
                  @click="redefinirSenha"
                  class="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                >
                  Forgot your password?
                </button>
              </div>

              <button
                type="submit"
                :disabled="!valido || loading"
                class="w-full rounded-2xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {{ loading ? "Loading..." : buttonText }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="dialog"
        class="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
        @click="dialog = false"
      />
    </Transition>

    <Transition name="scale">
      <div
        v-if="dialog"
        class="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div
          class="w-full max-w-xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl"
        >
          <div class="border-b border-zinc-100 px-6 py-5 sm:px-8">
            <h2 class="text-xl font-semibold text-zinc-900">
              Request to change password
            </h2>
            <p class="mt-1 text-sm text-zinc-500">
              We will send a password reset link to your email.
            </p>
          </div>

          <div class="px-6 py-6 sm:px-8">
            <label class="mb-1.5 block text-sm font-medium text-zinc-700">
              Insert your email
            </label>
            <input
              v-model="emailRecuperacao"
              type="email"
              class="w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/70"
              placeholder="Insert your email"
            />
            <p v-if="recoveryError" class="mt-1.5 text-sm text-red-600">
              {{ recoveryError }}
            </p>
          </div>

          <div
            class="flex flex-col-reverse gap-3 border-t border-zinc-100 px-6 py-4 sm:flex-row sm:justify-end sm:px-8"
          >
            <button
              type="button"
              @click="dialog = false"
              class="rounded-2xl border border-zinc-300 px-4 py-2.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50"
            >
              Close
            </button>

            <button
              type="button"
              :disabled="!recoveryValid || recoveryLoading"
              @click="enviarEmail"
              class="rounded-2xl bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ recoveryLoading ? "Sending..." : "Send" }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { computed, reactive, ref } from "vue";
import logo from "../../assets/logo/logoLuna.svg";

const props = defineProps({
  buttonText: {
    type: String,
    default: "Login",
  },
});

const emit = defineEmits(["submit"]);

const { showSnackbar } = useSnackbar();

const dialog = ref(false);
const loading = ref(false);
const recoveryLoading = ref(false);
const emailRecuperacao = ref("");
const mostrarSenha = ref(false);
const imgLogo = logo;

const usuInfo = reactive({
  email: "",
  senha: "",
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const errors = computed(() => {
  const currentErrors = {
    email: "",
    senha: "",
  };

  if (!usuInfo.email) {
    currentErrors.email = "Email is required";
  } else if (!emailRegex.test(usuInfo.email)) {
    currentErrors.email = "Invalid email format";
  }

  if (!usuInfo.senha) {
    currentErrors.senha = "Password is required";
  }

  return currentErrors;
});

const valido = computed(() => {
  return !errors.value.email && !errors.value.senha;
});

const recoveryError = computed(() => {
  if (!emailRecuperacao.value) {
    return "Email is required";
  }

  if (!emailRegex.test(emailRecuperacao.value)) {
    return "Invalid email format";
  }

  return "";
});

const recoveryValid = computed(() => !recoveryError.value);

const redefinirSenha = () => {
  dialog.value = true;
};

const handleSubmit = async () => {
  if (!valido.value) return;

  loading.value = true;
  try {
    await emit("submit", {
      email: usuInfo.email,
      senha: usuInfo.senha,
    });
  } finally {
    loading.value = false;
  }
};

const enviarEmail = async () => {
  if (!recoveryValid.value) return;

  recoveryLoading.value = true;

  try {
    await $fetch("/usuario/esqueceu_senha", {
      method: "POST",
      body: {
        email: emailRecuperacao.value,
      },
    });

    showSnackbar({
      message: "Recovery email sent successfully",
      color: "success",
      timeout: 2500,
    });

    dialog.value = false;
    emailRecuperacao.value = "";
  } catch (error) {
    const errorMessage =
      error?.data?.message ||
      error?.response?._data?.message ||
      error?.response?.data?.message ||
      "Error sending recovery email";

    showSnackbar({
      message: errorMessage,
      color: "error",
      timeout: 2500,
    });
  } finally {
    recoveryLoading.value = false;
  }
};
</script>

<style scoped>
#login-page {
  width: 100%;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.scale-enter-active,
.scale-leave-active {
  transition: all 0.2s ease;
}

.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
</style>
