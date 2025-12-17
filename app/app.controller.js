angular.module("taskManagerApp").controller("AppController", [
  "$scope",
  "NoteService",
  "$log",

  function ($scope, NoteService, $log) {
    const vm = this;
    //COUNTER
    vm.counter = 0;

    vm.counterHistory = [];

    // limites
    vm.maxValue = 10;
    vm.minValue = -5;

    vm.incrementCounter = function () {
      vm.counter++;
      vm.counterHistory.push({
        value: vm.counter,
        action: "increment",
        timestamp: new Date(),
      });
      console.log("Counter incrementado", vm.counter);
    };

    vm.decrementCounter = function () {
      vm.counter--;
      vm.counterHistory.push({
        value: vm.counter,
        action: "decrement",
        timestamp: new Date(),
      });
      console.log("Counter decrementado", vm.counter);
    };

    vm.resetCounter = function () {
      vm.counter = 0;
      vm.counterHistory.push({
        value: vm.counter,
        action: "reset",
        timestamp: new Date(),
      });
      console.log("Counter resetado");
    };

    vm.setCounter = function (value) {
      if (!isNaN(value)) {
        vm.counter = parseInt(value);
        vm.counterHistory.push({
          value: vm.counter,
          action: "set",
          timestamp: new Date(),
        });
        console.log("Counter definido para:", value);
      }
    };
    //COUNTER
    vm.double = 0;
    $scope.$watch(
      //angular olhe isso
      //arrow auto
      () => vm.counter,
      function (newVal) {
        console.log(newVal);
        vm.double = newVal * 2;
      }
    );
  },
]);
