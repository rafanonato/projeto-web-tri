
app.controller('recuperarCtrl', ['$scope', '$window', '$http', '$q', '$location', 'requests', function recuperarCtrl($scope, $window, $http, $q, $location, requests) {

    //verifica se o usuário está autenticado e o envia para a página interna 
    if ($window.sessionStorage.getItem('userId')){
        $location.path('/');
    }

    //carrega o js do captcha (precisa ser carregado em cada controller)
    $.getScript("https://www.google.com/recaptcha/api.js");
    
    $scope.input = {user:''}
    $scope.inputStatus = '';

    //pega as configurações da aplicação
    requests.getConfig()
    .then(function(data) { 
        $scope.config = JSON.stringify(data);
    })
    .catch(function(err) { 
        console.log('err: '+err);
    });

    $scope.onSubmit = function(){
        grecaptcha.execute();
    }


    //função executada no submit do form de login
    $scope.checkInputs = function(){

        $scope.inputStatus = '';

        //faz a verificação dos campos e dá feedback visual em caso de erro 
        if($scope.input.user){

            let regCNPJ = new RegExp('\\d{2}.?\\d{3}.?\\d{3}\\/?\\d{4}-?\\d{2}', 'g');
            let regEMAIL = new RegExp('@');

            let inputObj = {'email':'','cnpj':'', 'numeroEc':''};

            //testa RegExp e em caso positivo, seta a propriedade do objeto corresponente
            if(regEMAIL.test($scope.input.user)){
                inputObj.email = $scope.input.user;
            }else if(regCNPJ.test($scope.input.user) && ($scope.input.user.length === 14 || $scope.input.user.length === 18)){
                inputObj.cnpj = $scope.input.user;
            } else {
                inputObj.numeroEc = $scope.input.user;
            }

            //checa o usuário e pega o email (se ok)
            requests.recover(inputObj)
            .then(function(data) { 

                $scope.input = {user:''};
                //exibe mensagem de sucesso ou erro
                $scope.inputStatus = data.status;
                
                if(data.status === 'OK'){
                    $('.box-login .box-content h6').text('Informação Importante');
                    $('.box-login .box-content p').text('Foi enviado um link para o email abaixo, com as instruções para recuperação da sua senha de acesso.');
                    $('.feedback').text(data.email);
                }

            })
            .catch(function(err) { 
                console.log('err: '+err);
            });

        }
    }

}]);

$( document ).ready(function() {
    let typePass = 'password';

    //ao clicar no ícone 'eye' o script alterna o type entre 'senha' e 'text'
    $("#showPass").on("click", function() {
        typePass = (typePass === "text")? 'password':'text';
        $('#inputPass')[0].type = typePass;
    });    
    
    //ao focar, limpar feedbacks visuais de erro
    $('.form-control').on("click",function(){
        angular.element($('.form-control')).scope().inputStatus = '';
    });

});

function afterCaptcha(token) {
    angular.element($('.form-control')).scope().checkInputs();
}