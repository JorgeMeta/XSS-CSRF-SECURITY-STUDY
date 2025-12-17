angular
  .module("taskManagerApp", ["ngRoute", "ngSanitize"])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix("");
  });
