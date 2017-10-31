angular.module('app').service('mainSrv', function($http, $q){
  console.log('serving');

  var self = this


  // var getReps = function() {
  //   return $http.get('/api/dallasreps.json')
  //   .then(function(response){
  //     console.log(response.data);
  //
  //     dallasReps = response.data.representatives
  //
  //     // self.data = response.data
  //   })
  // }



  this.getAddress = function(input) {
    console.log(input)

    var repName
    var dallasReps
    var details

    return $http.get('/data/' + input)
    .then(function(response){

      // console.log(response.data.socrata);

      repName = response.data.socrata.councilper

      self.yourInfo = response.data
      return response

    })
    .then(function(response){
      // console.log(response);
      var getMore = function() {
        return $http.get('/api/dallasreps.json')
      }

      return getMore()

    })
    .then(function(response){

        // console.log(response.data.representatives);

        dallasReps = response.data.representatives
        // console.log(dallasReps);
        dallasReps.forEach(function(val){
          // console.log('valname: ', val.name);
          // console.log('repname: ', repName);
          if (val.name == repName) {
            console.log('bingo!');

            details = val
          }
        })
        // console.log(repName);
        // return response
        // self.data = response.data
        return details
    })
    .then(function(response){

      console.log('last one', response);

      self.matchedRep = response

    })
    .catch(function(error){
      console.log('oh, no! error: ', error);
    })
  }



})
