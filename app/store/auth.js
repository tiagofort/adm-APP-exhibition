import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    loggedIn: false,
  }),

  getters: {
    fullName: (state) => {
      if (!state.user) return "";
      return `${state.user.nome || ""} ${state.user.sobrenome || ""}`.trim();
    },
  },

  actions: {
    setUser(user) {
      this.user = user;
      this.loggedIn = true;
    },

    initAuth() {
      if (process.client) {
        const token = localStorage.getItem("auth._token.local");
        this.loggedIn = !!token;
      }
    },

    logout() {
      this.user = null;
      this.loggedIn = false;
      localStorage.removeItem("auth._token.local");
    },
  },
});
