<template>
  <section
    class="relative min-h-screen bg-gradient-to-br from-zinc-50 via-white to-emerald-50/30 p-3 sm:p-4 lg:p-6"
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

    <div
      v-else
      class="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm"
    >
      <div
        class="border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50/80 px-4 py-4 sm:px-5"
      >
        <div
          class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2
              class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            >
              Products Inventory
            </h2>
            <p class="mt-1 text-sm text-zinc-500">
              Monitor stock levels and manage inventory entries.
            </p>
          </div>

          <div class="flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              v-model="pesquisa"
              type="text"
              placeholder="Search product..."
              class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-2.5 text-sm text-zinc-700 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 sm:w-64"
            />

            <button
              type="button"
              @click="abrirMov"
              class="hidden rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 md:inline-flex"
            >
              Inventory history
            </button>

            <button
              type="button"
              @click="abrirMov"
              class="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm transition hover:bg-emerald-700 md:hidden"
              aria-label="Inventory history"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-zinc-50/80 text-left text-zinc-600">
            <tr>
              <th class="px-4 py-4 font-semibold sm:px-5">Product name</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Product Code</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Type</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Material</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Stone</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Sale Value</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Purchase Amount</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Inventory Number</th>
              <th class="px-4 py-4 font-semibold sm:px-5">Actions</th>
            </tr>
          </thead>

          <tbody class="divide-y divide-zinc-100">
            <tr
              v-for="item in filteredItems"
              :key="item._id"
              class="transition hover:bg-emerald-50/40"
            >
              <td class="px-4 py-4 text-zinc-800 sm:px-5">{{ item.titulo }}</td>
              <td class="px-4 py-4 text-zinc-600 sm:px-5">
                {{ item.cod_prod }}
              </td>
              <td class="px-4 py-4 text-zinc-600 sm:px-5">{{ item.tipo }}</td>
              <td class="px-4 py-4 text-zinc-600 sm:px-5">
                {{ item.material }}
              </td>
              <td class="px-4 py-4 text-zinc-600 sm:px-5">{{ item.pedra }}</td>
              <td class="px-4 py-4 text-zinc-800 sm:px-5">{{ item.preco }}</td>
              <td class="px-4 py-4 text-zinc-800 sm:px-5">
                {{ item.valor_compra }}
              </td>
              <td class="px-4 py-4 sm:px-5">
                <span
                  class="inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white shadow-sm"
                  :class="getInventoryClass(item.inventory)"
                >
                  {{ item.inventory || 0 }}
                </span>
              </td>
              <td class="px-4 py-4 sm:px-5">
                <button
                  type="button"
                  @click="addEntrada(item._id, item.cod_prod)"
                  class="hidden rounded-xl border border-orange-200 bg-orange-50 px-3.5 py-2 text-sm font-medium text-orange-700 transition hover:border-orange-300 hover:bg-orange-100 sm:inline-flex"
                >
                  Check in
                </button>

                <button
                  type="button"
                  @click="addEntrada(item._id, item.cod_prod)"
                  class="rounded-xl bg-orange-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-700 sm:hidden"
                >
                  Check in
                </button>
              </td>
            </tr>

            <tr v-if="filteredItems.length === 0">
              <td
                colspan="9"
                class="px-4 py-10 text-center text-zinc-500 sm:px-5"
              >
                No products found.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <Transition name="fade">
      <div
        v-if="dialog"
        class="fixed inset-0 z-40 bg-zinc-950/50 backdrop-blur-sm"
        @click="cancelar"
      />
    </Transition>

    <Transition name="scale">
      <div
        v-if="dialog"
        class="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
      >
        <div
          class="max-h-[90vh] w-full max-w-[650px] overflow-hidden rounded-3xl border border-white/60 bg-white shadow-[0_25px_80px_-20px_rgba(0,0,0,0.35)]"
        >
          <div
            class="border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50 px-5 py-4 sm:px-6"
          >
            <h3
              class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
            >
              {{ inclusao ? "Inventory Entry" : "Inventory History" }}
            </h3>
          </div>

          <div
            class="max-h-[calc(90vh-140px)] overflow-y-auto px-5 py-5 sm:px-6"
          >
            <div v-if="inclusao" class="grid gap-5">
              <div>
                <label class="mb-2 block text-sm font-semibold text-zinc-700">
                  Insert Amount
                </label>
                <input
                  v-model="qtdEntrada"
                  type="number"
                  class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>

              <div>
                <label class="mb-2 block text-sm font-semibold text-zinc-700">
                  Value Entry (Unit)
                </label>
                <input
                  v-model="vlr_unit"
                  type="number"
                  step="0.01"
                  class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                />
              </div>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="min-w-full text-sm">
                <thead class="bg-zinc-50/80 text-left text-zinc-600">
                  <tr>
                    <th class="px-4 py-4 font-semibold">Date insert</th>
                    <th class="px-4 py-4 font-semibold">Prod Code</th>
                    <th class="px-4 py-4 font-semibold">Quantity</th>
                    <th class="px-4 py-4 font-semibold">Unit Value</th>
                    <th class="px-4 py-4 font-semibold">Actions</th>
                  </tr>
                </thead>

                <tbody class="divide-y divide-zinc-100">
                  <tr
                    v-for="item in estoque_mov"
                    :key="item._id"
                    class="transition hover:bg-emerald-50/30"
                  >
                    <td class="px-4 py-4">
                      <span
                        class="inline-flex rounded-full border border-zinc-200 bg-white px-3 py-1 text-xs font-semibold text-zinc-700 shadow-sm"
                      >
                        {{ format(item.data_inclusao) }}
                      </span>
                    </td>
                    <td class="px-4 py-4 text-zinc-700">{{ item.cod_prod }}</td>
                    <td class="px-4 py-4">
                      <div class="flex flex-wrap items-center gap-2">
                        <input
                          v-model="item.qtd"
                          type="number"
                          class="w-24 rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-700 shadow-sm outline-none transition focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100"
                        />
                        <button
                          type="button"
                          @click="saveQtd(item.qtd, item._id)"
                          class="rounded-xl border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-100"
                        >
                          Save
                        </button>
                      </div>
                    </td>
                    <td class="px-4 py-4 text-zinc-700">
                      {{ item.vlr_unidade }}
                    </td>
                    <td class="px-4 py-4">
                      <button
                        type="button"
                        @click="deleteMovimentacao(item._id)"
                        class="rounded-xl border border-orange-200 bg-orange-50 px-3 py-2 text-sm font-medium text-orange-700 transition hover:border-orange-300 hover:bg-orange-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>

                  <tr v-if="estoque_mov.length === 0">
                    <td
                      colspan="5"
                      class="px-4 py-10 text-center text-zinc-500"
                    >
                      No inventory history found.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div
            class="flex justify-end gap-3 border-t border-zinc-100 bg-zinc-50/80 px-5 py-4 sm:px-6"
          >
            <button
              type="button"
              @click="cancelar"
              class="rounded-xl border border-red-200 bg-white px-4 py-2.5 text-sm font-semibold text-red-600 shadow-sm transition hover:bg-red-50"
            >
              Cancel
            </button>

            <button
              v-if="inclusao"
              type="button"
              @click="salvarEntrada"
              class="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </section>
