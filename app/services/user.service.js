angular.module("taskManagerApp").service("UserService", function ($http, $q) {
  var baseUrl = "/api/users";

  this.getAllUsers = function (search) {
    var params = {};
    if (search) {
      params.search = search;
    }

    // Simulação de API
    return $q(function (resolve, reject) {
      setTimeout(function () {
        var users = [
          {
            id: 1,
            name: "João Silva",
            email: "joao@email.com",
            role: "admin",
            status: "active",
            createdAt: "2024-01-15T10:30:00Z",
          },
          // ... mais usuários
        ];

        // Filtra se houver busca
        if (search) {
          var filtered = users.filter(function (user) {
            return (
              user.name.toLowerCase().includes(search.toLowerCase()) ||
              user.email.toLowerCase().includes(search.toLowerCase())
            );
          });
          resolve(filtered);
        } else {
          resolve(users);
        }
      }, 500);
    });
  };

  this.createUser = function (userData) {
    return $q(function (resolve) {
      setTimeout(function () {
        var newUser = {
          id: Math.floor(Math.random() * 1000),
          ...userData,
          createdAt: new Date().toISOString(),
        };
        resolve(newUser);
      }, 500);
    });
  };

  this.updateUser = function (id, userData) {
    return $q(function (resolve) {
      setTimeout(function () {
        var updatedUser = {
          id: id,
          ...userData,
        };
        resolve(updatedUser);
      }, 500);
    });
  };

  this.deleteUser = function (id) {
    return $q(function (resolve) {
      setTimeout(function () {
        resolve({ success: true });
      }, 500);
    });
  };
});
