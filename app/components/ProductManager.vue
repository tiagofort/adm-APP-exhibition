<template>
  <div
    class="mt-1 min-h-screen bg-gradient-to-br from-zinc-50 via-white to-slate-100/60"
    id="login-page"
  >
    <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
      <div
        v-if="overlay"
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/45 backdrop-blur-sm"
      >
        <div class="relative">
          <div
            class="h-16 w-16 animate-spin rounded-full border-4 border-white/25 border-t-white"
          ></div>
          <div class="absolute inset-0 rounded-full bg-white/10 blur-md"></div>
        </div>
      </div>

      <div v-if="isLoggedIn" class="mb-6">
        <div
          class="overflow-hidden rounded-3xl border border-white/60 bg-white/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] backdrop-blur-sm"
        >
          <div
            class="border-b border-zinc-100 bg-gradient-to-r from-white to-zinc-50/80 px-4 py-4 sm:px-5"
          >
            <div
              class="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between"
            >
              <div>
                <h2
                  class="text-lg font-semibold tracking-tight text-zinc-900 sm:text-xl"
                >
                  Product Manager
                </h2>
                <p class="mt-1 text-sm text-zinc-500">
                  Manage product information, complementary data, and images.
                </p>
              </div>

              <div class="flex flex-wrap items-center gap-2">
                <div
                  class="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-sm"
                  :class="stepClass(1)"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold"
                    :class="stepCircleClass(1)"
                  >
                    1
                  </span>
                  <span class="whitespace-nowrap">Products Data</span>
                </div>

                <div class="hidden h-px w-8 bg-zinc-300 xl:block"></div>

                <div
                  class="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-sm"
                  :class="stepClass(2)"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold"
                    :class="stepCircleClass(2)"
                  >
                    2
                  </span>
                  <span class="whitespace-nowrap">Products Complement</span>
                </div>

                <div class="hidden h-px w-8 bg-zinc-300 xl:block"></div>

                <div
                  class="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-medium shadow-sm"
                  :class="stepClass(3)"
                >
                  <span
                    class="flex h-7 w-7 items-center justify-center rounded-full border text-xs font-semibold"
                    :class="stepCircleClass(3)"
                  >
                    3
                  </span>
                  <span class="whitespace-nowrap">Pictures</span>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-zinc-50/70 p-3 sm:p-4">
            <div
              v-if="e1 === 1"
              class="rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Title
                  </label>
                  <input
                    v-model="dadosProd.txtTitulo"
                    :disabled="isDesabilitado"
                    type="text"
                    maxlength="25"
                    class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                    placeholder="This field must be filled"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Subtitle
                  </label>
                  <input
                    v-model="dadosProd.txtSubtitulo"
                    :disabled="isDesabilitado"
                    type="text"
                    maxlength="25"
                    class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                    placeholder="Optional"
                  />
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Select Type
                  </label>
                  <input
                    v-model="dadosProd.txtTipo"
                    :disabled="isDesabilitado"
                    list="tipos-list"
                    class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                    placeholder="Type"
                  />
                  <datalist id="tipos-list">
                    <option
                      v-for="tipo in getTipos"
                      :key="tipo"
                      :value="tipo"
                    />
                  </datalist>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Select Material
                  </label>
                  <input
                    v-model="dadosProd.txtMaterial"
                    :disabled="isDesabilitado"
                    list="materiais-list"
                    class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                    placeholder="Material"
                  />
                  <datalist id="materiais-list">
                    <option
                      v-for="material in getMateriais"
                      :key="material"
                      :value="material"
                    />
                  </datalist>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Select Stone
                  </label>
                  <input
                    v-model="dadosProd.txtPedra"
                    :disabled="isDesabilitado"
                    list="pedras-list"
                    class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                    placeholder="Stone"
                  />
                  <datalist id="pedras-list">
                    <option
                      v-for="pedra in getPedras"
                      :key="pedra"
                      :value="pedra"
                    />
                  </datalist>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Weight
                  </label>
                  <div class="relative">
                    <input
                      v-model="dadosProd.txtPeso"
                      :disabled="isDesabilitado"
                      type="text"
                      class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-20 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                      placeholder="Optional"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400"
                    >
                      grams
                    </span>
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Select Status
                  </label>
                  <select
                    v-model="dadosProd.txtSituacao"
                    :disabled="isDesabilitado"
                    class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                  >
                    <option value="">Select status</option>
                    <option
                      v-for="status in situacao"
                      :key="status"
                      :value="status"
                    >
                      {{ status }}
                    </option>
                  </select>
                </div>

                <div v-if="edicao || visualizacao">
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Product Code
                  </label>
                  <input
                    v-model="dadosProd.txtCod_prod"
                    disabled
                    type="text"
                    class="w-full rounded-2xl border border-zinc-200 bg-zinc-100 px-4 py-3 text-zinc-500"
                    placeholder="Blocked"
                  />
                </div>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  @click="e1 = e1 + 2"
                >
                  Preview
                </button>
                <button
                  type="button"
                  class="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  @click="e1 = e1 + 1"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              v-else-if="e1 === 2"
              class="rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Sale value
                  </label>
                  <div class="relative">
                    <input
                      v-model="dadosProd.txtPreco"
                      :disabled="isDesabilitado"
                      type="text"
                      class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-16 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                      placeholder="Sale value"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400"
                    >
                      euro
                    </span>
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Purchase Amount
                  </label>
                  <div class="relative">
                    <input
                      v-model="dadosProd.txtVlrCompra"
                      :disabled="isDesabilitado"
                      type="text"
                      class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-16 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                      placeholder="Purchase amount"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400"
                    >
                      euro
                    </span>
                  </div>
                </div>

                <div>
                  <label class="mb-2 block text-sm font-semibold text-zinc-700">
                    Discount
                  </label>
                  <div class="relative">
                    <input
                      v-model="dadosProd.txtDesconto"
                      :disabled="isDesabilitado"
                      type="text"
                      class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 pr-10 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                      placeholder="Optional"
                    />
                    <span
                      class="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-medium text-zinc-400"
                    >
                      %
                    </span>
                  </div>
                </div>

                <div class="flex items-end justify-end">
                  <Suggestion
                    v-if="btSugestao === false"
                    :selecionado="dadosProd"
                    :tdasugestoes="sugestoes"
                    :tdos_itens="itens_filtrados"
                    :removerSugest="removeSugestao"
                    :inserirSugest="insereSugestao"
                    :salvarAlteracoes="salvaAlteracoes"
                  />
                </div>
              </div>

              <div class="mt-4">
                <label class="mb-2 block text-sm font-semibold text-zinc-700">
                  Comments
                </label>
                <textarea
                  v-model="dadosProd.txtComentario"
                  :disabled="isDesabilitado"
                  rows="4"
                  class="w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-zinc-800 outline-none transition placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-4 focus:ring-zinc-200/60 disabled:bg-zinc-100"
                  placeholder="Comments"
                ></textarea>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  @click="e1 = e1 - 1"
                >
                  Preview
                </button>
                <button
                  type="button"
                  class="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  @click="e1 = e1 + 1"
                >
                  Next
                </button>
              </div>
            </div>

            <div
              v-else-if="e1 === 3"
              class="rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm sm:p-5"
            >
              <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
                <div class="xl:col-span-4" v-if="edicao || visualizacao">
                  <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <div
                      v-for="(img, index) in imagePreviewList"
                      :key="index"
                      class="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 p-2 shadow-sm"
                    >
                      <button
                        type="button"
                        class="w-full"
                        @click="deleteIMG(index + 1)"
                      >
                        <img
                          :src="img"
                          :alt="`Image ${index + 1}`"
                          class="h-24 w-full rounded-xl object-cover"
                        />
                        <div
                          v-if="edicao && img !== imgnull"
                          class="absolute inset-0 flex items-center justify-center bg-red-700/0 transition group-hover:bg-red-700/70"
                        >
                          <span
                            class="text-lg font-semibold text-white opacity-0 transition group-hover:opacity-100"
                          >
                            Delete
                          </span>
                        </div>
                      </button>
                      <div
                        class="mt-2 text-center text-sm font-semibold text-zinc-500"
                      >
                        {{ index + 1 }}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  :class="
                    edicao || visualizacao ? 'xl:col-span-8' : 'xl:col-span-12'
                  "
                >
                  <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div v-for="n in 6" :key="n">
                      <label
                        class="mb-2 block text-sm font-semibold text-zinc-700"
                      >
                        Image {{ n }}
                      </label>
                      <input
                        :disabled="isDesabilitado"
                        type="file"
                        accept="image/png, image/jpeg"
                        class="block w-full rounded-2xl border border-zinc-200 bg-white px-4 py-3 text-sm text-zinc-600 file:mr-4 file:rounded-xl file:border-0 file:bg-zinc-900 file:px-4 file:py-2 file:font-medium file:text-white hover:file:bg-zinc-800 disabled:bg-zinc-100"
                        @change="onFileChange($event, `i${n}`)"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div class="mt-6 flex flex-wrap gap-3">
                <button
                  type="button"
                  class="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  @click="e1 = e1 - 1"
                >
                  Preview
                </button>
                <button
                  type="button"
                  class="rounded-2xl bg-zinc-900 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-zinc-800"
                  @click="e1 = e1 - 2"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <BanerBlock v-if="!isLoggedIn" />

        <div class="mb-4 mt-1 flex flex-wrap gap-2">
          <button
            v-if="isLoggedIn"
            :disabled="btAdicionar"
            type="button"
            class="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="modoAdicionar"
          >
            <span class="text-lg">+</span>
            <span class="hidden sm:inline">Insert New</span>
          </button>

          <button
            v-if="isLoggedIn"
            :disabled="btConfirmar"
            type="button"
            class="inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="dialogMessagem"
          >
            <span>✓</span>
            <span class="hidden sm:inline">Save</span>
          </button>

          <button
            v-if="isLoggedIn"
            :disabled="btCancelar"
            type="button"
            class="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
            @click="modoCancelar"
          >
            <span>✕</span>
            <span class="hidden sm:inline">Cancel</span>
          </button>
        </div>

        <div
          v-if="dialogConfirm"
          class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/50 px-4 backdrop-blur-sm"
        >
          <div
            class="w-full max-w-md rounded-3xl border border-white/60 bg-white p-6 shadow-2xl"
          >
            <h3 class="text-xl font-semibold tracking-tight text-zinc-900">
              {{ txtTituloDialog }}
            </h3>
            <p class="mt-3 leading-6 text-zinc-600">
              {{ txtMsgDialog }}
            </p>

            <div class="mt-6 flex justify-end gap-3">
              <button
                type="button"
                class="rounded-2xl border border-zinc-200 px-4 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50"
                @click="dialogConfirm = false"
              >
                NO
              </button>
              <button
                type="button"
                class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                @click="modoConfirmar"
              >
                YES
              </button>
            </div>
          </div>
        </div>

        <div
          v-if="isLoggedIn && noItems"
          class="mx-auto max-w-full rounded-3xl border border-white/60 bg-white/90 p-6 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
        >
          <h3 class="text-xl font-semibold tracking-tight text-zinc-800">
            There is no one product registered
          </h3>
          <p class="mt-3 text-zinc-600">
            Please, click on the green button (+) to insert a new product
          </p>
        </div>

        <div
          v-if="isLoggedIn && !noItems"
          class="mx-auto max-w-full rounded-3xl border border-white/60 bg-white/90 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)]"
        >
          <div class="max-h-[500px] overflow-y-auto pr-1">
            <div
              v-for="product in paginatedItems"
              :key="product._id"
              class="mb-4 flex flex-col gap-4 rounded-3xl border border-zinc-100 bg-white p-4 shadow-sm transition hover:shadow-md md:flex-row md:items-center md:justify-between"
            >
              <div class="flex min-w-0 items-center gap-4">
                <img
                  :src="product?.midia?.url1 || imgnull"
                  alt="Product"
                  class="h-14 w-14 rounded-2xl border border-zinc-200 object-cover"
                />

                <div class="min-w-0">
                  <p class="truncate font-semibold text-zinc-900">
                    {{ product.titulo }}
                  </p>
                  <p class="truncate text-sm text-zinc-500 md:hidden">
                    {{ product.subtitulo }}
                  </p>
                </div>
              </div>

              <div class="hidden min-w-0 flex-1 px-4 text-zinc-600 md:block">
                <p class="truncate">{{ product.subtitulo }}</p>
              </div>

              <div class="hidden min-w-0 flex-1 px-4 text-zinc-600 md:block">
                <p class="truncate">{{ product.cod_prod }}</p>
              </div>

              <div class="flex items-center gap-2">
                <button
                  v-if="edicao === false && insercao === false"
                  type="button"
                  class="rounded-xl p-2.5 text-orange-700 transition hover:bg-orange-50"
                  @click="visualizar(product._id)"
                >
                  👁
                </button>

                <button
                  v-if="insercao === false"
                  type="button"
                  class="rounded-xl p-2.5 text-orange-700 transition hover:bg-orange-50"
                  @click="editar(product._id)"
                >
                  ✏️
                </button>

                <button
                  v-if="edicao === false && insercao === false"
                  type="button"
                  class="rounded-xl p-2.5 text-orange-700 transition hover:bg-orange-50"
                  @click="dialogMessagem(product._id)"
                >
                  🗑
                </button>
              </div>
            </div>
          </div>

          <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              class="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
              :disabled="currentPage === 1"
              @click="updatePage(currentPage - 1)"
            >
              Prev
            </button>

            <button
              v-for="page in totalPages"
              :key="page"
              type="button"
              class="rounded-xl px-3 py-2 text-sm font-medium transition"
              :class="
                page === currentPage
                  ? 'bg-zinc-900 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50'
              "
              @click="updatePage(page)"
            >
              {{ page }}
            </button>

            <button
              type="button"
              class="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-50 disabled:opacity-40"
              :disabled="currentPage === totalPages"
              @click="updatePage(currentPage + 1)"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, reactive, ref, watch } from "vue";
