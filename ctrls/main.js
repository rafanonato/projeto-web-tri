app.controller('mainCtrl',['$scope', '$window', '$location', function mainCtrl($scope,$window,$location) {
    
    //verifica se o usuário está autenticado e o envia para a página interna 
    if (!$window.sessionStorage.getItem('userId')){
        $location.path('login');
    }

}]);