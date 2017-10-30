angular.module('app').service('mainSrv', function($http){
  console.log('serving');

  var self = this

  this.getReps = function() {
    return $http.get('/api/dallasreps.json')
    .then(function(response){
      console.log(response.data);
      self.data = response.data      
    })
  }

})
