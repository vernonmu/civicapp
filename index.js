const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const axios = require('axios')
const config = require('./config.js')
const NodeGeocoder = require('node-geocoder')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(express.static(__dirname + '/public'))

app.use(session({
  secret: config.sessionSecret,
  resave: true,
  saveUninitialized: false
}))

var options = {
  provider: 'google',
  apiKey: `${config.API_KEY}`
}

var geocoder = NodeGeocoder(options)


app.get('/data/:address', (req,res,next)=>{
  const address = req.params.address

  console.log(address);

  geocoder.geocode(address)
  .then(function(response){
    console.log(response[0]);

    var input = response[0]
    var lat = response[0].latitude
    var long = response[0].longitude
    var obj = {}

    axios.get('https://www.dallasopendata.com/resource/h9ws-fqcn.json?$where=intersects(the_geom,%20%27POINT%20(' + long + '%20' + lat + ')%27)')
    .then(function(response) {

      if (response) {
        console.log('AXIOS GOT: ', response.data[0]);
        obj.socrata = response.data[0]
        // console.log('object is: ', obj.socrata);
        return res.status(200).send(obj)
      }

      else {
        console.log('This is outside of the district map');
      }
    })


  })
  .catch(function(err){
    console.log(err);
  })

  // axios.get('https://maps.googleapis.com/maps/api/js?key=${config.API_KEY}&callback=initMap')
  // .then(function(response){
  //
  //   function codeAddress() {
  //     var geocoder = new google.maps.Geocoder();
  //     geocoder.geocode( { 'address': address }, function(results, status) {
  //       if (status == 'OK') {
  //         console.log(results[0].geometry);
  //       }
  //     })
  //   }
  //
  //   codeAddress()
  //
  //   return res.status(200).json(response.data)
  // })
  //
  //
  // .catch(function(error){
  //   console.log(error);
  // })

})

const port = config.port

app.listen(port, () => {
  console.log(`listening to ${port}`);
} )
