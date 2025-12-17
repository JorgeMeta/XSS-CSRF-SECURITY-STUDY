angular.module("taskManagerApp").factory("ToastService", function ($timeout) {
  const toast = {
    visible: false,
    message: "",
    type: "info",
  };

  function show(message, type = "error", duration = 3000) {
    toast.message = message;
    toast.type = type;
    toast.visible = true;

    $timeout(() => {
      toast.visible = false;
    }, duration);
  }

  return {
    show,
    success(msg) {
      show(msg, "success");
    },
    error(msg) {
      show(msg, "error");
    },
    getToast() {
      return toast;
    },
  };
});
