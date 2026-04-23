<template>
  <div class="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
    <div
      v-if="overlay"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 backdrop-blur-sm"
    >
      <div
        class="h-16 w-16 animate-spin rounded-full border-4 border-white/25 border-t-white shadow-lg"
      />
    </div>

    <BanerBlock v-if="!isLoggedIn" />

    <div v-else class="space-y-6">
      <div class="flex justify-end">
        <div class="relative">
          <button
            @click="showMenu = !showMenu"
            class="inline-flex items-center justify-center rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
          >
            Actions
          </button>

          <div
            v-if="showMenu"
            class="absolute right-0 top-full z-30 mt-2 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_-20px_rgba(15,23,42,0.35)]"
          >
            <button
              v-for="item in items"
              :key="item.title"
              @click="btAcoes(item.title)"
              class="block w-full border-b border-slate-100 px-4 py-3 text-left text-sm font-medium text-slate-700 transition last:border-b-0 hover:bg-slate-50"
            >
              {{ item.title }}
            </button>
          </div>
        </div>
      </div>

      <div
        class="rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_20px_60px_-20px_rgba(15,23,42,0.22)] sm:p-6 lg:p-8"
      >
        <div class="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-6">
          <button
            @click="prevSlide"
            class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 lg:mx-0"
          >
            ←
          </button>

          <div class="flex min-w-0 flex-1 flex-col items-center gap-6">
            <div
              class="flex w-full items-center justify-center rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-3 shadow-inner sm:p-4"
            >
              <div
                class="flex aspect-square w-full max-w-[500px] items-center justify-center overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm"
              >
                <img
                  :src="imgPrincipal"
                  class="h-full w-full object-contain p-2 sm:p-3"
                />
              </div>
            </div>

            <div
              class="flex w-full max-w-full items-center justify-start gap-2 overflow-x-auto pb-2 sm:justify-center"
            >
              <button
                v-for="(n, index) in slides"
                :key="n._id"
                @click="selecionarImagemByIndex(index)"
                class="flex h-16 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl border bg-white p-1.5 shadow-sm transition sm:h-20 sm:w-24"
                :class="
                  currentIndex === index
                    ? 'border-slate-900 ring-2 ring-slate-200'
                    : 'border-slate-200 hover:border-slate-400'
                "
              >
                <img
                  :src="n.url"
                  alt="Slide thumbnail"
                  class="h-full w-full object-contain rounded-md"
                />
              </button>
            </div>
          </div>

          <button
            @click="nextSlide"
            class="mx-auto flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-2xl font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 lg:mx-0"
          >
            →
          </button>
        </div>
      </div>
    </div>

    <div
      v-if="dialog"
      class="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm"
    >
      <div
        class="w-full overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_80px_-20px_rgba(15,23,42,0.45)]"
        :class="dialogSize === 520 ? 'max-w-2xl' : 'max-w-md'"
      >
        <div class="border-b border-slate-200 bg-slate-50/80 px-5 py-4 sm:px-6">
          <h2
            class="text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
          >
            {{ tituloDialog }}
          </h2>
        </div>

        <div class="space-y-5 px-5 py-5 sm:px-6">
          <p class="text-sm leading-6 text-slate-600">{{ textoDialog }}</p>

          <div v-if="modoDelete === false && modoinsert === false">
            <label class="mb-2 block text-sm font-medium text-slate-700">
              Select the new position
            </label>
            <select
              v-model="pos_alterada"
              class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">Select the new position</option>
              <option v-for="pos in posicoes" :key="pos" :value="pos">
                {{ pos }}
              </option>
            </select>
          </div>

          <template v-if="modoDelete === false && modoEdit === false">
            <div>
              <label class="mb-2 block text-sm font-medium text-slate-700">
                Select product
              </label>
              <select
                v-model="produto"
                @change="selecionarMidia"
                class="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-400 focus:ring-4 focus:ring-slate-100"
              >
                <option value="">Select a product</option>
                <option
                  v-for="item in produtos"
                  :key="item._id"
                  :value="item._id"
                >
                  {{ item.titulo }} - {{ item.cod_prod }}
                </option>
              </select>
            </div>

            <div
              v-if="midia.length > 0"
              class="flex flex-wrap gap-3 px-4 sm:px-6"
            >
              <button
                v-for="(img, i) in midia"
                :key="`${img.url}-${i}`"
                @click="selecionarIMG(img.url, i)"
                type="button"
                class="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border bg-white p-1.5 shadow-sm transition sm:h-20 sm:w-20"
                :class="
                  url_selecionada === img.url
                    ? 'border-emerald-600 ring-2 ring-emerald-200'
                    : 'border-slate-200 hover:border-slate-400'
                "
              >
                <img
                  :src="img.url"
                  alt="Product media"
                  class="h-full w-full rounded-lg object-contain"
                />
              </button>
            </div>

            <div v-if="chipIMG" class="pt-1">
              <div
                class="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-800"
              >
                <span>{{ chipTitulo }}</span>
                <button
                  @click="fecharChip"
                  class="rounded-full px-1.5 py-0.5 transition hover:bg-emerald-100"
                >
                  ×
                </button>
              </div>
            </div>
          </template>
        </div>

        <div
          class="flex flex-col-reverse gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6"
        >
          <button
            @click="btCancelar"
            class="rounded-2xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300 focus:ring-offset-2"
          >
            {{ btEsq }}
          </button>
          <button
            @click="btConfirmar"
            class="rounded-2xl bg-emerald-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            {{ btDir }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from "vue";
