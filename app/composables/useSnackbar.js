export const useSnackbar = () => {
  const snackbar = useState("snackbar", () => ({
    show: false,
    message: "",
    color: "success",
    timeout: 3000,
  }));

  const showSnackbar = ({
    message = "",
    color = "success",
    timeout = 3000,
  }) => {
    snackbar.value = {
      show: true,
      message,
      color,
      timeout,
    };
  };

  const closeSnackbar = () => {
    snackbar.value.show = false;
  };

  return {
    snackbar,
    showSnackbar,
    closeSnackbar,
  };
};
