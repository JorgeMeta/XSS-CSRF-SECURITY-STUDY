angular.module("taskManagerApp").component("logoutMenu", {
  templateUrl: "app/components/logout/logout.component.html",
  controller: function (AuthService, $location, ToastService, $scope) {
    var vm = this;

    vm.isMenuOpen = false;
    vm.currentUser = null;

    vm.$onInit = function () {
      vm.currentUser = AuthService.getUser();
      console.log("👤 Usuário atual:", vm.currentUser);

      // Garante que currentUser sempre tenha estrutura válida
      if (!vm.currentUser) {
        vm.currentUser = { name: "Usuário", email: "" };
      }
    };

    vm.toggleMenu = function (event) {
      event.stopPropagation(); // Previne que o click se propague
      vm.isMenuOpen = !vm.isMenuOpen;
    };

    vm.closeMenu = function () {
      vm.isMenuOpen = false;
    };

    vm.viewProfile = function () {
      vm.closeMenu();
      ToastService.info("Funcionalidade de perfil em desenvolvimento");
    };

    vm.logout = function () {
      AuthService.logout();
      vm.closeMenu();
      ToastService.success("Logout realizado com sucesso!");
      $location.path("/login");
    };

    // Fecha o menu quando clicar fora
    var closeMenuOnClickOutside = function (event) {
      var clickInside = angular
        .element(event.target)
        .closest(".logout-container").length;

      if (!clickInside && vm.isMenuOpen) {
        vm.closeMenu();
        // Força atualização da view
        if (!$scope.$$phase) {
          $scope.$apply();
        }
      }
    };

    // Adiciona event listener
    angular.element(document).on("click", closeMenuOnClickOutside);

    // Remove event listener quando componente for destruído
    vm.$onDestroy = function () {
      angular.element(document).off("click", closeMenuOnClickOutside);
    };
  },
});
