
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

    //função executada no submit do form de login (executa o captcha)
    $scope.onSubmit = function(){
        grecaptcha.execute();
        //$scope.checkInputs()
    }

    //função executada no submit do form de login (depois do captcha)
    $scope.checkInputs = function(){

        //sempre reseta o captcha (pode dar erro se não for resetada)
        grecaptcha.reset();

        $scope.inputStatus = '';

        //faz a verificação dos campos e dá feedback visual em caso de erro 
        if($scope.input.user && $scope.input.pass){

            let regCNPJ = new RegExp('\\d{2}.?\\d{3}.?\\d{3}\\/?\\d{4}-?\\d{2}', 'g');
            let regEMAIL = new RegExp('^[a-zA-Z0-9.!#$%&\'*+=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$','g');

            let inputObj = {'email':'','cnpj':'', 'numeroEc':'', 'password':$scope.input.pass};

            //testa RegExp e em caso positivo, seta a propriedade do objeto correspondente
            if(regEMAIL.test($scope.input.user)){
                inputObj.email = $scope.input.user;
            }else if(regCNPJ.test($scope.input.user) && ($scope.input.user.length === 14 || $scope.input.user.length === 18)){
                inputObj.cnpj = removeChars($scope.input.user);
            } else {
                inputObj.numeroEc = $scope.input.user;
            }

            //checa o usuário e senha no servidor
            requests.checkUserPass(inputObj)
            .then(function(data) { 
                //se o usuário tem autorização
                // if(data.status === "OK" || ) {
                //     //salva a sessão e envia o usuário para a página interna
                //     $window.sessionStorage.setItem('userId', data.id);
                //     $window.sessionStorage.setItem('numeroEc', data.id);
                //     if ($window.sessionStorage.getItem('userId')){
                //         $location.path('estabelecimento');
                //     }
                // //se o usuário não tem autorização
                // } else if(data.status === "NOK") {
                //     $scope.input = {user:'',pass:''};
                //     $scope.inputStatus = data.status;
                // //se o usuário foi bloqueado
                // } else if(data.status === "blocked") {
                //     //envia o usuário para a página de recuperar a senha
                //     $location.path('recuperar');
                // }
                $window.sessionStorage.setItem('userId', data.id);
                $window.sessionStorage.setItem('numeroEc', data.id);
                if ($window.sessionStorage.getItem('userId')){
                    $location.path('estabelecimento');
                }
            })
            .catch(function(err) { 
                //se o usuário não tem autorização
                if(err.status === 401 || err.status === 404) {
                    $scope.input = {user:'',pass:''};
                    $scope.inputStatus = "NOK";
                }
            });

        }
    }

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

}]);

//depois que o captcha confirma que o usuário não é robô, ele executa a função checkInputs()
function afterCaptcha(token) {
        
    angular.element($('.form-control')).scope().checkInputs();
}

function removeChars(string){
    string = string.replace(/[^0-9]/g,'');

    return string;
}

