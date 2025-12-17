angular
  .module("taskManagerApp")
  .controller(
    "RegisterController",
    function (AuthService, $location, ToastService, $sce) {
      const vm = this;
      vm.userInput = "<script>alert('XSS')</script>";
      vm.name = "";
      vm.email = "";
      vm.password = "";
      vm.users = [];

      vm.loadUsers = function () {
        AuthService.loadUsers().then(function (users) {
          // 🚨 ERRO GRAVE (confiança cega no backend)
          vm.users = users.map((u) => ({
            ...u,
            unsafeName: $sce.trustAsHtml(u.name),
          }));
        });
      };

      vm.register = function () {
        AuthService.register(vm.name, vm.email, vm.password)
          .then(function () {
            ToastService.success("Conta criada com sucesso!");
            document.cookie = "sessionId=abc123; path=/";
            // vm.loadUsers();
            // $location.path("/home");
          })
          .catch(function (err) {
            ToastService.error(err);
          });
      };

      vm.goToLogin = function () {
        $location.path("/login");
      };
    }
  );
