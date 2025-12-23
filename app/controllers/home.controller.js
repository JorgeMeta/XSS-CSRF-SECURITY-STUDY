angular
  .module("taskManagerApp")
  .controller("HomeController", function (UserService, $timeout, ToastService) {
    var vm = this;

    vm.loading = false;
    vm.searchText = "";

    vm.modal = {
      isOpen: false,
      mode: "view",
      user: {},
      title: "",
    };

    vm.showConfirmModal = false;
    vm.modalConfig = {};
    vm.userToDelete = null;

    vm.openConfirmModal = function (user) {
      vm.userToDelete = user;

      vm.modalConfig = {
        title: "Confirmar exclusão",
        message: "Tem certeza que deseja excluir o usuário " + user.name + "?",
        confirmText: "Excluir",
        cancelText: "Cancelar",
        confirmButtonClass: "btn-danger",
      };

      vm.showConfirmModal = true;
    };

    vm.modalConfirmed = function () {
      vm.showConfirmModal = false;

      if (vm.userToDelete) {
        UserService.deleteUser(vm.userToDelete.id)
          .then(function () {
            vm.users = vm.users.filter((u) => u.id !== vm.userToDelete.id);
            vm.users = angular.copy(vm.users);

            ToastService.success(
              "Usuário " + vm.userToDelete.name + " excluído com sucesso!"
            );

            vm.userToDelete = null;
          })
          .catch(function (error) {
            ToastService.error("Erro ao excluir usuário: " + error);
            vm.userToDelete = null;
          });
      }
    };

    vm.modalCanceled = function () {
      vm.showConfirmModal = false;
      vm.userToDelete = null;
    };

    vm.loadUsers = function (search) {
      vm.loading = true;

      UserService.getAllUsers(search)
        .then(function (users) {
          vm.users = users;
          vm.loading = false;
          vm.users = angular.copy(vm.users);
        })
        .catch(function (error) {
          ToastService.error("Erro ao carregar usuários: " + error);
          vm.loading = false;
          vm.users = [];
        });
    };

    vm.handleSearch = function (text) {
      vm.searchText = text;
      vm.loadUsers(text);
    };

    vm.createUser = function () {
      vm.modal.isOpen = true;
      vm.modal.mode = "create";
      vm.modal.title = "Novo Usuário";
      vm.modal.user = {
        name: "",
        email: "",
        role: "user",
        status: "active",
      };
    };

    vm.viewUser = function (user) {
      vm.modal.isOpen = true;
      vm.modal.mode = "view";
      vm.modal.title = "Detalhes do Usuário";
      vm.modal.user = angular.copy(user);
    };

    vm.editUser = function (user) {
      vm.modal.isOpen = true;
      vm.modal.mode = "edit";
      vm.modal.title = "Editar Usuário";
      vm.modal.user = angular.copy(user);
    };

    vm.saveUser = function (userData) {
      var saveData = userData || vm.modal.user;

      if (vm.modal.mode === "create") {
        UserService.createUser(saveData)
          .then(function (createdUser) {
            vm.closeModal();

            ToastService.success("Usuário criado com sucesso!");

            if (!vm.users) {
              vm.users = [];
            }
            vm.users.push(createdUser);
            vm.users = angular.copy(vm.users);
          })
          .catch(function (error) {
            ToastService.error("Erro ao criar usuário: " + error);
          });
      } else if (vm.modal.mode === "edit") {
        UserService.updateUser(vm.modal.user.id, saveData)
          .then(function (updatedUser) {
            vm.closeModal();

            ToastService.success("Usuário atualizado com sucesso!");

            var index = vm.users.findIndex((u) => u.id === vm.modal.user.id);
            if (index !== -1) {
              vm.users[index] = updatedUser;
              vm.users = angular.copy(vm.users);
            }
          })
          .catch(function (error) {
            ToastService.error("Erro ao atualizar usuário: " + error);
          });
      }
    };

    vm.deleteUser = function (user) {
      vm.openConfirmModal(user);
    };

    vm.closeModal = function () {
      vm.modal.isOpen = false;
      vm.modal.user = {};
    };

    $timeout(function () {
      vm.loadUsers();
    });

    vm.$onInit = function () {
      vm.loadUsers();
    };
  });