import BanerBlock from "../components/BannerBlock.vue";
import insertPict from "../assets/utilities/insertPicture.png";

const config = useRuntimeConfig();
const { loggedIn } = useAuth();
const { $notifier } = useNuxtApp();

const isLoggedIn = computed(() => loggedIn.value);

const overlay = ref(false);
const slides = ref([]);
const posicoes = ref([]);
const imgPrincipal = ref("/utilities/insertPicture.png");
const produtos = ref([]);
const midia = ref([]);
const id_ImgPrincipal = ref("");
const posicao = ref("");
const pos_alterada = ref("");
const produto = ref("");
const url_selecionada = ref("");
const chipTitulo = ref("");
const chipIMG = ref(false);
const showMenu = ref(false);
const dialog = ref(false);
const tituloDialog = ref("");
const textoDialog = ref("");
const btEsq = ref("");
const btDir = ref("");
const modoDelete = ref(false);
const modoinsert = ref(false);
const modoEdit = ref(false);
const dialogSize = ref(320);
const currentIndex = ref(0);

const items = ref([
  { title: "Insert" },
  { title: "Change Position" },
  { title: "Delete" },
]);

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

function syncMainSlideByIndex(index) {
  if (!slides.value.length) {
    imgPrincipal.value = insertPict;
    id_ImgPrincipal.value = "";
    posicao.value = "";
    currentIndex.value = 0;
    return;
  }

  const safeIndex =
    index < 0
      ? slides.value.length - 1
      : index >= slides.value.length
        ? 0
        : index;

  currentIndex.value = safeIndex;

  const currentSlide = slides.value[safeIndex];
  imgPrincipal.value = currentSlide.url;
  id_ImgPrincipal.value = currentSlide._id;
  posicao.value = currentSlide.posicao;
}

async function renderPagina() {
  await getSlides();
}

async function getSlides() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(
      `${config.public.apiBase}/slide/buscarSlides`,
      {
        method: "GET",
        ...getToken(),
      },
    );

    slides.value = response || [];

    if (slides.value.length > 0) {
      const newIndex =
        currentIndex.value >= slides.value.length ? 0 : currentIndex.value;
      syncMainSlideByIndex(newIndex);
    } else {
      imgPrincipal.value = insertPict;
      id_ImgPrincipal.value = "";
      posicao.value = "";
      currentIndex.value = 0;
    }
  } catch (error) {
    console.error("Error loading slides:", error);
  }
}