import BanerBlock from "../components/BannerBlock.vue";
import Suggestion from "../components/Suggestion.vue";
import imgNull from "../assets/utilities/insertPicture.png";

const { $notifier } = useNuxtApp();
const config = useRuntimeConfig();
const { loggedIn, initAuth } = useAuth();

const isLoggedIn = computed(() => loggedIn.value);

const currentPage = ref(1);
const itemsPerPage = ref(15);
const overlay = ref(false);
const imgnull = imgNull;

const txtTituloDialog = ref("");
const txtMsgDialog = ref("");
const dialogConfirm = ref(false);

const item = ref([]);
const chaveItens = ref(0);
const sugestoes = ref([]);
const urls = ref([]);
const tipos = ref([]);
const materiais = ref([]);
const pedras = ref([]);

const btAdicionar = ref(false);
const btConfirmar = ref(true);
const btCancelar = ref(true);
const btSugestao = ref(true);

const situacao = ref(["Active", "Inactive"]);
const isDesabilitado = ref(true);
const edicao = ref(false);
const insercao = ref(false);
const visualizacao = ref(false);
const e1 = ref(1);
const itens_filtrados = ref([]);

const item_img = reactive({
  i1: null,
  i2: null,
  i3: null,
  i4: null,
  i5: null,
  i6: null,
  v1: null,
});

