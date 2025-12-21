angular.module("taskManagerApp").component("userTable", {
  templateUrl: "app/components/user-table/user-table.component.html",
  bindings: {
    users: "<",
    loading: "<",
    onView: "&",
    onEdit: "&",
    onDelete: "&",
  },
  controller: function () {
    var vm = this;

    vm.formatDate = function (dateString) {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("pt-BR");
    };
    vm.getInitials = function (name) {
      if (!name) return "??";
      return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2);
    };
  },
});
