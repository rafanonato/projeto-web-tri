app.controller('indexCtrl',['$scope', '$location', function indexCtrl($scope,$location) {

    //função para verificar em qual route o usuário está (usada na ng-if na view)
    $scope.activeTab = function (route) {
        return route === $location.path();
    };

}]);