const dadosProd = reactive({
  txtID: "",
  txtCod_prod: "",
  txtTitulo: "",
  txtSubtitulo: "",
  txtTipo: "",
  txtMaterial: "",
  txtPedra: "",
  txtPeso: "",
  txtDesconto: 0,
  txtComentario: "",
  mdia: {
    pic1: "",
    pic2: "",
    pic3: "",
    pic4: "",
    pic5: "",
    pic6: "",
    vdeo: "",
  },
  txtSituacao: "",
  txtPreco: "",
  txtVlrCompra: "",
});

const getTipos = computed(() => tipos.value);
const getMateriais = computed(() => materiais.value);
const getPedras = computed(() => pedras.value);

const totalPages = computed(() => {
  if (!Array.isArray(item.value) || item.value.length === 0) return 1;
  return Math.ceil(item.value.length / itemsPerPage.value);
});

const paginatedItems = computed(() => {
  if (!Array.isArray(item.value)) return [];
  const startIndex = (currentPage.value - 1) * itemsPerPage.value;
  const endIndex = startIndex + itemsPerPage.value;
  return item.value.slice(startIndex, endIndex);
});

const noItems = computed(() => !item.value || item.value.length === 0);

const imagePreviewList = computed(() => [
  dadosProd.mdia.pic1,
  dadosProd.mdia.pic2,
  dadosProd.mdia.pic3,
  dadosProd.mdia.pic4,
  dadosProd.mdia.pic5,
  dadosProd.mdia.pic6,
]);

