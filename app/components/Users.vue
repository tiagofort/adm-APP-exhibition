<template>
  <div class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div
      v-if="overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm"
    >
      <div
        class="h-16 w-16 animate-spin rounded-full border-4 border-white/25 border-t-white shadow-lg"
      ></div>
    </div>

    <BanerBlock v-if="!isLoggedIn" />

    <div v-if="isLoggedIn" class="grid gap-6 xl:grid-cols-2">
      <div>
        <div
          class="rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.22)] sm:p-6"
        >
          <div class="mb-6">
            <h2 class="text-xl font-semibold tracking-tight text-slate-900">
              New User
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Create a new user account with a clean and secure form.
            </p>
          </div>

          <div class="space-y-4">
            <input
              v-model="nome"
              placeholder="First name"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
            <input
              v-model="sobrenome"
              placeholder="Last name"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
            <input
              v-model="usuario"
              placeholder="User"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />
            <input
              v-model="email"
              placeholder="Email"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

            <div class="relative">
              <input
                :type="mostrarSenhar ? 'text' : 'password'"
                v-model="senha"
                placeholder="Password"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 pr-12 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
              <button
                type="button"
                class="absolute right-3 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                @click="mostrarSenhar = !mostrarSenhar"
              >
                👁
              </button>
            </div>

            <input
              :type="mostrarSenhar ? 'text' : 'password'"
              v-model="senhaconfirm"
              placeholder="Confirm Password"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            />

            <div
              class="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end"
            >
              <button
                @click="limparDados"
                class="rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              <button
                @click="cadastrarUsuario"
                class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div
          class="rounded-3xl border border-slate-200 bg-white p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.22)] sm:p-5"
        >
          <div
            class="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <h2 class="text-lg font-semibold tracking-tight text-slate-900">
                Users
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                Search and manage registered users.
              </p>
            </div>

            <input
              v-model="busca"
              placeholder="Search"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:w-52"
            />
          </div>

          <div class="overflow-hidden rounded-2xl border border-slate-200">
            <div class="overflow-x-auto">
              <table class="w-full min-w-[640px] text-sm">
                <thead class="bg-slate-50">
                  <tr class="text-left">
                    <th
                      class="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      Name
                    </th>
                    <th
                      class="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      Surname
                    </th>
                    <th
                      class="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      Status
                    </th>
                    <th
                      class="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    >
                      Email
                    </th>
                    <th
                      class="px-4 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                    ></th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-100 bg-white">
                  <tr
                    v-for="u in filteredUsers"
                    :key="u._id"
                    class="transition hover:bg-slate-50/80"
                  >
                    <td class="px-4 py-4 font-medium text-slate-800">
                      {{ u.nome }}
                    </td>
                    <td class="px-4 py-4 text-slate-600">
                      {{ u.sobrenome }}
                    </td>
                    <td class="px-4 py-4">
                      <span
                        class="inline-flex rounded-full px-3 py-1 text-xs font-semibold"
                        :class="
                          u.acesso == 0
                            ? 'bg-emerald-100 text-emerald-700'
                            : 'bg-rose-100 text-rose-700'
                        "
                      >
                        {{ u.acesso == 0 ? "Active" : "Blocked" }}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-slate-600">
                      {{ u.email }}
                    </td>
                    <td class="px-4 py-4">
                      <div class="flex flex-wrap gap-2">
                        <button
                          @click="editar(u._id)"
                          class="rounded-xl bg-amber-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
                        >
                          Edit
                        </button>

                        <button
                          @click="desabilitarUsuario(u._id)"
                          class="rounded-xl bg-orange-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
                        >
                          {{ u.acesso == 1 ? "Unlock" : "Block" }}
                        </button>
                      </div>
                    </td>
                  </tr>

                  <tr v-if="filteredUsers.length === 0">
                    <td
                      colspan="5"
                      class="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No users found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="editarDialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-[420px] rounded-3xl border border-slate-200 bg-white p-5 shadow-[0_24px_80px_-20px_rgba(15,23,42,0.45)] sm:p-6"
      >
        <div class="mb-5">
          <h2 class="text-lg font-semibold tracking-tight text-slate-900">
            Editing password
          </h2>
          <p class="mt-1 text-sm text-slate-500">
            Update the user password securely.
          </p>
        </div>

        <input
          v-model="editSenha"
          placeholder="Password"
          type="password"
          class="mb-3 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />
        <input
          v-model="editConfirm"
          placeholder="Confirm Password"
          type="password"
          class="mb-5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
        />

        <div class="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            @click="editarDialog = false"
            class="rounded-2xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Cancel
          </button>
          <button
            @click="salvarEdicao"
            class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import BanerBlock from "../components/BannerBlock.vue";

const config = useRuntimeConfig();
const { loggedIn } = useAuth();
const { $notifier } = useNuxtApp();

const isLoggedIn = computed(() => loggedIn.value);

const overlay = ref(false);
const editarDialog = ref(false);
const mostrarSenhar = ref(false);

const nome = ref("");
const sobrenome = ref("");
const usuario = ref("");
const email = ref("");
const senha = ref("");
const senhaconfirm = ref("");

const editSenha = ref("");
const editConfirm = ref("");

const usuarios = ref([]);
const id_edicao = ref("");
const busca = ref("");

function getToken() {
  const token = process.client
    ? localStorage.getItem("auth._token.local")
    : null;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

async function getUsuarios() {
  if (!isLoggedIn.value) return;

  const res = await $fetch(
    `${config.public.apiBase}/usuario/buscarUsuarios`,
    getToken(),
  );

  usuarios.value = res;
}

async function cadastrarUsuario() {
  await $fetch(`${config.public.apiBase}/usuario/salvar`, {
    method: "POST",
    body: {
      nome: nome.value,
      sobrenome: sobrenome.value,
      usuario: usuario.value,
      email: email.value,
      senha: senhaconfirm.value,
      tipo: 0,
    },
    ...getToken(),
  });

  limparDados();
  await getUsuarios();

  $notifier.showMessage({
    content: "User saved",
    color: "green",
  });
}

function limparDados() {
  nome.value = "";
  sobrenome.value = "";
  usuario.value = "";
  email.value = "";
  senha.value = "";
  senhaconfirm.value = "";
  editSenha.value = "";
  editConfirm.value = "";
  id_edicao.value = "";
}

function editar(id) {
  editarDialog.value = true;
  id_edicao.value = id;
}

async function salvarEdicao() {
  await $fetch(
    `${config.public.apiBase}/usuario/editarSenha/${id_edicao.value}`,
    {
      method: "PUT",
      body: { senha: editConfirm.value },
      ...getToken(),
    },
  );

  editarDialog.value = false;
  await getUsuarios();

  $notifier.showMessage({
    content: "User has been edited",
    color: "green",
  });
}

async function desabilitarUsuario(id) {
  await $fetch(`${config.public.apiBase}/usuario/alterarTipo/${id}`, {
    method: "PUT",
    ...getToken(),
  });

  await getUsuarios();

  $notifier.showMessage({
    content: "The user status has been updated.",
    color: "green",
  });
}

const filteredUsers = computed(() => {
  return usuarios.value.filter((u) =>
    Object.values(u)
      .join(" ")
      .toLowerCase()
      .includes(busca.value.toLowerCase()),
  );
});

onMounted(async () => {
  await getUsuarios();
  overlay.value = true;

  setTimeout(() => {
    overlay.value = false;
  }, 1000);
});
</script>
