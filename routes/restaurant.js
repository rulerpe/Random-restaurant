var express = require('express');
var router = express.Router();
//var mongoose = require('mongoose');
//var bluebird = require('bluebird');
//var Restaurant = require('../models/Restaurant.js');
var apiKey = "kJdC0NjhIp_K_gMHrONmoebapo0_acuZ6vo48QnfmoWBAf59jq-xBIKW3CNZvekMFK2iSSxga9z6818yrzehwpFxgY_2UeCsShe3N74rl_XVd5EAdL7DvkutYzdkWnYx"
var axios = require('axios');
//mongoose.Promise = bluebird;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Express RESTful API');
});

router.post('/', function(req, res, next) {
  // Restaurant.create(req.body)
  // .then(function (data){
  //   var config = {
  //     headers: {
  //       'withCredentials': true,
  //       'Authorization': 'Bearer ' + apiKey
  //     }
  //   }
  //   var api = `https://api.yelp.com/v3/businesses/search?limit=20&location=${data.zipCode}`
  //   api = `${api}&term=restaurants ${data.type}`
  //   api = data.delivery ? `${api} delivery` : api
  //   api = data.price ? `${api}&price=${data.price}` : api
  //   api = encodeURI(api)
  //   axios.get(api, config)
  //     .then(function (response) {
  //       res.json(response.data);
  //     })
  //     .catch(function (error) {
  //       throw 'yelp error'
  //     })
  // })
  // .catch(function(err){
  //   return next(err);
  // })
  var config = {
    headers: {
      'withCredentials': true,
      'Authorization': 'Bearer ' + apiKey
    }
  }
  var api = `https://api.yelp.com/v3/businesses/search?limit=20&location=${req.body.zipCode}`
  api = `${api}&term=restaurants ${req.body.type}`
  api = req.body.delivery ? `${api} delivery` : api
  api = req.body.price ? `${api}&price=${req.body.price}` : api
  api = encodeURI(api)
  axios.get(api, config)
    .then(function (response) {
      res.json(response.data);
    })
    .catch(function (error) {
      throw 'yelp error'
    })

});

module.exports = router;