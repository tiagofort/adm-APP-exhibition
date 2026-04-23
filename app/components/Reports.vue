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

    <template v-if="isLoggedIn">
      <div class="mb-6">
        <div
          class="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.25)] backdrop-blur"
        >
          <div
            class="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div>
              <h1
                class="text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl"
              >
                Sales Dashboard
              </h1>
              <p class="mt-1 text-sm text-slate-500">
                Monitor your top products, customers and profit performance.
              </p>
            </div>
          </div>

          <div class="p-5 sm:p-6">
            <div class="grid gap-5 xl:grid-cols-2">
              <div
                class="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <ReportChartCard
                  title="Top 4 selling products / Quantity"
                  :labels="produtos_qtd"
                  :values="valores_qtd"
                  @details="abrirDetalhes(1)"
                />
              </div>

              <div
                class="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <ReportChartCard
                  title="Top 4 selling products / Total"
                  :labels="produtos_total"
                  :values="valores_total"
                  @details="abrirDetalhes(2)"
                />
              </div>
            </div>

            <div class="my-6">
              <div
                class="h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"
              ></div>
            </div>

            <div class="grid gap-5 xl:grid-cols-2">
              <div
                class="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <ReportChartCard
                  title="Top 4 selling Customers / Quantity"
                  :labels="cli_qtd"
                  :values="qtd_cli"
                  @details="abrirDetalhes(3)"
                />
              </div>

              <div
                class="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <ReportChartCard
                  title="Top 4 selling Customers / Total"
                  :labels="cli_total"
                  :values="total_cli"
                  @details="abrirDetalhes(4)"
                />
              </div>
            </div>

            <div class="mt-5 grid gap-5">
              <div
                class="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
              >
                <ReportChartCard
                  title="Top 4 product profit"
                  :labels="produto_lucro"
                  :values="lucro_total"
                  @details="abrirDetalhes(5)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <div
      v-if="dialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-3 backdrop-blur-sm sm:p-4"
    >
      <div
        class="flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.45)]"
      >
        <div
          class="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2
              class="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
            >
              {{ tituloDialog }}
            </h2>
            <p class="mt-1 text-sm text-slate-500">
              Detailed report data available for export.
            </p>
          </div>

          <div class="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <button
              @click="imprimirExcel"
              class="inline-flex items-center justify-center rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
              Export Excel
            </button>
          </div>
        </div>

        <div class="flex-1 overflow-auto p-4 sm:p-6">
          <div
            class="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <div class="overflow-x-auto">
              <table class="min-w-full text-left text-sm text-slate-700">
                <thead class="sticky top-0 z-10 bg-slate-100/95 backdrop-blur">
                  <tr>
                    <th
                      v-for="header in cabecalho"
                      :key="header.value"
                      class="whitespace-nowrap border-b border-slate-200 px-4 py-3 font-semibold text-slate-700"
                    >
                      {{ header.text }}
                    </th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-slate-100">
                  <tr
                    v-for="(item, index) in selecionado"
                    :key="item._id || index"
                    class="transition hover:bg-slate-50"
                  >
                    <td
                      v-for="header in cabecalho"
                      :key="header.value"
                      class="whitespace-nowrap px-4 py-3 text-slate-600"
                    >
                      {{ item[header.value] }}
                    </td>
                  </tr>

                  <tr v-if="selecionado.length === 0">
                    <td
                      :colspan="cabecalho.length"
                      class="px-4 py-10 text-center text-sm text-slate-500"
                    >
                      No data available.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          class="flex flex-col-reverse gap-2 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:justify-end sm:px-6"
        >
          <button
            @click="dialog = false"
            class="inline-flex items-center justify-center rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import BanerBlock from "../components/BannerBlock.vue";
import ReportChartCard from "../components/ChartCard.vue";

const config = useRuntimeConfig();
const { loggedIn } = useAuth();

const isLoggedIn = computed(() => loggedIn.value);

