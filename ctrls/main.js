app.controller('mainCtrl',['$scope', '$window', '$location', 'requests', function mainCtrl($scope,$window,$location, requests) {

    //verifica se o usuário está autenticado e o envia para a tela de login
    if (!$window.sessionStorage.getItem('userId')){
        $location.path('login');
    }

    $( document ).ready(function() {
    
        $('#myTab a').click(function (e) {
            e.preventDefault();
            $(this).tab('show');
        })
    
    });

}]);


