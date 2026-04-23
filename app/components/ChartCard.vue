<template>
  <div
    class="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:shadow-xl"
  >
    <!-- Chart Container -->
    <div
      class="relative -mt-12 mx-auto w-full max-w-[95%] rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 p-4 shadow-lg shadow-cyan-200"
    >
      <canvas ref="canvasRef" class="!h-[220px] !w-full"></canvas>
    </div>

    <!-- Content -->
    <div class="mt-6 space-y-3 text-center sm:text-left">
      <h3 class="text-base font-semibold text-zinc-800 sm:text-lg">
        {{ title }}
      </h3>

      <p class="text-sm text-zinc-500">
        Quick overview of the data shown in the chart.
      </p>
    </div>

    <!-- Action -->
    <div class="mt-6 flex justify-center sm:justify-end">
      <button
        @click="$emit('details')"
        class="inline-flex w-full items-center justify-center rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition duration-200 hover:-translate-y-0.5 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-300 sm:w-auto"
      >
        View Details
      </button>
    </div>

    <!-- subtle hover effect -->
    <div
      class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent transition group-hover:ring-cyan-200"
    ></div>
  </div>
</template>

<script setup>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
);

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  labels: {
    type: Array,
    default: () => [],
  },
  values: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["details"]);

const canvasRef = ref(null);
let chartInstance = null;

function renderChart() {
  if (!canvasRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  chartInstance = new Chart(canvasRef.value, {
    type: "bar",
    data: {
      labels: props.labels,
      datasets: [
        {
          data: props.values,
          backgroundColor: ["#22c55e", "#f59e0b", "#ef4444", "#06b6d4"],
          borderRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          ticks: {
            color: "#ffffff",
            font: {
              size: 10,
            },
          },
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            color: "#ffffff",
          },
          grid: {
            color: "rgba(255,255,255,0.15)",
          },
        },
      },
    },
  });
}

onMounted(async () => {
  await nextTick();
  renderChart();
});

watch(
  () => [props.labels, props.values],
  async () => {
    await nextTick();
    renderChart();
  },
  { deep: true },
);

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy();
  }
});
</script>
