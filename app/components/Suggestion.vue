<template>
  <div class="flex justify-center">
    <button
      type="button"
      class="mt-4 inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      @click="dialogSuggest = true"
    >
      Manage Suggestions
    </button>

    <Transition name="fade">
      <div
        v-if="dialogSuggest"
        class="fixed inset-0 z-40 bg-slate-950/55 backdrop-blur-sm"
        @click="fecharDialog"
      />
    </Transition>

    <Transition name="slide-up">
      <div
        v-if="dialogSuggest"
        class="fixed inset-0 z-50 overflow-y-auto bg-slate-50/95 backdrop-blur-sm"
      >
        <div class="min-h-screen p-3 sm:p-4 md:p-6">
          <div
            class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.35)]"
          >
            <div
              class="flex flex-col gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <div class="flex items-center gap-3">
                <button
                  type="button"
                  class="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-100"
                  @click="fecharDialog"
                >
                  ✕
                </button>
                <div>
                  <h2
                    class="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
                  >
                    Managing Suggestions
                  </h2>
                  <p class="text-sm text-slate-500">
                    Organize related products with a cleaner visual workflow.
                  </p>
                </div>
              </div>

              <button
                type="button"
                class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                @click="save"
              >
                Save
              </button>
            </div>

            <div
              class="grid grid-cols-1 gap-4 p-4 sm:p-5 lg:grid-cols-11 lg:items-center lg:gap-5"
            >
              <div :class="leftColClass">
                <div
                  class="h-[500px] overflow-y-auto rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm"
                >
                  <div>
                    <p
                      class="mb-3 text-left text-sm font-semibold text-slate-800"
                    >
                      Product Selected
                    </p>

                    <div
                      class="mb-4 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
                    >
                      <div class="flex items-center gap-4">
                        <img
                          :src="selecionado?.mdia?.pic1 || fallbackImage"
                          alt="Selected product"
                          class="h-14 w-14 rounded-xl border border-slate-200 object-cover bg-slate-50"
                        />

                        <div class="min-w-0">
                          <p
                            class="truncate text-sm font-semibold text-slate-900"
                          >
                            {{
                              `${selecionado?.txtTitulo || ""} - ${selecionado?.txtSubtitulo || ""} - ${selecionado?.txtPedra || ""}`
                            }}
                          </p>
                          <p class="truncate text-sm text-slate-500">
                            {{ selecionado?.txtCod_prod || "" }}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div
                      class="mb-4 h-px w-full bg-gradient-to-r from-transparent via-slate-300 to-transparent"
                    ></div>

                    <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      <button
                        v-for="sugestao in getSugestoes"
                        :key="sugestao._id"
                        type="button"
                        class="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                        :class="
                          selected_sugestao === sugestao._id
                            ? 'border-slate-900 ring-2 ring-slate-200'
                            : 'border-slate-200 hover:border-slate-400'
                        "
                        @click="selectingSugestao(sugestao._id)"
                      >
                        <img
                          :src="sugestao?.midia?.url1 || fallbackImage"
                          :alt="sugestao?.titulo || 'Suggestion image'"
                          class="h-[130px] w-full object-contain bg-white p-2"
                        />

                        <div
                          v-if="selected_sugestao === sugestao._id"
                          class="absolute inset-0 flex items-center justify-center bg-slate-950/65 backdrop-blur-[1px]"
                        >
                          <div
                            class="rounded-full border border-white/10 bg-white/15 px-3 py-1 text-sm font-semibold text-white"
                          >
                            Selected
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div :class="arrowColClass">
                <div class="flex h-full items-center justify-center">
                  <div class="hidden flex-col gap-4 lg:flex">
                    <button
                      type="button"
                      class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                      @click="removerSugest(selected_sugestao)"
                    >
                      →
                    </button>

                    <button
                      type="button"
                      class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                      @click="inserirSugest(selected_item)"
                    >
                      ←
                    </button>
                  </div>

                  <div class="flex gap-4 lg:hidden">
                    <button
                      type="button"
                      class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                      @click="inserirSugest(selected_item)"
                    >
                      ↑
                    </button>

                    <button
                      type="button"
                      class="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
                      @click="removerSugest(selected_sugestao)"
                    >
                      ↓
                    </button>
                  </div>
                </div>
              </div>

              <div :class="rightColClass">
                <div
                  class="h-[500px] overflow-y-auto rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-4 shadow-sm"
                >
                  <div
                    class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
                  >
                    <button
                      v-for="item in getListItens"
                      :key="item._id"
                      type="button"
                      class="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                      :class="
                        selected_item === item._id
                          ? 'border-slate-900 ring-2 ring-slate-200'
                          : 'border-slate-200 hover:border-slate-400'
                      "
                      @click="selectingItens(item._id)"
                    >
                      <img
                        :src="item?.midia?.url1 || fallbackImage"
                        :alt="item?.titulo || 'Item image'"
                        class="h-[130px] w-full object-contain bg-white p-2"
                      />

                      <div
                        v-if="selected_item === item._id"
                        class="absolute inset-0 flex items-center justify-center bg-slate-950/65 backdrop-blur-[1px]"
                      >
                        <div
                          class="rounded-full border border-white/10 bg-white/15 px-3 py-1 text-sm font-semibold text-white"
                        >
                          Selected
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";

const props = defineProps({
  selecionado: {
    type: Object,
    default: () => ({}),
  },
  tdasugestoes: {
    type: Array,
    default: () => [],
  },
  tdos_itens: {
    type: Array,
    default: () => [],
  },
  removerSugest: {
    type: Function,
    required: true,
  },
  inserirSugest: {
    type: Function,
    required: true,
  },
  fechaSugestao: {
    type: Function,
    default: null,
  },
  salvarAlteracoes: {
    type: Function,
    required: true,
  },
});

const dialogSuggest = ref(false);
const selected_sugestao = ref(null);
const selected_item = ref(null);

const fallbackImage = "/utilities/insertPicture.png";

const getListItens = computed(() => props.tdos_itens || []);
const getSugestoes = computed(() => props.tdasugestoes || []);

const leftColClass = computed(() => "lg:col-span-5");
const arrowColClass = computed(() => "lg:col-span-1");
const rightColClass = computed(() => "lg:col-span-5");

function fecharDialog() {
  dialogSuggest.value = false;
}

function selectingItens(id) {
  selected_item.value = id;
}

function selectingSugestao(id) {
  selected_sugestao.value = id;
}

function save() {
  dialogSuggest.value = false;
  props.salvarAlteracoes();
}
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

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease;
}

.slide-up-enter-from,
.slide-up-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
