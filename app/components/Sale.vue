<template>
  <div class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div
      v-if="overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-sm"
    >
      <div class="flex flex-col items-center gap-4">
        <div
          class="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white shadow-lg"
        ></div>
      </div>
    </div>

    <BanerBlock v-if="!isLoggedIn" />

    <div
      v-else
      class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)]"
    >
      <div
        class="flex flex-col gap-4 border-b border-slate-200 bg-slate-50/70 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
      >
        <div>
          <h1
            class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
          >
            Sales
          </h1>
          <p class="mt-1 text-sm text-slate-500">
            Manage and review your sales records.
          </p>
        </div>

        <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div class="relative w-full sm:w-auto">
            <input
              v-model="pesquisa"
              type="text"
              placeholder="Search"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100 sm:w-72"
            />
          </div>

          <button
            @click="inserirVenda"
            class="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            New Sale
          </button>
        </div>
      </div>

      <div class="overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50">
              <tr>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Sale code
                </th>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Customer code
                </th>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Product code
                </th>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Sale Date
                </th>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Quantity
                </th>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Unit Value
                </th>
                <th
                  class="whitespace-nowrap px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.12em] text-slate-500"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-slate-100 bg-white">
              <tr
                v-for="item in filteredVendas"
                :key="item._id"
                class="transition hover:bg-slate-50/80"
              >
                <td
                  class="whitespace-nowrap px-4 py-4 font-medium text-slate-800"
                >
                  {{ item.cod_venda }}
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-600">
                  {{ item.id_cliente }}
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-600">
                  {{ item.cod_prod }}
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-600">
                  <span
                    class="inline-flex rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {{ format(item.data_venda) }}
                  </span>
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-600">
                  {{ item.qtd }}
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-600">
                  {{ item.vlr_unit }}
                </td>
                <td class="whitespace-nowrap px-4 py-4 text-slate-600">
                  <button
                    @click="deleteVenda(item._id)"
                    class="inline-flex items-center justify-center rounded-xl bg-amber-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>

              <tr v-if="filteredVendas.length === 0">
                <td
                  colspan="7"
                  class="px-4 py-14 text-center text-sm text-slate-500"
                >
                  <div class="flex flex-col items-center gap-3">
                    <div
                      class="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm text-slate-500"
                    >
                      No data found.
                    </div>
                    <button
                      @click="carregarTabela"
                      class="rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                    >
                      Reset
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="dialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div
        class="w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.45)]"
      >
        <div class="border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
          <h2
            class="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            {{ tituloDialog }}
          </h2>
        </div>

        <div class="px-5 py-5 sm:px-6">
          <div v-if="!deleteMode" class="grid grid-cols-1 gap-5">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Select customer
              </label>
              <select
                v-model="venda.cbCliente"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                <option :value="null">Select a customer</option>
                <option
                  v-for="cliente in clientes"
                  :key="cliente._id"
                  :value="cliente"
                >
                  {{ cliente.nome }} {{ cliente.sobrenome }}
                </option>
              </select>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Or insert customer name yourself
              </label>
              <input
                v-model="venda.txtCliente"
                type="text"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                placeholder="Customer name"
              />
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Select product
              </label>
              <select
                v-model="venda.produto"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                <option :value="null">Select a product</option>
                <option
                  v-for="produto in produtos"
                  :key="produto._id"
                  :value="produto"
                >
                  {{ produto.titulo }} - {{ produto.cod_prod }}
                </option>
              </select>
            </div>

            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">
                  Quantity
                </label>
                <input
                  v-model="venda.qtd"
                  type="number"
                  min="1"
                  class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-medium text-slate-700">
                  Unit Value
                </label>
                <input
                  v-model="venda.vlr_unit"
                  type="number"
                  step="0.01"
                  min="0"
                  class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
                />
              </div>
            </div>

            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Sale Date
              </label>
              <input
                v-model="venda.data"
                type="date"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              />
            </div>
          </div>

          <div
            v-else
            class="rounded-2xl border border-rose-100 bg-rose-50 px-4 py-4 text-sm text-rose-700"
          >
            Do you want to delete the selected sale?
          </div>
        </div>

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6"
        >
          <button
            @click="cancelar"
            class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            Cancel
          </button>

          <button
            @click="botaoConfirm"
            class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {{ btConfirm }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import BanerBlock from "../components/BannerBlock.vue";

const config = useRuntimeConfig();
const { loggedIn } = useAuth();
const { $notifier } = useNuxtApp();

const isLoggedIn = computed(() => loggedIn.value);

const overlay = ref(false);
const vendas = ref([]);
const pesquisa = ref("");
const chaveRender = ref(0);
const idDelete = ref("");
const dialog = ref(false);
const tituloDialog = ref("");
const btConfirm = ref("");
const deleteMode = ref(false);
const insertMode = ref(false);

const produtos = ref([]);
const clientes = ref([]);

const noimg = "/utilities/noimg.png";

const venda = reactive({
  cbCliente: null,
  txtCliente: "",
  produto: null,
  qtd: "",
  vlr_unit: "",
  data: new Date().toISOString().substr(0, 10),
});

const filteredVendas = computed(() => {
  const term = pesquisa.value.trim().toLowerCase();

  const vendasComCodProd = Array.from(vendas.value || []).map((item) => {
    const produtoEncontrado = produtos.value.find(
      (produto) => produto._id === item.id_item,
    );

    return {
      ...item,
      cod_prod: produtoEncontrado?.cod_prod || item.id_item,
    };
  });

  if (!term) return vendasComCodProd;

  return vendasComCodProd.filter((item) => {
    return [
      item.cod_venda,
      item.id_cliente,
      item.cod_prod,
      String(item.qtd ?? ""),
      String(item.vlr_unit ?? ""),
      format(item.data_venda),
    ]
      .filter(Boolean)
      .some((value) => String(value).toLowerCase().includes(term));
  });
});

function getToken() {
  if (!process.client) {
    return {
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  const token = localStorage.getItem("auth._token.local");

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

async function getVendas() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/venda/buscarVendas`,
      {
        method: "GET",
        ...getToken(),
      },
    );

    vendas.value = response;
    console.log(vendas.value);
  } catch (error) {
    console.error("Error loading sales:", error);
  }
}

async function getItens() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(`${config.public.apiBase}/item/bucarItens`, {
      method: "GET",
      ...getToken(),
    });

    produtos.value = response;
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

async function getClientes() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/usuario/buscarClientes`,
      {
        method: "GET",
        ...getToken(),
      },
    );

    clientes.value = response;
  } catch (error) {
    console.error("Error loading customers:", error);
  }
}

async function botaoConfirm() {
  if (deleteMode.value === true) {
    try {
      await $fetch(`${config.public.apiBase}/venda/apagar/${idDelete.value}`, {
        method: "DELETE",
        ...getToken(),
      });

      await carregarTabela();
      limparDados();
      dialog.value = false;
    } catch (error) {
      console.error(error);
      $notifier?.showMessage?.({
        content: "Error deleting sale.",
        color: "red",
        time: 4000,
      });
    }
  } else if (insertMode.value === true) {
    if (
      (!venda.cbCliente && venda.txtCliente === "") ||
      !venda.produto?._id ||
      venda.qtd === "" ||
      venda.vlr_unit === ""
    ) {
      $notifier?.showMessage?.({
        content: "There is/are required fields in blank. Please fill them",
        color: "red",
        time: 4000,
      });
      return;
    }
    console.log("apiBase:", `${config.public.apiBase}/venda/addVenda`);
    try {
      await $fetch(`${config.public.apiBase}/venda/addVenda`, {
        method: "POST",
        body: {
          cod_venda: "",
          id_cliente: venda.cbCliente?._id ?? venda.txtCliente,
          id_item: venda.produto._id,
          qtd: venda.qtd,
          vlr_unit: venda.vlr_unit,
          data_venda: venda.data,
        },
        ...getToken(),
      });

      await carregarTabela();
      limparDados();
      dialog.value = false;

      $notifier?.showMessage?.({
        content: "Sale created successfully!",
        color: "green",
        time: 3000,
      });
    } catch (error) {
      console.error(error);

      const errorMessage =
        error?.data?.message || "An error occurred while creating the sale.";

      $notifier?.showMessage?.({
        content: errorMessage,
        color: "red",
        time: 6000,
      });
    }
  }
}

function cancelar() {
  dialog.value = false;
}

function deleteVenda(id) {
  insertMode.value = false;
  deleteMode.value = true;
  btConfirm.value = "Yes";
  tituloDialog.value = "Do you want to delete the selected sale?";
  dialog.value = true;
  idDelete.value = id;
}

function inserirVenda() {
  deleteMode.value = false;
  insertMode.value = true;
  btConfirm.value = "Save";
  tituloDialog.value = "Inserting a new Sale";
  dialog.value = true;
}

async function carregarTabela() {
  await getVendas();
  renderTabela();
}

function renderTabela() {
  chaveRender.value += 1;
}

function limparDados() {
  venda.cbCliente = null;
  venda.txtCliente = "";
  venda.produto = null;
  venda.qtd = "";
  venda.vlr_unit = "";
  venda.data = new Date().toISOString().substr(0, 10);

  idDelete.value = "";
  deleteMode.value = false;
  insertMode.value = false;
}

function format(data) {
  const dt = new Date(data);
  const dia = dt.getDate();
  const mes = dt.getMonth() + 1;
  const ano = dt.getFullYear();
  return `${dia}/${mes}/${ano}`;
}

watch(overlay, (val) => {
  if (val) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
});

onMounted(async () => {
  await getVendas();
  await getItens();
  await getClientes();
  overlay.value = true;
});
</script>