async function getItens() {
  if (!isLoggedIn.value) return;

  try {
    const response = await $fetch(`${config.public.apiBase}/item/bucarItens`, {
      method: "GET",
      ...getToken(),
    });

    produtos.value = response || [];
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

async function deletarSlide() {
  try {
    const posicaoAtual = posicao.value;

    await $fetch(
      `${config.public.apiBase}/slide/deletarSlide/${id_ImgPrincipal.value}`,
      {
        method: "DELETE",
        ...getToken(),
      },
    );

    await organizarPosicao(posicaoAtual);
    await renderPagina();
    limparDados();
    dialog.value = false;

    $notifier?.showMessage?.({
      content: "The slide has been deleted",
      color: "green",
      time: 3000,
    });
  } catch (error) {
    console.error(error);
  }
}

async function organizarPosicao(pos) {
  try {
    await $fetch(`${config.public.apiBase}/slide/organizarSlide`, {
      method: "POST",
      body: {
        pos,
      },
      ...getToken(),
    });
  } catch (error) {
    console.error(error);
  }
}

async function editarPoisicao() {
  const parametro = `${posicao.value}-${pos_alterada.value}`;

  try {
    await $fetch(`${config.public.apiBase}/slide/editarPosicao/${parametro}`, {
      method: "PUT",
      body: {},
      ...getToken(),
    });

    await renderPagina();
    limparDados();
    dialog.value = false;

    $notifier?.showMessage?.({
      content: "The position has been changed",
      color: "green",
      time: 3000,
    });
  } catch (error) {
    console.error(error);
  }
}

async function inserirSlide() {
  try {
    await $fetch(`${config.public.apiBase}/slide/addSlide`, {
      method: "POST",
      body: {
        url: url_selecionada.value,
        id_produto: produto.value,
        ativo: true,
        posicao: "",
      },
      ...getToken(),
    });

    await renderPagina();
    limparDados();
    dialog.value = false;

    $notifier?.showMessage?.({
      content: "The slide has been inserted",
      color: "green",
      time: 3000,
    });
  } catch (error) {
    console.error(error);
  }
}

function selecionarImagem(url, id, pos) {
  imgPrincipal.value = url;
  id_ImgPrincipal.value = id;
  posicao.value = pos;

  const index = slides.value.findIndex((slide) => slide._id === id);
  if (index !== -1) {
    currentIndex.value = index;
  }
}

function selecionarImagemByIndex(index) {
  syncMainSlideByIndex(index);
}

function prevSlide() {
  syncMainSlideByIndex(currentIndex.value - 1);
}

function nextSlide() {
  syncMainSlideByIndex(currentIndex.value + 1);
}

function limparDados() {
  midia.value = [];
  produto.value = "";
  chipIMG.value = false;
  chipTitulo.value = "";
  url_selecionada.value = "";
  pos_alterada.value = "";
}

function btAcoes(titulo) {
  showMenu.value = false;

  if (titulo === "Delete") {
    dialog.value = true;
    modoEdit.value = false;
    modoDelete.value = true;
    modoinsert.value = false;
    tituloDialog.value = "Deleting";
    textoDialog.value = "Are you sure you want to delete the selected Slide?";
    btDir.value = "YES";
    btEsq.value = "NO";
    dialogSize.value = 320;
  } else if (titulo === "Change Position") {
    cbPosicoes();
    dialog.value = true;
    modoEdit.value = true;
    modoDelete.value = false;
    modoinsert.value = false;
    tituloDialog.value = "Editing Position";
    textoDialog.value =
      "Please, select the new position to the slide selected!";
    btDir.value = "Save";
    btEsq.value = "Cancel";
    dialogSize.value = 320;
  } else if (titulo === "Insert") {
    dialog.value = true;
    modoEdit.value = false;
    modoDelete.value = false;
    modoinsert.value = true;
    tituloDialog.value = "Inserting a Slide";
    textoDialog.value = "Please, fill the form to complete";
    btDir.value = "Save";
    btEsq.value = "Cancel";
    dialogSize.value = 520;
  }
}

function btCancelar() {
  dialog.value = false;
  dialogSize.value = 320;
  limparDados();
}

async function btConfirmar() {
  if (modoDelete.value === true) {
    await deletarSlide();
  } else if (modoEdit.value === true) {
    await editarPoisicao();
  } else if (modoinsert.value === true) {
    if (url_selecionada.value === "") {
      $notifier?.showMessage?.({
        content: "Image not selected. Please, click on one of the listed.",
        color: "red",
        time: 3000,
      });
    } else {
      await inserirSlide();
    }
  }
}

function cbPosicoes() {
  pos_alterada.value = "";
  posicoes.value = [];

  const arr = [];
  for (let i = 0; i < slides.value.length; i++) {
    arr.push(i + 1);
  }

  arr.splice(Number(posicao.value) - 1, 1);
  posicoes.value = arr;
}

function selecionarMidia() {
  chipIMG.value = false;
  url_selecionada.value = "";
  chipTitulo.value = "";
  midia.value = [];

  const item = produtos.value.find((element) => element._id === produto.value);

  if (!item?.midia) return;

  const imagens = [
    item.midia.url1,
    item.midia.url2,
    item.midia.url3,
    item.midia.url4,
    item.midia.url5,
    item.midia.url6,
  ].filter(Boolean);

  midia.value = imagens.map((url) => ({ url }));
}

function selecionarIMG(url, i) {
  url_selecionada.value = url;
  chipIMG.value = true;
  chipTitulo.value = `Image ${i + 1} selected`;
}

function fecharChip() {
  chipIMG.value = false;
  url_selecionada.value = "";
  chipTitulo.value = "";
}

watch(overlay, (val) => {
  if (val) {
    setTimeout(() => {
      overlay.value = false;
    }, 1000);
  }
});

onMounted(async () => {
  await getSlides();
  await getItens();
  overlay.value = true;
});
</script>
