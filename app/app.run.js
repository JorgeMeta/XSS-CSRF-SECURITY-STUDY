// app/app.run.js
angular
  .module("taskManagerApp")
  .run(function ($rootScope, $location, AuthService, ToastService) {
    // Torna AuthService disponível em templates
    $rootScope.auth = AuthService;

    $rootScope.$on("$routeChangeStart", function (event, next) {
      // Se não há definição de rota, ignora
      if (!next || !next.originalPath) return;

      const route = next.originalPath;
      const isPublic = route === "/login" || route === "/register";
      const isLoggedIn = AuthService.isAuthenticated();

      console.log(
        `🛡️ Route Guard: ${route} | Pública: ${isPublic} | Logado: ${isLoggedIn}`
      );

      // Bloqueia rotas privadas sem login
      if (!isPublic && !isLoggedIn) {
        console.log("⛔ Acesso bloqueado - Usuário não autenticado");
        event.preventDefault();
        ToastService.error("Acesso não autorizado. Faça login para continuar.");
        $location.path("/login");
        return;
      }

      // Redireciona de login/register se já logado
      if (isPublic && isLoggedIn) {
        console.log("🔄 Redirecionando - Usuário já autenticado");
        event.preventDefault();
        $location.path("/home");
      }
    });

    // Para debug
    console.log(
      "🔐 Aplicação iniciada. Usuário logado:",
      AuthService.isAuthenticated()
    );
    console.log("👤 Usuário atual:", AuthService.getUser());
  });