const dialog = ref(false);
const tituloDialog = ref("");
const controle = ref(0);
const selecionado = ref([]);
const cabecalho = ref([]);
const overlay = ref(false);

const topVendaProdutoQtd = ref([]);
const topVendaProdutoTotal = ref([]);
const topVendaClieQtd = ref([]);
const topVendaClieTotal = ref([]);
const topProdLucro = ref([]);

const produtos_qtd = ref([]);
const valores_qtd = ref([]);
const produtos_total = ref([]);
const valores_total = ref([]);
const cli_qtd = ref([]);
const qtd_cli = ref([]);
const cli_total = ref([]);
const total_cli = ref([]);
const produto_lucro = ref([]);
const lucro_total = ref([]);

function getToken() {
  const token = process.client
    ? localStorage.getItem("auth._token.local")
    : null;

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

async function topVendaProdQtd() {
  if (!isLoggedIn.value) return;

  const response = await $fetch(
    `${config.public.apiBase}/venda/topProdQtd/0`,
    getToken(),
  );

  topVendaProdutoQtd.value = response || [];
  converterGraficoProd_qtd();
}

async function topVendaProdTotal() {
  if (!isLoggedIn.value) return;

  const response = await $fetch(
    `${config.public.apiBase}/venda/topProdTotal/0`,
    getToken(),
  );

  topVendaProdutoTotal.value = response || [];
  converterGraficoProd_total();
}

async function topProdutoLucro() {
  if (!isLoggedIn.value) return;

  const response = await $fetch(
    `${config.public.apiBase}/venda/topProdLucro/0`,
    getToken(),
  );

  topProdLucro.value = response || [];
  converterGraficoLucro();
}

async function topVendaClienteQtd() {
  if (!isLoggedIn.value) return;

  const response = await $fetch(
    `${config.public.apiBase}/venda/topClienteQtd/0`,
    getToken(),
  );

  topVendaClieQtd.value = response || [];
  converterGraficoCli_qtd();
}

async function topVendaClienteTotal() {
  if (!isLoggedIn.value) return;

  const response = await $fetch(
    `${config.public.apiBase}/venda/topClienteTotal/0`,
    getToken(),
  );

  topVendaClieTotal.value = response || [];
  converterGraficoCli_total();
}

function converterGraficoProd_qtd() {
  produtos_qtd.value = [];
  valores_qtd.value = [];

  topVendaProdutoQtd.value.slice(0, 4).forEach((item) => {
    produtos_qtd.value.push(`${item.item} : ${item.qtd_vendida}`);
    valores_qtd.value.push(item.qtd_vendida);
  });
}

function converterGraficoProd_total() {
  produtos_total.value = [];
  valores_total.value = [];

  topVendaProdutoTotal.value.slice(0, 4).forEach((item) => {
    produtos_total.value.push(`${item.item} : €${item.qtd_total}`);
    valores_total.value.push(item.qtd_total);
  });
}

function converterGraficoLucro() {
  produto_lucro.value = [];
  lucro_total.value = [];

  topProdLucro.value.slice(0, 4).forEach((item) => {
    produto_lucro.value.push(`${item.item} : €${item.lucro}`);
    lucro_total.value.push(item.lucro);
  });
}

function converterGraficoCli_qtd() {
  cli_qtd.value = [];
  qtd_cli.value = [];

  topVendaClieQtd.value.slice(0, 4).forEach((item) => {
    cli_qtd.value.push(`${item.nome} : ${item.qtd_vendida}`);
    qtd_cli.value.push(item.qtd_vendida);
  });
}

function converterGraficoCli_total() {
  cli_total.value = [];
  total_cli.value = [];

  topVendaClieTotal.value.slice(0, 4).forEach((item) => {
    cli_total.value.push(`${item.nome} : €${item.qtd_total}`);
    total_cli.value.push(item.qtd_total);
  });
}

function abrirDetalhes(refValue) {
  dialog.value = true;
  controle.value = refValue;

  if (refValue === 1) {
    tituloDialog.value = "Product details per Quantity";
    selecionado.value = topVendaProdutoQtd.value;
    cabecalho.value = [
      { text: "Product Code", value: "cod_prod" },
      { text: "Product", value: "item" },
      { text: "Stone", value: "pedra" },
      { text: "Type", value: "tipo" },
      { text: "Material", value: "material" },
      { text: "Quantity", value: "qtd_vendida" },
    ];
  } else if (refValue === 2) {
    tituloDialog.value = "Product details per Total";
    selecionado.value = topVendaProdutoTotal.value;
    cabecalho.value = [
      { text: "Product Code", value: "cod_prod" },
      { text: "Product", value: "item" },
      { text: "Stone", value: "pedra" },
      { text: "Type", value: "tipo" },
      { text: "Material", value: "material" },
      { text: "Total €", value: "qtd_total" },
    ];
  } else if (refValue === 3) {
    tituloDialog.value = "Customer details per Quantity";
    selecionado.value = topVendaClieQtd.value;
    cabecalho.value = [
      { text: "Name", value: "nome" },
      { text: "Surname", value: "sobrenome" },
      { text: "Email", value: "email" },
      { text: "Quantity", value: "qtd_vendida" },
    ];
  } else if (refValue === 4) {
    tituloDialog.value = "Customer details per Total";
    selecionado.value = topVendaClieTotal.value;
    cabecalho.value = [
      { text: "Name", value: "nome" },
      { text: "Surname", value: "sobrenome" },
      { text: "Email", value: "email" },
      { text: "Total €", value: "qtd_total" },
    ];
  } else if (refValue === 5) {
    tituloDialog.value = "Product details per Profit";
    selecionado.value = topProdLucro.value;
    cabecalho.value = [
      { text: "Product Code", value: "cod_prod" },
      { text: "Product", value: "item" },
      { text: "Stone", value: "pedra" },
      { text: "Type", value: "tipo" },
      { text: "Material", value: "material" },
      { text: "Sale value", value: "vlr_venda" },
      { text: "purchase Price", value: "vlr_compra" },
      { text: "Profit", value: "lucro" },
    ];
  }
}

async function baixarBlob(url, filename) {
  const response = await fetch(url, {
    method: "GET",
    headers: getToken().headers,
  });

  const blob = await response.blob();
  const blobUrl = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(blobUrl);
}

async function imprimirExcel() {
  if (!isLoggedIn.value) return;

  if (controle.value === 1) {
    await baixarBlob(
      `${config.public.apiBase}/venda/topProdQtd/1`,
      "Mais_Vendidos_Produtos_QTD.xlsx",
    );
  } else if (controle.value === 2) {
    await baixarBlob(
      `${config.public.apiBase}/venda/topProdTotal/1`,
      "Mais_Vendidos_Produtos_TOTAL.xlsx",
    );
  } else if (controle.value === 3) {
    await baixarBlob(
      `${config.public.apiBase}/venda/topClienteQtd/1`,
      "Mais_Vendidos_Clientes_QTD.xlsx",
    );
  } else if (controle.value === 4) {
    await baixarBlob(
      `${config.public.apiBase}/venda/topClienteTotal/1`,
      "Mais_Vendidos_Clientes_Total.xlsx",
    );
  } else if (controle.value === 5) {
    await baixarBlob(
      `${config.public.apiBase}/venda/topProdLucro/1`,
      "Top_Lucro_Produtos.xlsx",
    );
  }
}

onMounted(async () => {
  overlay.value = true;

  await Promise.all([
    topVendaProdQtd(),
    topVendaProdTotal(),
    topProdutoLucro(),
    topVendaClienteQtd(),
    topVendaClienteTotal(),
  ]);

  setTimeout(() => {
    overlay.value = false;
  }, 1000);
});
</script>
