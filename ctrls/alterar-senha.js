
app.controller('alterarSenhaCtrl', ['$scope', '$window', '$http', '$q', '$location', '$route', 'requests', function alterarSenhaCtrl($scope, $window, $http, $q, $location, $route, requests) {

    $scope.input = {currentPass:'',pass:'',confirmation:''};
    $scope.inputStatus = '';

    //função executada no submit do form de login
    $scope.checkInputs = function(){

        let regPass = new RegExp('^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$', 'g');

        ///testa RegExp para verificar se a senha atinge os requisitos minimos
        if(regPass.test($scope.input.pass)){
            $scope.inputStatus = '';

            let inputObj = {'numeroEc':$window.sessionStorage.getItem('numeroEc'),'password':$scope.input.currentPass};

            requests.checkUserPass(inputObj)
            .then(function(data) { 
                //se a senha atual estiver correta
                // if(data.status === "OK") {

                    
                // } else if(data.status === "NOK") {
                //     $scope.input = {currentPass:'',user:'',pass:''};
                //     $scope.inputStatus = data.status;
                // }

                //faz a verificação dos campos e dá feedback visual em caso de erro 
                if($scope.input.pass === $scope.input.confirmation){
                    let inputObjR = {'numeroEc':$window.sessionStorage.getItem('numeroEc'),'pass':''};

                    //envia a nova senha para o servidor
                    requests.redefine(inputObjR)
                    .then(function(data) { 

                        $scope.input = {currentPass:'', pass:'',confirmation:''};
                        //exibe mensagem de sucesso ou erro
                        $scope.inputStatus = "OK";

                    })
                    .catch(function(err) { 
                        console.log('err: '+err);
                    });
                    
                //se os campos estão diferentes
                } else {
                    $scope.input = {currentPass: '',pass:'',confirmation:''};
                    $scope.inputStatus = 'different';
                }
            })
            .catch(function(err) { 
                console.log('err: '+err);

                if(err.status === 401) {
                    $scope.input = {currentPass:'',user:'',pass:''};
                    $scope.inputStatus = "NOK";
                }
            });

        } else{
            $scope.input = {pass:'',confirmation:''};
            $scope.inputStatus = 'regPass';
        }

    }

    $( document ).ready(function() {
        
        $("#buttonOk").on("click", function(){
            $window.sessionStorage.clear();
            $window.location.reload();
        }); 
    
        //ao focar, limpar feedbacks visuais de erro
        $('.form-control').on("click",function(){
            angular.element($('.form-control')).scope().inputStatus = '';
        });

        $('#modal-alterar-senha').on('hide.bs.modal', function () { 
            $scope.inputStatus = '';
            $route.reload();
        });  

    });

}]);