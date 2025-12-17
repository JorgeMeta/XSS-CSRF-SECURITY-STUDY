angular.module("taskManagerApp").directive("currencyFormat", function () {
  return {
    restrict: "E",
    scope: { value: "=" },
    template: '<span>{{value | currency: "$}}</span>',
  };
});
