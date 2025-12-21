angular.module("taskManagerApp").config(function ($routeProvider) {
  $routeProvider
    .when("/login", {
      templateUrl: "app/views/login/login.html",
      controller: "LoginController",
      controllerAs: "vm",
    })
    .when("/register", {
      templateUrl: "app/views/register/register.html",
      controller: "RegisterController",
      controllerAs: "vm",
    })
    .when("/home", {
      templateUrl: "app/views/home/home.html",
      controller: "HomeController",
      controllerAs: "vm",
    })
    .otherwise({ redirectTo: "/login" });
});
