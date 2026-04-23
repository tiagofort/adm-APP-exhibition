<template>
  <section
    class="bg-gradient-to-br from-zinc-50 via-white to-orange-50/30 p-3 sm:p-4 lg:p-6"
  >
    <div v-if="!loggedIn">
      <BannerBlock />
    </div>

    <div v-else class="grid gap-5 xl:grid-cols-2">
      <div>
        <div class="mb-3">
          <h2
            class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
          >
            Orders
          </h2>
          <p class="text-sm text-zinc-500">
            Track and manage incoming customer orders.
          </p>
        </div>

        <div
          class="h-[700px] overflow-y-auto rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm sm:p-5"
        >
          <div class="mb-5 flex flex-wrap gap-3">
            <label
              class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-orange-300 hover:bg-orange-50"
            >
              <input
                v-model="filtro"
                type="radio"
                name="status"
                value="0"
                @change="filtrar"
                class="accent-orange-600"
              />
              <span>Pending</span>
            </label>

            <label
              class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-emerald-300 hover:bg-emerald-50"
            >
              <input
                v-model="filtro"
                type="radio"
                name="status"
                value="1"
                @change="filtrar"
                class="accent-emerald-600"
              />
              <span>Finished</span>
            </label>

            <label
              class="inline-flex cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 shadow-sm transition hover:border-red-300 hover:bg-red-50"
            >
              <input
                v-model="filtro"
                type="radio"
                name="status"
                value="2"
                @change="filtrar"
                class="accent-red-600"
              />
              <span>Canceled</span>
            </label>

            <button
              type="button"
              @click="limparFiltro"
              class="rounded-full border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-600 transition hover:border-blue-300 hover:bg-blue-100"
            >
              Clear
            </button>
          </div>

          <div
            v-if="pedidos.length === 0"
            class="flex h-[calc(100%-72px)] items-center justify-center text-center"
          >
            <div
              class="rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-8"
            >
              <strong
                ><p class="text-zinc-700">There are no orders yet</p></strong
              >
            </div>
          </div>

          <div v-else class="space-y-3">
            <button
              v-for="item in pedidos"
              :key="item._id"
              type="button"
              @click="details(item.id_pedido)"
              class="block w-full rounded-2xl border border-transparent p-3 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4"
              :class="getCardClass(item.status)"
            >
              <div class="flex items-center gap-3 sm:gap-4">
                <img
                  :src="item.img1"
                  alt="Product image"
                  class="h-14 w-14 rounded-2xl object-cover ring-2 ring-white/70"
                />

                <div class="min-w-0">
                  <p
                    class="truncate text-sm font-semibold text-zinc-900 sm:text-base"
                  >
                    Product: {{ item.produto }} - {{ item.tipo }}
                  </p>
                  <p class="mt-1 truncate text-sm text-zinc-700">
                    Customer: {{ item.nome_remetente }}
                  </p>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div class="mb-3">
          <h2
            class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
          >
            Order detail
          </h2>
          <p class="text-sm text-zinc-500">
            View product and customer information for the selected order.
          </p>
        </div>

        <div
          class="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm"
        >
          <div v-if="item_detail.length === 0" class="p-8 text-center sm:p-10">
            <div
              class="rounded-2xl border border-zinc-100 bg-zinc-50 px-6 py-8"
            >
              <strong>
                <p class="text-zinc-700">
                  Select an order on Orders to see more details
                </p>
              </strong>
            </div>
          </div>

          <div v-else class="p-4 sm:p-5 lg:p-6">
            <h2
              class="text-xl font-semibold tracking-tight text-zinc-900 sm:text-2xl"
            >
              {{ item_detail[0].titulo }}
            </h2>

            <hr class="my-5 border-zinc-100" />

            <h3
              class="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500"
            >
              Product Details
            </h3>

            <div class="space-y-5">
              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong class="text-zinc-900">Product code:</strong>
                  <span class="text-zinc-700">
                    {{ item_detail[0].cod_prod }}</span
                  >
                </div>

                <div class="flex justify-start sm:justify-end">
                  <div class="rounded-2xl bg-zinc-100 p-1 shadow-sm">
                    <img
                      :src="item_detail[0].img1"
                      alt="Product"
                      class="h-14 w-14 rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Product:</strong> {{ item_detail[0].produto }}
                </div>
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Type:</strong> {{ item_detail[0].tipo }}
                </div>
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Stone:</strong> {{ item_detail[0].pedra }}
                </div>
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Material:</strong> {{ item_detail[0].material }}
                </div>
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Price:</strong> {{ item_detail[0].preco }}€
                </div>
              </div>

              <hr class="border-zinc-100" />

              <h3
                class="mb-3 text-sm font-semibold uppercase tracking-wide text-zinc-500"
              >
                Customer Details
              </h3>

              <div class="grid gap-4 sm:grid-cols-2">
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Customer name:</strong>
                  {{ item_detail[0].nome_remetente }}
                </div>

                <div class="flex justify-start sm:justify-end">
                  <div class="rounded-2xl bg-zinc-100 p-1 shadow-sm">
                    <img
                      :src="item_detail[0].avatar"
                      alt="Customer avatar"
                      class="h-14 w-14 rounded-2xl object-cover"
                    />
                  </div>
                </div>
              </div>

              <div class="grid gap-3 sm:grid-cols-2">
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Email:</strong> {{ item_detail[0].email }}
                </div>
                <div
                  class="rounded-2xl border border-zinc-100 bg-zinc-50 px-4 py-3"
                >
                  <strong>Phone number:</strong> {{ item_detail[0].phone }}
                </div>
              </div>
            </div>

            <hr class="my-5 border-zinc-100" />

            <div class="flex justify-end gap-2">
              <div class="hidden flex-wrap sm:flex sm:gap-2">
                <button
                  v-if="item_detail[0].status === 0"
                  type="button"
                  @click="markDone"
                  class="rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Make as done
                </button>

                <button
                  v-if="
                    item_detail[0].status === 1 || item_detail[0].status === 2
                  "
                  type="button"
                  @click="reopen"
                  class="rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-amber-600"
                >
                  Reopen
                </button>

                <button
                  v-if="
                    item_detail[0].status !== 2 && item_detail[0].status !== 1
                  "
                  type="button"
                  @click="cancel"
                  class="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700"
                >
                  Cancel order
                </button>
              </div>

              <div class="flex gap-2 sm:hidden">
                <button
                  v-if="item_detail[0].status === 0"
                  type="button"
                  @click="markDone"
                  class="rounded-2xl bg-emerald-600 p-3 text-white shadow-sm"
                  aria-label="Mark done"
                >
                  ✓
                </button>

                <button
                  v-if="
                    item_detail[0].status === 1 || item_detail[0].status === 2
                  "
                  type="button"
                  @click="reopen"
                  class="rounded-2xl bg-amber-500 p-3 text-white shadow-sm"
                  aria-label="Reopen"
                >
                  ↻
                </button>

                <button
                  v-if="
                    item_detail[0].status !== 2 && item_detail[0].status !== 1
                  "
                  type="button"
                  @click="cancel"
                  class="rounded-2xl bg-red-600 p-3 text-white shadow-sm"
                  aria-label="Cancel"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";

