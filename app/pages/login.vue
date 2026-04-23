<template>
  <Authentication @submit="login" />
</template>

<script setup>
import Authentication from "../components/auth/AuthenticationForm.vue";

const config = useRuntimeConfig();
const { showSnackbar } = useSnackbar();
const { setToken, setUser } = useAuth();

async function login(payload) {
  try {
    const response = await $fetch("/login/auth", {
      method: "POST",
      baseURL: config.public.apiBase,
      body: {
        email: payload.email,
        senha: payload.senha,
      },
      credentials: "include",
    });

    if (response?.token) {
      setToken(response.token);
    }

    if (response?.user) {
      setUser(response.user);
    } else {
      setUser({});
    }

    showSnackbar({
      message: "Login successful",
      color: "success",
      timeout: 2500,
    });

    await navigateTo("/");
  } catch (error) {
    showSnackbar({
      message:
        error?.data?.message ||
        error?.response?._data?.message ||
        "Invalid email or password",
      color: "error",
      timeout: 2500,
    });
  }
}
</script>
