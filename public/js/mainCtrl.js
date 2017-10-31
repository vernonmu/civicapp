angular.module('app').controller('mainCtrl', function($scope, mainSrv) {
  console.log('controlling');
  $scope.test = "working"

  $scope.getAddress = function(input) {
    mainSrv.getAddress(input)
    .then(function(response) {
      $scope.yourInfo = mainSrv.yourInfo
      $scope.matchedRep = mainSrv.matchedRep
    })
  }

  $scope.getReps = function() {
    mainSrv.getReps()
    .then(function(response){
      // $scope.yourReps = mainSrv.data.representatives
    })
  }

})
