
app.controller('redefinirCtrl', ['$scope', '$window', '$http', '$q', '$location', 'requests', function redefinirCtrl($scope, $window, $http, $q, $location, requests) {

    //verifica se o usuário está autenticado e o envia para a página interna 
    if ($window.sessionStorage.getItem('userId')){
        $location.path('/');
    }
    
    $scope.input = {pass:'',confirmation:''};
    $scope.inputStatus = '';

    //pega as configurações da aplicação
    requests.getConfig()
    .then(function(data) { 
        $scope.config = JSON.stringify(data);
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    //função executada no submit do form de login
    $scope.checkInputs = function(){

        let regPass = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$', 'g');

        ///testa RegExp para verificar se a senha atinge os requisitos minimos
        if(regPass.test($scope.input.pass)){
            $scope.inputStatus = '';

             //faz a verificação dos campos e dá feedback visual em caso de erro 
            if($scope.input.pass === $scope.input.confirmation){

                let inputObj = {'password':$scope.input.pass , 'numeroEc':'18881'};

                //envia a nova senha para o servidor
                requests.redefine(inputObj)
                .then(function(data) { 

                    $scope.input = {pass:'',confirmation:''};
                    //exibe mensagem de sucesso ou erro
                    $scope.inputStatus = 'OK';

                })
                .catch(function(err) { 
                    console.log('err: '+err);
                    if(err.status === 404) {
                        $scope.input = {pass:'',confirmation:''};
                        $scope.inputStatus = "NOK";
                    }
                });

            } else {

                $scope.input = {pass:'',confirmation:''};
                $scope.inputStatus = 'different';

            }
        } else{
            $scope.input = {pass:'',confirmation:''};
            $scope.inputStatus = 'regPass';
        }

    }

    $( document ).ready(function() { 
    
        //ao focar, limpar feedbacks visuais de erro
        $('.form-control').on("click",function(){
            angular.element($('.form-control')).scope().inputStatus = '';
        });
    
    });

}]);