function stepClass(step) {
  if (e1.value === step) return "bg-black text-white";
  if (e1.value > step) return "bg-green-100 text-green-700";
  return "bg-gray-100 text-gray-500";
}

function stepCircleClass(step) {
  if (e1.value === step) return "border-white text-white";
  if (e1.value > step) return "border-green-600 text-green-700";
  return "border-gray-400 text-gray-500";
}

function renderItens() {
  chaveItens.value += 1;
}

function updatePage(page) {
  if (page < 1 || page > totalPages.value) return;
  currentPage.value = page;
}

async function getItens() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(`${config.public.apiBase}/item/bucarItens`, {
      method: "GET",
      headers: getToken().headers,
    });

    item.value = response;
  } catch (error) {
    console.error(error);
  }
}

async function getCadProd() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/cadastros/buscaCadProd`,
      {
        method: "GET",
        headers: getToken().headers,
      },
    );

    tipos.value = response.balde1 || [];
    materiais.value = response.balde2 || [];
    pedras.value = response.balde3 || [];
  } catch (error) {
    console.error(error);
  }
}

function dialogMessagem(id) {
  if (insercao.value === true) {
    dialogConfirm.value = true;
    txtTituloDialog.value = "Inserting...";
    txtMsgDialog.value = "Do you want to save the new product?";
  } else if (edicao.value === true) {
    dialogConfirm.value = true;
    txtTituloDialog.value = "Editing...";
    txtMsgDialog.value = "Do you want to save the changes you have made?";
  } else if (edicao.value === false && insercao.value === false) {
    dialogConfirm.value = true;
    txtTituloDialog.value = "Deleting...";
    txtMsgDialog.value = "Do you want to confirm and delete the product?";
    setarDados(id);
  }
}

function hasRequiredInsertFields() {
  return !(
    dadosProd.txtTitulo === "" ||
    dadosProd.txtTipo === "" ||
    dadosProd.txtMaterial === "" ||
    dadosProd.txtPedra === "" ||
    dadosProd.txtSituacao === "" ||
    dadosProd.txtPreco === "" ||
    dadosProd.txtVlrCompra === "" ||
    dadosProd.mdia.pic1 === ""
  );
}

function hasRequiredEditFields() {
  return !(
    dadosProd.txtTitulo === "" ||
    dadosProd.txtTipo === "" ||
    dadosProd.txtMaterial === "" ||
    dadosProd.txtPedra === "" ||
    dadosProd.txtSituacao === "" ||
    dadosProd.txtPreco === "" ||
    dadosProd.txtVlrCompra === ""
  );
}

async function modoConfirmar() {
  if (insercao.value === true) {
    if (!hasRequiredInsertFields()) {
      $notifier?.showMessage?.({
        content: "There is/are required fields in blank. Please fill them",
        color: "red",
        time: 4000,
      });
    } else {
      overlay.value = true;
      await salvarImagens();
      await salvarNovo();
      await getItens();

      $notifier?.showMessage?.({
        content: "The Product has been inserted!",
        color: "green",
        time: 3000,
      });

      limparDados();
      renderItens();
      dialogConfirm.value = false;
    }
  } else if (edicao.value === true) {
    if (!hasRequiredEditFields()) {
      $notifier?.showMessage?.({
        content: "There is/are required fields in blank. Please fill them",
        color: "red",
        time: 4000,
      });
    } else {
      overlay.value = true;
      await salvarImagens();
      await editarDados();
      await getItens();

      $notifier?.showMessage?.({
        content: "The Product has been edited!",
        color: "green",
        time: 3000,
      });

      limparDados();
      renderItens();
      dialogConfirm.value = false;
    }
  } else if (edicao.value === false && insercao.value === false) {
    overlay.value = true;
    await deletar();

    $notifier?.showMessage?.({
      content: "The Product has been deleted!",
      color: "green",
      time: 3000,
    });

    dialogConfirm.value = false;
  }
}

function modoAdicionar() {
  limparDados();
  insercao.value = true;
  btAdicionar.value = true;
  btConfirmar.value = false;
  btCancelar.value = false;
  isDesabilitado.value = false;
}

function modoCancelar() {
  btAdicionar.value = false;
  btConfirmar.value = true;
  btCancelar.value = true;
  isDesabilitado.value = true;
  edicao.value = false;
  insercao.value = false;
  visualizacao.value = false;
  limparDados();
}

function limparDados() {
  e1.value = 1;
  dadosProd.txtCod_prod = "";
  dadosProd.txtID = "";
  dadosProd.txtTitulo = "";
  dadosProd.txtSubtitulo = "";
  dadosProd.txtTipo = "";
  dadosProd.txtMaterial = "";
  dadosProd.txtPedra = "";
  dadosProd.txtPeso = "";
  dadosProd.txtComentario = "";
  dadosProd.txtSituacao = "";
  dadosProd.txtPreco = "";
  dadosProd.txtVlrCompra = "";
  dadosProd.txtDesconto = 0;
  dadosProd.mdia.pic1 = imgnull;
  dadosProd.mdia.pic2 = imgnull;
  dadosProd.mdia.pic3 = imgnull;
  dadosProd.mdia.pic4 = imgnull;
  dadosProd.mdia.pic5 = imgnull;
  dadosProd.mdia.pic6 = imgnull;
  dadosProd.mdia.vdeo = imgnull;

  urls.value = [];

  item_img.i1 = null;
  item_img.i2 = null;
  item_img.i3 = null;
  item_img.i4 = null;
  item_img.i5 = null;
  item_img.i6 = null;

  btAdicionar.value = false;
  btConfirmar.value = true;
  btSugestao.value = true;
  btCancelar.value = true;
  isDesabilitado.value = true;
  insercao.value = false;
  edicao.value = false;
  visualizacao.value = false;
}

function visualizar(id) {
  setarDados(id);
  visualizacao.value = true;
}

async function editar(id) {
  setarDados(id);
  await getSugestoes();
  edicao.value = true;
  btAdicionar.value = true;
  btConfirmar.value = false;
  btSugestao.value = false;
  btCancelar.value = false;
  isDesabilitado.value = false;
}

async function deletar() {
  try {
    await $fetch(`${config.public.apiBase}/item/apagar/${dadosProd.txtID}`, {
      method: "DELETE",
      headers: getToken().headers,
    });

    await getItens();
    renderItens();
    limparDados();
  } catch (error) {
    console.error(error);
  }
}

function setarDados(id) {
  const dados = item.value.filter((i) => i._id === id);
  if (!dados.length) return;

  itens_filtrados.value = item.value.filter((i) => i._id !== id);

  dadosProd.txtID = dados[0]._id;
  dadosProd.txtCod_prod = dados[0].cod_prod;
  dadosProd.txtTitulo = dados[0].titulo;
  dadosProd.txtSubtitulo = dados[0].subtitulo;
  dadosProd.txtTipo = dados[0].tipo;
  dadosProd.txtMaterial = dados[0].material;
  dadosProd.txtPedra = dados[0].pedra;
  dadosProd.txtPeso = dados[0].peso;
  dadosProd.txtComentario = dados[0].comentario;
  dadosProd.txtDesconto = dados[0].desconto || 0;
  dadosProd.txtSituacao = dados[0].situacao === true ? "Active" : "Inactive";
  dadosProd.txtPreco = dados[0].preco;
  dadosProd.txtVlrCompra = dados[0].valor_compra;

  dadosProd.mdia.pic1 = dados[0].midia?.url1 || imgnull;
  dadosProd.mdia.pic2 = dados[0].midia?.url2 || imgnull;
  dadosProd.mdia.pic3 = dados[0].midia?.url3 || imgnull;
  dadosProd.mdia.pic4 = dados[0].midia?.url4 || imgnull;
  dadosProd.mdia.pic5 = dados[0].midia?.url5 || imgnull;
  dadosProd.mdia.pic6 = dados[0].midia?.url6 || imgnull;
  dadosProd.mdia.vdeo = dados[0].midia?.video || imgnull;
}

async function uploadSingleImage(file, fallbackValue) {
  if (file) {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await $fetch(
        `${config.public.apiBase}/envio_imagem_prod/salvar`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: getToken().headers.Authorization,
          },
        },
      );

      setURL(response);
    } catch (error) {
      console.error(error);
      setURL("");
    }
  } else {
    if (fallbackValue === imgnull) {
      setURL("");
    } else {
      setURL(fallbackValue);
    }
  }
}

async function salvarImagens() {
  urls.value = [];

  await uploadSingleImage(item_img.i1, dadosProd.mdia.pic1);
  await uploadSingleImage(item_img.i2, dadosProd.mdia.pic2);
  await uploadSingleImage(item_img.i3, dadosProd.mdia.pic3);
  await uploadSingleImage(item_img.i4, dadosProd.mdia.pic4);
  await uploadSingleImage(item_img.i5, dadosProd.mdia.pic5);
  await uploadSingleImage(item_img.i6, dadosProd.mdia.pic6);
}

async function salvarNovo() {
  try {
    await $fetch(`${config.public.apiBase}/item/salvar`, {
      method: "POST",
      headers: getToken().headers,
      body: {
        titulo: dadosProd.txtTitulo,
        subtitulo: dadosProd.txtSubtitulo,
        tipo: dadosProd.txtTipo,
        material: dadosProd.txtMaterial,
        pedra: dadosProd.txtPedra,
        peso: dadosProd.txtPeso,
        comentario: dadosProd.txtComentario,
        midia: {
          url1: urls.value[0] == null ? "" : urls.value[0],
          url2: urls.value[1] == null ? "" : urls.value[1],
          url3: urls.value[2] == null ? "" : urls.value[2],
          url4: urls.value[3] == null ? "" : urls.value[3],
          url5: urls.value[4] == null ? "" : urls.value[4],
          url6: urls.value[5] == null ? "" : urls.value[5],
          video: urls.value[6] == null ? "" : urls.value[6],
        },
        situacao: dadosProd.txtSituacao === "Active",
        preco: dadosProd.txtPreco,
        valor_compra: dadosProd.txtVlrCompra,
        desconto: dadosProd.txtDesconto,
        sugestoes: [""],
      },
    });

    limparDados();
  } catch (error) {
    console.error(error);
  }
}

async function editarDados() {
  try {
    dadosProd.mdia.pic1 =
      dadosProd.mdia.pic1 === imgnull ? "" : dadosProd.mdia.pic1;
    dadosProd.mdia.pic2 =
      dadosProd.mdia.pic2 === imgnull ? "" : dadosProd.mdia.pic2;
    dadosProd.mdia.pic3 =
      dadosProd.mdia.pic3 === imgnull ? "" : dadosProd.mdia.pic3;
    dadosProd.mdia.pic4 =
      dadosProd.mdia.pic4 === imgnull ? "" : dadosProd.mdia.pic4;
    dadosProd.mdia.pic5 =
      dadosProd.mdia.pic5 === imgnull ? "" : dadosProd.mdia.pic5;
    dadosProd.mdia.pic6 =
      dadosProd.mdia.pic6 === imgnull ? "" : dadosProd.mdia.pic6;

    await $fetch(`${config.public.apiBase}/item/editar/${dadosProd.txtID}`, {
      method: "PUT",
      headers: getToken().headers,
      body: {
        titulo: dadosProd.txtTitulo,
        subtitulo: dadosProd.txtSubtitulo,
        tipo: dadosProd.txtTipo,
        material: dadosProd.txtMaterial,
        pedra: dadosProd.txtPedra,
        peso: dadosProd.txtPeso,
        comentario: dadosProd.txtComentario,
        midia: {
          url1: urls.value[0] == null ? dadosProd.mdia.pic1 : urls.value[0],
          url2: urls.value[1] == null ? dadosProd.mdia.pic2 : urls.value[1],
          url3: urls.value[2] == null ? dadosProd.mdia.pic3 : urls.value[2],
          url4: urls.value[3] == null ? dadosProd.mdia.pic4 : urls.value[3],
          url5: urls.value[4] == null ? dadosProd.mdia.pic5 : urls.value[4],
          url6: urls.value[5] == null ? dadosProd.mdia.pic6 : urls.value[5],
          video: urls.value[6] == null ? dadosProd.mdia.vdeo : urls.value[6],
        },
        situacao: dadosProd.txtSituacao === "Active",
        preco: dadosProd.txtPreco,
        valor_compra: dadosProd.txtVlrCompra,
        desconto: dadosProd.txtDesconto,
      },
    });

    limparDados();
  } catch (error) {
    console.error(error);
  }
}

function deleteIMG(i) {
  if (edicao.value === true) {
    if (i === 1) dadosProd.mdia.pic1 = imgnull;
    if (i === 2) dadosProd.mdia.pic2 = imgnull;
    if (i === 3) dadosProd.mdia.pic3 = imgnull;
    if (i === 4) dadosProd.mdia.pic4 = imgnull;
    if (i === 5) dadosProd.mdia.pic5 = imgnull;
    if (i === 6) dadosProd.mdia.pic6 = imgnull;
    renderItens();
  }
}

function setURL(u) {
  urls.value.push(u);
}

async function getSugestoes() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/item/buscar_sugestoes/${dadosProd.txtID}`,
      {
        method: "GET",
        headers: getToken().headers,
      },
    );

    sugestoes.value = response;
  } catch (error) {
    console.error(error);
  }
}

