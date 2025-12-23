angular.module("taskManagerApp").factory("ToastService", function ($timeout) {
  const toast = {
    visible: false,
    message: "",
    type: "info",
  };

  function show(options) {
    // ACEITA OBJETO
    toast.message = options.message;
    toast.type = options.type || "info";
    toast.visible = true;

    $timeout(() => {
      toast.visible = false;
    }, options.duration || 3000);
  }

  return {
    show,
    success(msg) {
      show({ message: msg, type: "success" });
    },
    error(msg) {
      show({ message: msg, type: "error" });
    },
    getToast() {
      return toast;
    },
  };
});