const config = useRuntimeConfig();
const { loggedIn } = useAuth();
const { showSnackbar } = useSnackbar();

const pedidos = ref([]);
const bkp_pedidos = ref([]);
const item_detail = ref([]);
const filtro = ref("");

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

const getPedidos = async () => {
  if (!loggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/pedido/buscar_todos`,
      {
        ...getToken(),
      },
    );

    pedidos.value = response;
    bkp_pedidos.value = response;
  } catch (error) {
    console.error(error);
    showSnackbar({
      message: "Error loading orders.",
      color: "error",
      timeout: 3000,
    });
  }
};

const markDone = async () => {
  try {
    await $fetch(
      `${config.public.apiBase}/pedido/status/${item_detail.value[0].id_pedido}/1`,
      {
        method: "PUT",
        ...getToken(),
      },
    );

    await getPedidos();
    details(item_detail.value[0].id_pedido);
    item_detail.value[0].status = 1;

    showSnackbar({
      message: "Order marked as done.",
      color: "success",
      timeout: 2500,
    });
  } catch (error) {
    console.error(error);
  }
};

const reopen = async () => {
  try {
    await $fetch(
      `${config.public.apiBase}/pedido/status/${item_detail.value[0].id_pedido}/0`,
      {
        method: "PUT",
        ...getToken(),
      },
    );

    await getPedidos();
    details(item_detail.value[0].id_pedido);
    item_detail.value[0].status = 0;

    showSnackbar({
      message: "Order reopened.",
      color: "success",
      timeout: 2500,
    });
  } catch (error) {
    console.error(error);
  }
};

const cancel = async () => {
  try {
    await $fetch(
      `${config.public.apiBase}/pedido/status/${item_detail.value[0].id_pedido}/2`,
      {
        method: "PUT",
        ...getToken(),
      },
    );

    await getPedidos();
    details(item_detail.value[0].id_pedido);
    item_detail.value[0].status = 2;

    showSnackbar({
      message: "Order canceled.",
      color: "success",
      timeout: 2500,
    });
  } catch (error) {
    console.error(error);
  }
};

const details = (id) => {
  item_detail.value = bkp_pedidos.value.filter(
    (number) => number.id_pedido == id,
  );
};

const getCardClass = (status) => {
  if (status == 0) return "bg-green-200";
  if (status == 1) return "bg-zinc-100";
  if (status == 2) return "bg-orange-200";
  return "bg-white";
};

const filtrar = () => {
  pedidos.value = [...bkp_pedidos.value];

  if (filtro.value === "0") {
    pedidos.value = pedidos.value.filter((item) => item.status == 0);
  } else if (filtro.value === "1") {
    pedidos.value = pedidos.value.filter((item) => item.status == 1);
  } else if (filtro.value === "2") {
    pedidos.value = pedidos.value.filter((item) => item.status == 2);
  }
};

const limparFiltro = () => {
  filtro.value = "";
  pedidos.value = [...bkp_pedidos.value];
};

onMounted(() => {
  getPedidos();
});
</script>
