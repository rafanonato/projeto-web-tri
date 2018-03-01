app.controller('calendarioCtrl', ['$scope', '$window', 'requests', function calendarioCtrl($scope, $window, requests) {

    $scope.monthNames = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"];

    let currentDate = new Date();

    $scope.currentDate = {
        month:currentDate.getMonth()+1,
        year:currentDate.getFullYear()
    };

    $scope.setCurrent = function(dir){
        if(dir === "prev"){
            if($scope.currentDate.month === 1){
                $scope.currentDate.month = 12;
                $scope.currentDate.year--;
            } else{
                $scope.currentDate.month--;
            }
        } else if(dir === "next"){
            if($scope.currentDate.month === 12){
                $scope.currentDate.month = 1;
                $scope.currentDate.year++;
            } else{
                $scope.currentDate.month++;
            }
        } else {
            $scope.currentDate.month = currentDate.getMonth()+1;
            $scope.currentDate.year = currentDate.getFullYear();
        }

    }

    $scope.listDays = {
        startOrEnd: function(month,year){
            let lastDay = new Date(year,month-1,0);

            let lastWeekday = 6-lastDay.getDay();
            let startDay = lastDay.getUTCDate() - lastDay.getDay();
            let days = [];

            for(let i = startDay; i <= lastDay.getUTCDate(); i++){
                days.push(i)
            }

            for(let i = 1; i <= lastWeekday; i++){
                days.push(i)
            }

            return days;

        },
        middle: function(month,year){

            let lastDayMonthBefore = new Date(year,month-1,0);
            let lastDay = new Date(year,month,0);
            let firstDaySecondLine = (6-lastDayMonthBefore.getDay())+1;
            let lastDayBeforeLastLine = lastDay.getUTCDate()-(lastDay.getDay()+1);
            let days = [];

            for(let i = firstDaySecondLine; i <= lastDayBeforeLastLine; i++){
                days.push(i)
            }

            return days;

        }
    }

    //pega os dados do estabelecimento
    requests.getDadosAgenda($window.sessionStorage)
    .then(function(data) {
        $scope.dadosCalendario = data;

        $scope.getDadosDia = function(date){

            for(let dia in $scope.dadosCalendario.dias){

                let d1 = date.split('/');
                d1 = new Date(d1[2], d1[1]-1, d1[0]);
                let d2 = $scope.dadosCalendario.dias[dia].data.split('/');
                d2 = new Date(d2[2], d2[1]-1, d2[0]);


                if(d1.getTime() === d2.getTime()){

                    return $scope.dadosCalendario.dias[dia];
                }
            }

            return false;
        }
    })
    .catch(function(err) {
        console.log('err: '+err);
    });

}]);
