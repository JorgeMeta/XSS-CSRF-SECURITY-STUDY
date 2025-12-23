angular.module("taskManagerApp").component("confirmModal", {
  templateUrl: "app/components/confirm-modal/confirm-modal.component.html",
  bindings: {
    resolve: "<",
    close: "&",
    dismiss: "&",
  },
  controller: function () {
    var vm = this;
    vm.$onInit = function () {
      // Verifique se resolve está chegando
      console.log("🔧 Modal iniciado com resolve:", vm.resolve);

      vm.title = vm.resolve.title || "Confirmação";
      vm.message = vm.resolve.message || "Tem certeza que deseja continuar?";
      vm.confirmText = vm.resolve.confirmText || "Confirmar";
      vm.cancelText = vm.resolve.cancelText || "Cancelar";
      vm.confirmButtonClass = vm.resolve.confirmButtonClass || "btn-danger";
    };

    vm.confirm = function () {
      console.log("✅ Botão confirmar clicado");
      vm.close({ $value: true });
    };

    vm.cancel = function () {
      console.log("❌ Botão cancelar clicado");
      vm.dismiss({ $value: "cancel" });
    };
  },
});
