angular
  .module("taskManagerApp")
  .controller(
    "LoginController",
    function (AuthService, $location, ToastService) {
      const vm = this;
      vm.email = "";
      vm.password = "";

      vm.login = function () {
        AuthService.login(vm.email, vm.password)
          .then(function () {
            $location.path("/home");
          })
          .catch(function (err) {
            ToastService.error(err);
          });
      };
      vm.goToRegister = function () {
        $location.path("/register");
      };
    }
  );
