
app.controller('loginCtrl', ['$scope', '$window', '$http', '$q', '$location', 'requests', function loginCtrl($scope, $window, $http, $q, $location, requests) {

    //verifica se o usuário está autenticado e o envia para a página interna 
    if ($window.sessionStorage.getItem('userId')){
        $location.path('/');
    }

    //carrega o js do captcha (precisa ser carregado em cada controller)
    $.getScript("https://www.google.com/recaptcha/api.js");
    
    $scope.input = {user:'',pass:''}
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
        if($scope.input.user && $scope.input.pass){

            let regCNPJ = new RegExp('\\d{2}.?\\d{3}.?\\d{3}\\/?\\d{4}-?\\d{2}', 'g');
            let regEMAIL = new RegExp('@');

            let inputObj = {'email':'','cnpj':'', 'numeroEc':'', 'password':$scope.input.pass};

            //testa RegExp e em caso positivo, seta a propriedade do objeto corresponente
            if(regEMAIL.test($scope.input.user)){
                inputObj.email = $scope.input.user;
            }else if(regCNPJ.test($scope.input.user) && ($scope.input.user.length === 14 || $scope.input.user.length === 18)){
                inputObj.cnpj = $scope.input.user;
            } else {
                inputObj.numeroEc = $scope.input.user;
            }

            //checa o usuário e senha no servidor
            requests.checkUserPass(inputObj)
            .then(function(data) { 
                //se o usuário tem autorização
                if(data.status === "OK") {
                    //salva a sessão e envia o usuário para a página interna
                    $window.sessionStorage.setItem('userId', data.id);
                    if ($window.sessionStorage.getItem('userId')){
                        $location.path('main');
                    }
                //se o usuário não tem autorização
                } else if(data.status === "NOK") {
                    $scope.input = {user:'',pass:''};
                    $scope.inputStatus = data.status;
                //se o usuário foi bloqueado
                } else if(data.status === "blocked") {
                    //envia o usuário para a página de recuperar a senha
                    $location.path('recuperar');
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