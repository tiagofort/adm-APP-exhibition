import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  srcDir: "app",
  compatibilityDate: "2026-04-21",
  devtools: { enabled: true },
  css: ["./assets/css/main.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    },
  },
});