function removeSugestao(id) {
  sugestoes.value = sugestoes.value.filter((i) => i._id !== id);
}

function insereSugestao(id) {
  const seDuplicado = sugestoes.value.filter((s) => s._id === id);

  if (seDuplicado.length > 0) {
    $notifier?.showMessage?.({
      content: "You are trying to insert an item already linked as suggestion!",
      color: "red",
      time: 3000,
    });
  } else {
    const temp = item.value.filter((i) => i._id === id);
    if (temp[0]) sugestoes.value.push(temp[0]);
  }
}

async function salvaAlteracoes() {
  try {
    const ids_sugestoes = sugestoes.value.map((obj) => obj._id);

    await $fetch(
      `${config.public.apiBase}/item/gerir_sugestoes/${dadosProd.txtID}`,
      {
        method: "PUT",
        headers: getToken().headers,
        body: { sugestoes: ids_sugestoes },
      },
    );

    $notifier?.showMessage?.({
      content: "Suggestions have been saved!",
      color: "green",
      time: 3000,
    });
  } catch (error) {
    console.error(error);
  }
}

function getToken() {
  let token = null;

  if (process.client) {
    token = localStorage.getItem("auth._token.local");
  }

  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  };
}

function onFileChange(event, key) {
  const file = event.target.files?.[0] || null;
  item_img[key] = file;
}

watch(overlay, (val) => {
  if (val) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
});

onMounted(async () => {
  initAuth();
  limparDados();

  if (isLoggedIn.value) {
    await getItens();
    await getCadProd();
  }

  overlay.value = true;
});
</script>
