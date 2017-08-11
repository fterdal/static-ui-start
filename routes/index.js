const express = require('express');
const router = express.Router();
const {Place, Hotel, Activity, Restaurant } = require("../db");

router.get('/', (req, res, next) => {
  let allQueries = [
    Hotel.findAll(),
    Activity.findAll(),
    Restaurant.findAll()
  ];
  Promise.all(allQueries)
  .then( (everything) => {
    // console.log(everything);
    let [hotels, activities, restaurants] = everything;
    hotels = hotels.map((hotel) => {
      return { id: hotel.id, name: hotel.name }
    });
    activities = activities.map((activity) => {
      return { id: activity.id, name: activity.name }
    });
    restaurants = restaurants.map((restaurant) => {
      return { id: restaurant.id, name: restaurant.name }
    });

    res.render('index', {hotels, activities, restaurants});
  })
  .catch(next);
});

module.exports = router;
