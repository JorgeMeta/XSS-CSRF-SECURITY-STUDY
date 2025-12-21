angular.module("taskManagerApp").factory("AuthService", function ($http, $q) {
  const API = "http://localhost:3000/users";
  let currentUser = null;

  return {
    loadUsers() {
      return $http.get(API).then(function (res) {
        return res.data;
      });
    },

    register(name, email, password, csrfToken) {
      if (!name || !email || !password) {
        return $q.reject("Preencha todos os campos");
      }

      return $http
        .post(
          API,
          { name, email, password },
          {
            headers: {
              "X-CSRF-Token": csrfToken,
            },
            withCredentials: true,
          }
        )
        .then(function (res) {
          currentUser = res.data;
          localStorage.setItem("user", JSON.stringify(currentUser));
          return currentUser;
        })
        .catch(() => {
          return $q.reject("Erro ao criar conta");
        });
    },

    login(email, password) {
      return $http
        .get(`${API}?email=${email}&password=${password}`)
        .then((res) => {
          if (res.data.length === 1) {
            currentUser = res.data[0];
            localStorage.setItem("user", JSON.stringify(currentUser));
            return currentUser;
          }
          return $q.reject("Credencias inválidas");
        });
    },

    getUser() {
      if (!currentUser) {
        currentUser = JSON.parse(localStorage.getItem("user"));
      }
      return currentUser;
    },

    logout() {
      currentUser = null;
      localStorage.removeItem("user");
    },
  };
});
