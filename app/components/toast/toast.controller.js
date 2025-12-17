angular.module("taskManagerApp").controller("ToastController", [
  "ToastService",
  function (ToastService) {
    const vm = this;
    vm.toast = ToastService.getToast();
  },
]);