</template>

<script setup>
import { computed, onMounted, ref } from "vue";

const { loggedIn } = useAuth();
const { showSnackbar } = useSnackbar();
const config = useRuntimeConfig();

const overlay = ref(false);
const inclusao = ref(true);
const itens = ref([]);
const estoques = ref([]);
const saidas = ref([]);
const movEstoque = ref([]);
const pesquisa = ref("");
const dialog = ref(false);
const id_prod = ref("");
const cd_prod = ref("");
const qtdEntrada = ref("");
const vlr_unit = ref("");

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

const filteredItems = computed(() => {
  const term = pesquisa.value.trim().toLowerCase();
  if (!term) return itens.value;

  return itens.value.filter((item) => {
    return [
      item.titulo,
      item.cod_prod,
      item.tipo,
      item.material,
      item.pedra,
      String(item.preco),
      String(item.valor_compra),
      String(item.inventory ?? 0),
    ]
      .filter(Boolean)
      .some((value) => value.toLowerCase().includes(term));
  });
});

const estoque_mov = computed(() => {
  return Array.from(movEstoque.value || []);
});

const getEstoque = async () => {
  if (!loggedIn.value) return;

  try {
    const estoqueResponse = await $fetch(
      `${config.public.apiBase}/estoque/estoques`,
      {
        method: "GET",
        ...getToken(),
      },
    );
    estoques.value = estoqueResponse;

    const saidasResponse = await $fetch(
      `${config.public.apiBase}/estoque/saidas`,
      {
        method: "GET",
        ...getToken(),
      },
    );
    saidas.value = saidasResponse;
  } catch (error) {
    console.error("Error loading stock:", error);
  }
};

