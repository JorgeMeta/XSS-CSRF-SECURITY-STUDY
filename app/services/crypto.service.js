angular.module("taskManagerApp").factory("CryptoService", function () {
  if (typeof CryptoJS === "undefined") {
    throw new Error("CryptoJS não foi carregado!");
  }
  const APP_SALT = "TASK_MANAGER_2025";

  function hashSHA256WithSalt(text) {
    return CryptoJS.SHA256(text + APP_SALT).toString();
  }
  return {
    hash: hashSHA256WithSalt,
  };
});
