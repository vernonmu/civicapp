angular.module('app').controller('mainCtrl', function($scope, mainSrv) {
  console.log('controlling');
  $scope.test = "working"

  $scope.getReps = function() {
    mainSrv.getReps()
    .then(function(response){
      $scope.yourReps = mainSrv.data.representatives
    })
  }


})
