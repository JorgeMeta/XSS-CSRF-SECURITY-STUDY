angular
  .module("taskManagerApp")
  .controller("HomeController", function (UserService) {
    var vm = this;

    vm.users = [];
    vm.loading = false;
    vm.searchText = "";

    vm.modal = {
      isOpen: false,
      mode: "view",
      user: {},
      title: "",
    };

    vm.loadUsers = function (search) {
      vm.loading = true;
      UserService.getAllUsers(search)
        .then(function (users) {
          vm.users = users;
          vm.loading = false;
        })
        .catch(function (error) {
          alert("Erro ao carregar usuários: " + error);
          vm.loading = false;
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
            vm.users.push(createdUser);
            vm.closeModal();
            alert("Usuário criado com sucesso!");
          })
          .catch(function (error) {
            alert("Erro ao criar usuário: " + error);
          });
      } else if (vm.modal.mode === "edit") {
        UserService.updateUser(vm.modal.user.id, saveData)
          .then(function (updatedUser) {
            var index = vm.users.findIndex((u) => u.id === vm.modal.user.id);
            if (index !== -1) {
              vm.users[index] = updatedUser;
            }
            vm.closeModal();
            alert("Usuário atualizado!");
          })
          .catch(function (error) {
            alert("Erro ao atualizar: " + error);
          });
      }
    };

    vm.deleteUser = function (user) {
      if (confirm("Excluir usuário " + user.name + "?")) {
        UserService.deleteUser(user.id)
          .then(function () {
            vm.users = vm.users.filter((u) => u.id !== user.id);
            alert("Usuário excluído!");
          })
          .catch(function (error) {
            alert("Erro ao excluir: " + error);
          });
      }
    };

    vm.closeModal = function () {
      vm.modal.isOpen = false;
      vm.modal.user = {};
    };

    vm.$onInit = function () {
      vm.loadUsers();
    };
  });
