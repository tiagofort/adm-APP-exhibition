export const useAuth = () => {
  const user = useState("auth_user", () => null);
  const loggedIn = useState("auth_logged_in", () => false);

  const setUser = (newUser) => {
    user.value = newUser;
    loggedIn.value = true;

    if (process.client) {
      localStorage.setItem("auth_user", JSON.stringify(newUser));
    }
  };

  const setToken = (token) => {
    if (process.client) {
      localStorage.setItem("auth._token.local", token);
    }

    loggedIn.value = true;
  };

  const initAuth = () => {
    if (!process.client) return;

    const token = localStorage.getItem("auth._token.local");
    const savedUser = localStorage.getItem("auth_user");

    loggedIn.value = !!token;

    if (savedUser) {
      try {
        user.value = JSON.parse(savedUser);
      } catch {
        user.value = null;
      }
    }
  };

  const logout = () => {
    user.value = null;
    loggedIn.value = false;

    if (process.client) {
      localStorage.removeItem("auth._token.local");
      localStorage.removeItem("auth_user");
    }
  };

  return {
    user,
    loggedIn,
    setUser,
    setToken,
    initAuth,
    logout,
  };
};
