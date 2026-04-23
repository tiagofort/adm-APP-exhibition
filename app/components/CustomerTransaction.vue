<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 p-3 sm:p-4 lg:p-6"
  >
    <div
      v-if="overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/40 backdrop-blur-sm"
    >
      <div class="relative">
        <div
          class="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white"
        ></div>
        <div class="absolute inset-0 rounded-full bg-white/10 blur-md"></div>
      </div>
    </div>

    <BannerBlock v-if="!loggedIn" />

    <div v-else class="grid gap-5 xl:grid-cols-2">
      <div
        class="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm"
      >
        <div
          class="flex flex-col gap-4 border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50/80 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2
              class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            >
              Customers
            </h2>
            <p class="mt-1 text-sm text-zinc-500">
              Browse and manage customer records.
            </p>
          </div>

          <div class="w-full lg:w-auto">
            <input
              v-model="busca"
              type="text"
              placeholder="Search customer..."
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 sm:max-w-xs"
            />
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-zinc-50/80 text-left text-zinc-600">
              <tr>
                <th class="px-4 py-4 font-semibold sm:px-5">Name</th>
                <th class="px-4 py-4 font-semibold sm:px-5">Surname</th>
                <th class="px-4 py-4 font-semibold sm:px-5">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100">
              <tr
                v-for="clienteItem in filteredClientes"
                :key="clienteItem._id"
                class="transition hover:bg-orange-50/40"
              >
                <td class="px-4 py-4 text-zinc-800 sm:px-5">
                  {{ clienteItem.nome }}
                </td>
                <td class="px-4 py-4 text-zinc-600 sm:px-5">
                  {{ clienteItem.sobrenome }}
                </td>
                <td class="px-4 py-4 sm:px-5">
                  <div class="hidden flex-wrap gap-2 sm:flex">
                    <button
                      type="button"
                      @click="carregarTransacao(clienteItem._id)"
                      class="inline-flex items-center rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-sm font-medium text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
                    >
                      Transactions
                    </button>

                    <button
                      type="button"
                      @click="carregarCliente(clienteItem._id)"
                      class="inline-flex items-center rounded-xl border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                    >
                      Customer Details
                    </button>
                  </div>

                  <div class="flex flex-col gap-2 sm:hidden">
                    <button
                      type="button"
                      @click="carregarTransacao(clienteItem._id)"
                      class="rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700"
                    >
                      Transactions
                    </button>

                    <button
                      type="button"
                      @click="carregarCliente(clienteItem._id)"
                      class="rounded-xl bg-zinc-900 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                    >
                      Client Details
                    </button>
                  </div>
                </td>
              </tr>

              <tr v-if="filteredClientes.length === 0">
                <td
                  colspan="3"
                  class="px-4 py-10 text-center text-zinc-500 sm:px-5"
                >
                  No customers found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div
        class="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm"
      >
        <div
          class="flex flex-col gap-4 border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50/80 px-4 py-4 sm:px-5 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2
              class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            >
              Customer Transactions
            </h2>
            <p class="mt-1 text-sm text-zinc-500">
              Search and inspect purchase history.
            </p>
          </div>

          <div class="w-full lg:w-auto">
            <input
              v-model="buscaDet"
              type="text"
              placeholder="Search transaction..."
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-orange-400 focus:ring-4 focus:ring-orange-100 sm:max-w-xs"
            />
          </div>
        </div>

        <div class="px-4 pt-5 sm:px-5">
          <p class="text-xl font-semibold tracking-tight text-zinc-900">
            {{ nome }}
          </p>
        </div>

        <div class="grid gap-3 px-4 pb-5 pt-4 sm:grid-cols-2 sm:px-5">
          <div class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <p
              class="text-xs font-semibold uppercase tracking-wide text-zinc-500"
            >
              Quantity bought
            </p>
            <p class="mt-1 text-base font-semibold text-zinc-900">
              {{ qtd_comprada }}
            </p>
          </div>

          <div class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3">
            <p
              class="text-xs font-semibold uppercase tracking-wide text-zinc-500"
            >
              Total bought
            </p>
            <p class="mt-1 text-base font-semibold text-zinc-900">
              {{ qtd_total }}
            </p>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-zinc-50/80 text-left text-zinc-600">
              <tr>
                <th class="px-4 py-4 font-semibold sm:px-5">Sale Code</th>
                <th class="px-4 py-4 font-semibold sm:px-5">Date</th>
                <th class="px-4 py-4 font-semibold sm:px-5">Product</th>
                <th class="px-4 py-4 font-semibold sm:px-5">Actions</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-zinc-100">
              <tr
                v-for="item in filteredDetalhesCliente"
                :key="item.codigo_venda"
                class="transition hover:bg-orange-50/40"
              >
                <td class="px-4 py-4 text-zinc-800 sm:px-5">
                  {{ item.codigo_venda }}
                </td>
                <td class="px-4 py-4 sm:px-5">
                  <span
                    class="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm"
                  >
                    {{ format(item.data_venda) }}
                  </span>
                </td>
                <td class="px-4 py-4 text-zinc-600 sm:px-5">
                  {{ item.item }}
                </td>
                <td class="px-4 py-4 sm:px-5">
                  <button
                    type="button"
                    @click="mostrarDetalhes(item.codigo_venda)"
                    class="inline-flex items-center rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-sm font-medium text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
                  >
                    Show Details
                  </button>
                </td>
              </tr>

              <tr v-if="filteredDetalhesCliente.length === 0">
                <td
                  colspan="4"
                  class="px-4 py-10 text-center text-zinc-500 sm:px-5"
                >
                  No transactions found.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="dialog"
        class="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm"
        @click="fechar"
      />
    </Transition>

    <Transition name="scale">
      <div
        v-if="dialog"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      >
        <div
          class="max-h-[90vh] w-full max-w-[680px] overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)]"
        >
          <div
            class="border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50 px-5 py-4 sm:px-6"
          >
            <h3
              class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            >
              {{ tituloDialog }}
            </h3>
          </div>

          <div
            class="max-h-[calc(90vh-140px)] overflow-y-auto px-5 py-5 sm:px-6"
          >
            <div v-if="visualizar === 0" :key="chave" class="space-y-6">
              <div class="flex justify-center">
                <div class="rounded-full bg-zinc-100 p-1 shadow-sm">
                  <img
                    :src="cliente.avatar"
                    alt="Customer avatar"
                    class="h-20 w-20 rounded-full object-cover"
                  />
                </div>
              </div>

              <div class="grid gap-3">
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Name:</span>
                  <span class="text-zinc-700">
                    {{ cliente.nome }} {{ cliente.sobrenome }}
                  </span>
                </div>

                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Email:</span>
                  <span class="text-zinc-700"> {{ cliente.email }}</span>
                </div>

                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Username:</span>
                  <span class="text-zinc-700"> {{ cliente.usuario }}</span>
                </div>

                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Phone:</span>
                  <span class="text-zinc-700"> {{ cliente.phone }}</span>
                </div>
              </div>
            </div>

            <div v-else class="space-y-6">
              <div class="flex justify-center">
                <div class="rounded-full bg-zinc-100 p-1 shadow-sm">
                  <img
                    :src="venda.url"
                    alt="Sale item"
                    class="h-20 w-20 rounded-full object-cover"
                  />
                </div>
              </div>

              <div class="grid gap-3">
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Sale Code:</span>
                  <span class="text-zinc-700"> {{ venda.codigo_venda }}</span>
                </div>

                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Sale Date:</span>
                  <span class="text-zinc-700">
                    {{ format(venda.data_venda) }}</span
                  >
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  <div
                    class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <span class="font-semibold text-zinc-900">Quantity:</span>
                    <span class="text-zinc-700"> {{ venda.qtd }}</span>
                  </div>

                  <div
                    class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <span class="font-semibold text-zinc-900">Price:</span>
                    <span class="text-zinc-700"> {{ venda.vlr }}</span>
                  </div>
                </div>

                <hr class="border-zinc-100" />

                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900">Product Code:</span>
                  <span class="text-zinc-700"> {{ venda.cod_item }}</span>
                </div>

                <div class="grid gap-3 sm:grid-cols-2">
                  <div
                    class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <span class="font-semibold text-zinc-900">Product:</span>
                    <span class="text-zinc-700"> {{ venda.item }}</span>
                  </div>

                  <div
                    class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <span class="font-semibold text-zinc-900">Stone:</span>
                    <span class="text-zinc-700"> {{ venda.item_pedra }}</span>
                  </div>

                  <div
                    class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <span class="font-semibold text-zinc-900">Material:</span>
                    <span class="text-zinc-700">
                      {{ venda.item_material }}
                    </span>
                  </div>

                  <div
                    class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                  >
                    <span class="font-semibold text-zinc-900">Type:</span>
                    <span class="text-zinc-700"> {{ venda.item_tipo }}</span>
                  </div>
                </div>

                <hr class="border-zinc-100" />

                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <span class="font-semibold text-zinc-900"
                    >Customer Name:</span
                  >
                  <span class="text-zinc-700">
                    {{ venda.nome }} {{ venda.sobrenome }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex justify-end border-t border-zinc-100 bg-zinc-50/80 px-5 py-4 sm:px-6"
          >
            <button
              type="button"
              @click="fechar"
              class="inline-flex items-center rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from "vue";
import noimg from "../assets/utilities/noimg.png";

const { showSnackbar } = useSnackbar();
const { loggedIn } = useAuth();
const config = useRuntimeConfig();

const overlay = ref(false);
const clientes = ref([]);
const movimentacao = ref([]);
const detalhesCliente = ref([]);
const chave = ref(0);
const visualizar = ref(0);
const qtd_comprada = ref("");
const qtd_total = ref("");
const nome = ref("");
const busca = ref("");
const buscaDet = ref("");
const dialog = ref(false);
const tituloDialog = ref("");

const cliente = reactive({
  nome: "",
  sobrenome: "",
  avatar: "",
  email: "",
  phone: "",
  usuario: "",
});

const venda = reactive({
  cod_item: "",
  codigo_venda: "",
  data_venda: "",
  qtd: "",
  vlr: "",
  id_cliente: "",
  id_item: "",
  item: "",
  item_material: "",
  item_pedra: "",
  item_tipo: "",
  nome: "",
  sobrenome: "",
  url: "",
});

const filteredClientes = computed(() => {
  const term = busca.value.trim().toLowerCase();
  if (!term) return clientes.value;

  return clientes.value.filter((item) => {
    return (
      item.nome?.toLowerCase().includes(term) ||
      item.sobrenome?.toLowerCase().includes(term)
    );
  });
});

const filteredDetalhesCliente = computed(() => {
  const term = buscaDet.value.trim().toLowerCase();
  if (!term) return detalhesCliente.value;

  return detalhesCliente.value.filter((item) => {
    return (
      item.codigo_venda?.toLowerCase().includes(term) ||
      item.item?.toLowerCase().includes(term) ||
      format(item.data_venda).toLowerCase().includes(term)
    );
  });
});

const renderDialog = () => {
  chave.value += 1;
};

const getToken = () => {
  if (!process.client) return {};

  const token = localStorage.getItem("auth._token.local");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
};

const getClientes = async () => {
  if (!loggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/usuario/buscarClientes`,
      {
        ...getToken(),
      },
    );

    clientes.value = response;
  } catch (error) {
    console.error("Error loading customers:", error);
  }
};

const getMovimentacao = async () => {
  if (!loggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/usuario/buscarMovimentacao`,
      {
        ...getToken(),
      },
    );

    movimentacao.value = response;
  } catch (error) {
    console.error("Error loading transactions:", error);
  }
};

