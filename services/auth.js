app.service('auth', ['$window','$location', function($window,$location) {

    //verifica se o usuário está autenticado e o envia para a tela de login
    this.isLogged = function () {

        if ($window.sessionStorage.getItem('userId')){
            if($location.path('login') || $location.path('recuperar')) $location.path('/');
        } else {
            if(!$location.path('login')) $location.path('login');
        }

    }

}]);