<template>
  <div id="home" class="flex min-h-screen flex-col">
    <MenuBar />

    <main class="bg-white p-0 flex-1">
      <slot />
    </main>

    <Snackbar />
    <Footer />
  </div>
</template>

<script setup>
import MenuBar from "../components/MenuBar.vue";
import Footer from "../components/Footer.vue";
import Snackbar from "../components/Snackbar.vue";
</script>
