angular
  .module("taskManagerApp", ["ngRoute", "ngSanitize", "ui.bootstrap"])
  .config(function ($locationProvider) {
    $locationProvider.hashPrefix("");
  });
