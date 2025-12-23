angular.module("taskManagerApp").service("UserService", function ($http) {
  var baseUrl = "http://localhost:3000/company-users";

  this.getAllUsers = function (searchText = "") {
    let url = baseUrl;

    if (searchText && searchText.trim() !== "") {
      const searchTerm = searchText.trim().toLowerCase();
      url = `${baseUrl}?name_like=${encodeURIComponent(
        searchTerm
      )}&email_like=${encodeURIComponent(searchTerm)}`;
    }

    return $http
      .get(url)
      .then(function (response) {
        if (searchText && searchText.trim() !== "") {
          const term = searchText.trim().toLowerCase();
          const filteredUsers = response.data.filter((user) => {
            return (
              (user.name && user.name.toLowerCase().includes(term)) ||
              (user.email && user.email.toLowerCase().includes(term))
            );
          });

          return filteredUsers;
        }

        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  };

  this.createUser = function (userData) {
    return $http
      .post(baseUrl, userData)
      .then(function (response) {
        return response.data;
      })
      .catch(function (error) {
        throw error;
      });
  };

  this.updateUser = function (id, userData) {
    return $http
      .put(`${baseUrl}/${id}`, userData)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw error;
      });
  };

  this.deleteUser = function (id) {
    return $http
      .delete(`${baseUrl}/${id}`)
      .then((res) => {
        return res.data;
      })
      .catch(function (error) {
        throw error;
      });
  };
});
