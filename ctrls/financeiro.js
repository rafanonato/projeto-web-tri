app.controller('financeiroCtrl',['$scope', '$window', '$location', 'requests', 
function financeiroCtrl($scope,$window,$location,$rootScope, requests) {

    //verifica se o usuário está autenticado e o envia para a tela de login
    if (!$window.sessionStorage.getItem('userId')){
        $location.path('login');
    }

    //pega as configurações parametrizadas
    // requests.getConfig()
    // .then(function(data) { 
    //     $scope.dadosConfig = data;

    // })
    // .catch(function(err) { 
    //     console.log('err: '+err);
    // });

}]);


