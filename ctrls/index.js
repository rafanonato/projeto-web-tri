app.controller('indexCtrl',['$scope', '$location','auth', function indexCtrl($scope,$location,auth) {

    //checa se o usuário está logado
    auth.isLogged();

    //função para verificar em qual route o usuário está (usada na ng-if na view)
    $scope.activeTab = function (route) {
        return route === $location.path();
    };

}]);