const getItens = async () => {
  if (!loggedIn.value) return;

  try {
    const response = await $fetch(`${config.public.apiBase}/item/bucarItens`, {
      method: "GET",
      ...getToken(),
    });

    itens.value = response;
  } catch (error) {
    console.error("Error loading items:", error);
  }
};

const getMovEstoque = async () => {
  if (!loggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/estoque/estoquesMov`,
      {
        method: "GET",
        ...getToken(),
      },
    );
    movEstoque.value = response;
  } catch (error) {
    console.error("Error loading inventory history:", error);
  }
};

const inventorio = async () => {
  for (let i = 0; i < itens.value.length; i++) {
    itens.value[i].inventory = 0;

    for (let x = 0; x < estoques.value.length; x++) {
      if (itens.value[i]._id?.toString() === estoques.value[x].id) {
        itens.value[i].inventory =
          estoques.value[x].qtd == null ? 0 : estoques.value[x].qtd;

        for (let y = 0; y < saidas.value.length; y++) {
          if (itens.value[i]._id?.toString() === saidas.value[y].id) {
            const s = saidas.value[y].qtd == null ? 0 : saidas.value[y].qtd;
            itens.value[i].inventory = itens.value[i].inventory - s;
          }
        }
      }
    }
  }
};

const limparDados = () => {
  qtdEntrada.value = "";
  vlr_unit.value = "";
  id_prod.value = "";
  cd_prod.value = "";
};

const carregarTabela = async () => {
  await getItens();
  await getEstoque();
  await inventorio();
  await getMovEstoque();
};

const salvarEntrada = async () => {
  if (qtdEntrada.value === "" || vlr_unit.value === "") {
    showSnackbar({
      message: "There are required fields in blank. Please fill them.",
      color: "error",
      timeout: 4000,
    });
    return;
  }

  try {
    await $fetch(`${config.public.apiBase}/estoque/addEstoque`, {
      method: "POST",
      body: {
        id_produto: id_prod.value,
        cod_prod: cd_prod.value,
        vlr_unidade: vlr_unit.value,
        qtd: qtdEntrada.value,
        tipo: 0,
      },
      ...getToken(),
    });

    await carregarTabela();
    limparDados();
    dialog.value = false;

    showSnackbar({
      message: "Inventory entry saved successfully!",
      color: "success",
      timeout: 3000,
    });
  } catch (error) {
    console.error(error);
    showSnackbar({
      message: "Error saving inventory entry.",
      color: "error",
      timeout: 3000,
    });
  }
};

const cancelar = () => {
  dialog.value = false;
  limparDados();
};

const addEntrada = (id, cd) => {
  inclusao.value = true;
  id_prod.value = id;
  cd_prod.value = cd;
  dialog.value = true;
};

const getInventoryClass = (inventory) => {
  if (inventory == 1) return "bg-red-500";
  if (inventory > 1 && inventory <= 3) return "bg-orange-500";
  if (inventory == null || inventory == 0) return "bg-zinc-500";
  return "bg-green-600";
};

const abrirMov = async () => {
  await getMovEstoque();
  inclusao.value = false;
  dialog.value = true;
};

const deleteMovimentacao = async (id) => {
  try {
    await $fetch(`${config.public.apiBase}/estoque/deletar/${id}`, {
      method: "DELETE",
      ...getToken(),
    });

    await carregarTabela();
    limparDados();

    showSnackbar({
      message: "Inventory movement deleted.",
      color: "success",
      timeout: 3000,
    });
  } catch (error) {
    console.error(error);
    showSnackbar({
      message: "Error deleting inventory movement.",
      color: "error",
      timeout: 3000,
    });
  }
};

const format = (data) => {
  const dt = new Date(data);
  const dia = dt.getDate();
  const mes = dt.getMonth() + 1;
  const ano = dt.getFullYear();
  return `${dia}/${mes}/${ano}`;
};

const saveQtd = async (qtd, id) => {
  try {
    await $fetch(`${config.public.apiBase}/estoque/editarQtd/${id}`, {
      method: "PUT",
      body: { qtd },
      ...getToken(),
    });

    showSnackbar({
      message: "Quantity updated!",
      color: "success",
      timeout: 3000,
    });
  } catch (error) {
    console.error(error);
    showSnackbar({
      message: "Error updating quantity.",
      color: "error",
      timeout: 3000,
    });
  }
};

onMounted(async () => {
  overlay.value = true;

  await getItens();
  await getEstoque();
  await inventorio();
  await getMovEstoque();

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