const carregarTransacao = (id) => {
  detalhesCliente.value = movimentacao.value.filter(
    (element) => element.id_cliente == id,
  );

  if (detalhesCliente.value.length > 0) {
    nome.value =
      detalhesCliente.value[0].nome + " " + detalhesCliente.value[0].sobrenome;
    qtd_comprada.value = detalhesCliente.value[0].qtd_comprada;
    qtd_total.value = detalhesCliente.value[0].qtd_paga;
  } else {
    showSnackbar({
      message: "The customer you are selecting has no transactions!",
      color: "error",
      timeout: 3000,
    });
  }
};

const carregarCliente = (id) => {
  visualizar.value = 0;

  const selecao = clientes.value.find((element) => element._id == id);
  if (!selecao) return;

  cliente.nome = selecao.nome;
  cliente.sobrenome = selecao.sobrenome;
  cliente.avatar = selecao.avatar === "" ? noimg : selecao.avatar;
  cliente.email = selecao.email;
  cliente.phone = selecao.phone;
  cliente.usuario = selecao.usuario;

  dialog.value = true;
  tituloDialog.value = "Customer Details";
  renderDialog();
};

const mostrarDetalhes = (cod) => {
  tituloDialog.value = "Sale Details";
  visualizar.value = 1;
  dialog.value = true;

  const selecao = movimentacao.value.find(
    (element) => element.codigo_venda == cod,
  );

  if (!selecao) return;

  venda.cod_item = selecao.cod_item;
  venda.codigo_venda = selecao.codigo_venda;
  venda.data_venda = selecao.data_venda;
  venda.qtd = selecao.qtd;
  venda.vlr = selecao.vlr;
  venda.id_cliente = selecao.id_cliente;
  venda.id_item = selecao.id_item;
  venda.item = selecao.item;
  venda.item_material = selecao.item_material;
  venda.item_pedra = selecao.item_pedra;
  venda.item_tipo = selecao.item_tipo;
  venda.nome = selecao.nome;
  venda.sobrenome = selecao.sobrenome;
  venda.url = selecao.url;
};

const fechar = () => {
  dialog.value = false;
};

const format = (data) => {
  const dt = new Date(data);
  const dia = dt.getDate();
  const mes = dt.getMonth() + 1;
  const ano = dt.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

onMounted(async () => {
  overlay.value = true;

  await getClientes();
  await getMovimentacao();

  setTimeout(() => {
    overlay.value = false;
  }, 1000);
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
