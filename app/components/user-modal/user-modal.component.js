angular.module("taskManagerApp").component("userModal", {
  templateUrl: "app/components/user-modal/user-modal.component.html",
  bindings: {
    isOpen: "<",
    mode: "<",
    user: "<",
    onClose: "&",
    onSave: "&",
    title: "<",
  },
  controller: function () {
    var ctrl = this;

    ctrl.formData = {};
    ctrl.saving = false;
    ctrl.formError = null;

    ctrl.$onChanges = function (changes) {
      if (changes.user) {
        if (ctrl.user && Object.keys(ctrl.user).length > 0) {
          // Modo view/edit: copia o usuário
          ctrl.formData = angular.copy(ctrl.user);
        } else {
          // Modo create: inicializa com valores padrão
          ctrl.formData = {
            name: "",
            email: "",
            role: "user",
            status: "active",
          };
        }
        ctrl.formError = null;
      }

      if (changes.isOpen && !ctrl.isOpen) {
        // Quando modal fecha, reseta estado
        ctrl.saving = false;
        ctrl.formError = null;
      }
    };

    ctrl.save = function (form) {
      ctrl.formError = null;

      // Marca o form como submetido para mostrar erros
      if (form) {
        form.$setSubmitted();
      }

      // Validação básica
      if (!ctrl.formData.name || !ctrl.formData.email) {
        ctrl.formError = "Preencha todos os campos obrigatórios.";
        return;
      }

      // Validação de email
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(ctrl.formData.email)) {
        ctrl.formError = "Email inválido.";
        return;
      }

      // Se passar na validação, chama callback
      ctrl.saving = true;
      ctrl.onSave({ user: ctrl.formData }).finally(function () {
        ctrl.saving = false;
      });
    };

    ctrl.getRoleLabel = function (role) {
      var roles = {
        user: "Usuário",
        admin: "Administrador",
        manager: "Gerente",
      };
      return roles[role] || role;
    };

    ctrl.getStatusLabel = function (status) {
      var statuses = {
        active: "Ativo",
        inactive: "Inativo",
      };
      return statuses[status] || status;
    };
  },
});
