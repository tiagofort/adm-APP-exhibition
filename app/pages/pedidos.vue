<template>
  <div class="p-4 sm:p-6">
    <Order />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["auth"],
});
</script>
