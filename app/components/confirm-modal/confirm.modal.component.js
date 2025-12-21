angular.module("taskManagerApp").component("confirmModal", {
  templateUrl: "components/confirm-modal/confirm-modal.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&",
  },
  controller: function () {
    var vm = this;
    vm.$onInit = function () {
      vm.title = vm.resolve.title || "Confirmação";
      vm.message = vm.resolve.message || "Tem certeza que deseja continuar?";
      vm.confirmText = vm.resolve.confirmText || "Confirmar";
      vm.cancelText = vm.resolve.cancelText || "Cancelar";
      vm.confirmButtonClass = vm.resolve.confirmButtonClass || "btn-danger";
    };

    vm.confirm = function () {
      vm.close({ $value: true });
    };

    vm.cancel = function () {
      vm.dismiss({ $value: "cancel" });
    };
  },
});
