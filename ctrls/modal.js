app.controller('modalCtrl',['$scope', '$location','$rootScope', function modalCtrl($scope,$location,$rootScope) {

    //função para verificar em qual route o usuário está (usada na ng-if na view)
    $scope.activeTab = function (route) {
        return route === $location.path();
    };

}]);
