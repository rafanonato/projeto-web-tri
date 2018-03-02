app.service('requests', ['$http', '$q', function($http, $q) {

    //request para pegar configurações da aplicação
    this.getConfig = function () {
        let deferred = $q.defer();

        $http.get("./assets/json/config.json")

        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para verificar usuário no login
    this.checkUserPass = function (inputObj) {
        let deferred = $q.defer();
        
        //$http.post("./assets/json/users.json", JSON.stringify(inputObj))
        $http.post("http://localhost:8082/validaUsuario", JSON.stringify(inputObj))
        .then(
            
            function (response) {
                
                deferred.resolve(response.data);
            },

            function (response) {
                
                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para recuperar senha
    this.recover = function (inputObj) {
        let deferred = $q.defer();

        //$http.post("./assets/json/userEmail.json", JSON.stringify(inputObj))
        $http.post("http://localhost:8082/redefinesenha", JSON.stringify(inputObj))
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para redefinir senha
    this.redefine = function (inputObj) {
        let deferred = $q.defer();

        $http.post("http://127.0.0.1:8082/atualizarSenha", JSON.stringify(inputObj))
        
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar informações do usuário
    this.getUserInfo = function (inputObj) {
        let deferred = $q.defer();

        $http.get("./assets/json/userInfo.json?user="+inputObj.userId+"&numeroEc="+inputObj.numeroEc)
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar lista dos estabelecimentos
    this.getEstabelecimentos = function (inputObj) {
        let deferred = $q.defer();

        //$http.get("./assets/json/listaEstabelecimentos.json?user="+inputObj.userId+"&numeroEc="+inputObj.numeroEc)
        $http.get("http://localhost:8085/buscaListaEc?codigoEC="+inputObj.numeroEc)
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar dados do estabelecimento
    this.getDadosEstabelecimento = function (inputObj) {
        let deferred = $q.defer();
        //$http.get("./assets/json/estabelecimentoDados.json?codigoEc="+inputObj.codigoEc)
        $http.get("http://localhost:8084/estabelecimento?codigoEc="+inputObj.numeroEc)

        .then(
            function (response) {
                
                deferred.resolve(response.data);

            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar dados de produtos e taxas
    this.getDadosProdutosTaxas = function (inputObj) {
        let deferred = $q.defer();

        $http.get("./assets/json/produtosTaxasDados.json?user="+inputObj.userId+"&numeroEc="+inputObj.numeroEc)
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar dados de equipamentos
    this.getDadosEquipamentos = function (inputObj) {
        let deferred = $q.defer();

        $http.get("./assets/json/equipamentosDados.json?user="+inputObj.userId+"&numeroEc="+inputObj.numeroEc)
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar dados de solicitacoes
    this.getDadosSolicitacoes = function (inputObj) {
        let deferred = $q.defer();

        $http.get("http://localhost:7010/solicitacoesDados?numeroEc="+inputObj.numeroEc)
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar dados de solicitacoes
    this.getTempoSolicitacao = function (inputObj) {
        let deferred = $q.defer();

        $http.get("http://localhost:7010/filaAtendimento?numeroEc="+inputObj.numeroEc)
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para novo chamado
    this.novoChamado = function (inputObj) {
        let deferred = $q.defer();

        //$http.post("./assets/json/chamado.json", JSON.stringify(inputObj))
        $http.post("http://localhost:7010/createCase", JSON.stringify(inputObj))
        
        .then(
            function (response) {

                deferred.resolve(response.data);
            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar dados do estabelecimento
    this.getDadosAgenda = function (inputObj) {
        let deferred = $q.defer();
        $http.get("./assets/json/calendarioDados.json?codigoEc="+inputObj.codigoEc)
        //$http.get("http://localhost:8084/estabelecimento?codigoEc="+inputObj.numeroEc)

        .then(
            function (response) {
                
                deferred.resolve(response.data);

            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

    //request para pegar lista de usuários
    this.getListaUsuarios = function (inputObj) {
        let deferred = $q.defer();
        $http.get("./assets/json/listaUsuarios.json"+inputObj.codigoEc, JSON.stringify(inputObj))
        //$http.get("http://localhost:8084/estabelecimento?codigoEc="+inputObj.numeroEc)

        .then(
            function (response) {
                
                deferred.resolve(response.data);

            },

            function (response) {

                deferred.reject( response);

            }
        );

        return deferred.promise;
    }

}]);