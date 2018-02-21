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

        console.log(JSON.stringify(inputObj))
        
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

        $http.post("./assets/json/redefine.json", JSON.stringify(inputObj))
        
        
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
                response.data.cnae = response.data.cnae + " - Comércio varejista de mercadorias em geral, com predominância de produtos";
                console.log(response.data)
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

}]);