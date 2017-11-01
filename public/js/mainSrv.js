angular.module('app').service('mainSrv', function($http, $q){
  console.log('serving');

  var self = this

  this.getAddress = function(input) {
    console.log('user inputted: ', input)

    var repDistrict
    var dallasReps
    var details
    var itemsVoted = []

    return $http.get('/data/' + input)
    .then(function(response){

      repDistrict = response.data.socrata.district

      self.yourInfo = response.data
      return response

    })
    .then(function(response){

      var getMore = function() {
        return $http.get('/api/dallasreps.json')
      }

      return getMore()

    })
    .then(function(response){

        var getVotes = function(){
          return $http.get('https://www.dallasopendata.com/resource/q7ta-hutd.json')}

        dallasReps = response.data.representatives

        dallasReps.forEach(function(val){

          if (val.district == repDistrict) {

            details = val
          }
        })

        getVotes().then(function(response){

          console.log('get votes response: ', response);
          function convertUTCDateToLocalDate(date) {
              var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

              var offset = date.getTimezoneOffset() / 60;
              var hours = date.getHours();

              newDate.setHours(hours - offset);

              return newDate;
          }

          var theArrayOfItems = response.data

          theArrayOfItems.forEach(function(val, idx){

            // if (val.district == details.district && val.voter_name == details.name) {

            if (val.district == details.district) {
              // val.date = val.date.toLocalDateString('en-us')
              var date = convertUTCDateToLocalDate(new Date(val.date))
              val.date = date.toLocaleString()
              itemsVoted.push(val)
            }
          })

          details.itemsVoted = itemsVoted

        })



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



// end of service
})
