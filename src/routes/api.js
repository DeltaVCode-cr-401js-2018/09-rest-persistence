'use strict';

const router = require('../lib/router');
const Hero = require('../models/hero');

router.get('/api/heroes', (req, res)=>{
  if (req.query.id) {
    return Hero.findById(req.query.id)
      .then(hero => {
        json(res, hero);
      });
  }

  Hero.fetchAll()
    .then(heroes => {
      json(res, heroes);
    });
});

router.post('/api/heroes', (req, res) => {
  var newHero = new Hero(req.body);

  newHero.save()
    .then(saved => {
      json(res, saved);
    });
});

function json(res, object) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(object));
  res.end();
}