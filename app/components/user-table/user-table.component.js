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
    var $ctrl = this;

    $ctrl.$onInit = function () {
      console.log("🎬 Tabela INICIALIZADA");
      console.log("📊 Users no init:", $ctrl.users);
      console.log("⏳ Loading:", $ctrl.loading);
    };

    $ctrl.$onChanges = function (changes) {
      if (changes.users) {
        console.log("🔄 Users atualizados:", changes.users.currentValue);
      }
    };

    $ctrl.formatDate = function (dateString) {
      if (!dateString) return "N/A";
      return new Date(dateString).toLocaleDateString("pt-BR");
    };

    $ctrl.getInitials = function (name) {
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
