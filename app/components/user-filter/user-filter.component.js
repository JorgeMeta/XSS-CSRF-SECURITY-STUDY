angular.module("taskManagerApp").component("userFilter", {
  templateUrl: "app/components/user-filter/user-filter.component.html",
  bindings: {
    onSearch: "&",
    onCreate: "&",
  },
  controller: function () {
    // ← "controller" correto
    var vm = this;
    vm.searchText = "";

    vm.search = function () {
      // ← "search" correto (não "serach")
      vm.onSearch({ text: vm.searchText });
    };

    vm.clear = function () {
      vm.searchText = "";
      vm.onSearch({ text: "" });
    };

    vm.handleKeyPress = function (event) {
      if (event.keyCode === 13) {
        // Enter key
        vm.search();
      }
    };
  },
});
