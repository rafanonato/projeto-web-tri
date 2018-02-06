app.service('requests', ['$http', '$q', function($http, $q) {
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

    this.checkUserPass = function (inputObj) {
        let deferred = $q.defer();

        $http.post("./assets/json/users.json", JSON.stringify(inputObj))
        //$http.post("http://10.11.20.129:8080/validaUsuario", JSON.stringify(inputObj))
        
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

    this.recover = function (inputObj) {
        let deferred = $q.defer();

        $http.post("./assets/json/userEmail.json", JSON.stringify(inputObj))
        //$http.post("http://10.11.20.129:8080/validaUsuario", JSON.stringify(inputObj))
        
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

    this.redefine = function (inputObj) {
        let deferred = $q.defer();

        $http.post("./assets/json/redefine.json", JSON.stringify(inputObj))
        //$http.post("http://10.11.20.129:8080/validaUsuario", JSON.stringify(inputObj))
        
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