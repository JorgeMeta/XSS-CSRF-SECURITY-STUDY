angular.module("taskManagerApp").factory("ModalService", function ($uibModal) {
  function openUserModal(mode, user) {
    return $uibModal.open({
      component: "userModal",
      size: "lg",
      resolve: {
        mode: function () {
          return mode;
        },
        user: function () {
          return user;
        },
      },
    }).result;
  }

  return {
    viewUser: function (user) {
      return openUserModal("view", user);
    },

    editUser: function (user) {
      return openUserModal("edit", user);
    },

    createUser: function () {
      return openUserModal("create", {});
    },

    confirm: function (options) {
      return $uibModal.open({
        templateUrl: "components/confirm-modal/confirm-modal.html",
        controller: function ($scope, $uibModalInstance) {
          $scope.title = options.title || "Confirmação";
          $scope.message = options.message || "Tem certeza?";
          $scope.confirmText = options.confirmText || "Confirmar";
          $scope.cancelText = options.cancelText || "Cancelar";

          $scope.confirm = function () {
            $uibModalInstance.close(true);
          };

          $scope.cancel = function () {
            $uibModalInstance.dismiss("cancel");
          };
        },
        size: "md",
      }).result;
    },
  };
});
