app.controller('indexCtrl',['$rootScope','$window','$scope', '$location','auth', function indexCtrl($rootScope,$window,$scope,$location,auth) {

    $rootScope.reloadView = false;

    if($rootScope.reloadView === true){
        $window.location.reload();
        $rootScope.reloadView = false;
    }

    //checa se o usuário está logado
    auth.isLogged();

    //função para verificar em qual route o usuário está (usada na ng-if na view)
    $scope.activeTab = function (route) {
        return route === $location.path();
    };

}]);