angular
  .module("taskManagerApp")
  .factory("AuthService", function ($http, $q, CryptoService) {
    const API = "http://localhost:3000/users";
    let currentUser = null;

    return {
      isAuthenticated: function () {
        const user = this.getUser();
        return user !== null && user !== undefined;
      },

      // Método auxiliar para verificação rápida
      checkAuth: function () {
        if (this.isAuthenticated()) {
          return $q.resolve(this.getUser());
        } else {
          return $q.reject("Usuário não autenticado");
        }
      },

      loadUsers() {
        return $http.get(API).then(function (res) {
          return res.data;
        });
      },

      register(name, email, password, csrfToken) {
        if (!name || !email || !password) {
          return $q.reject("Preencha todos os campos");
        }

        const hashedPassword = CryptoService.hash(password);

        return $http
          .post(
            API,
            { name, email, password: hashedPassword },
            {
              headers: {
                "X-CSRF-Token": csrfToken,
              },
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
        const hashedPassword = CryptoService.hash(password);
        console.log("email e password", email, password);
        return $http
          .get(`${API}?email=${email}&password=${hashedPassword}`)
          .then((res) => {
            console.log("response login", res.data);
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
