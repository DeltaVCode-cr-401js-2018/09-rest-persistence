'use strict';

const request = require('supertest');

const app = require('../src/app');
const Hero = require('../src/models/hero');

describe('app', () => {
  it('responds with 404 for unknown path', () => {
    return request(app).get('/404')
      .expect(404)
      .expect('Content-Type', 'text/html')
      .expect('Resource Not Found');
  });

  it('responds with HTML for /', () => {
    return request(app).get('/')
      .expect(200)
      .expect('Content-Type', 'text/html')
      .expect(response => {
        expect(response.text[0]).toBe('<');
      });
  });

  it('responds with HTML for /cowsay?text={message}', ()=>{
    return request(app)
      .get('/cowsay?text=cool')
      .expect(200)
      .expect('Content-Type', 'text/html')
      .expect(response =>{
        expect(response.text).toBeDefined();
        expect(response.text).toMatch('<html>');
        expect(response.text).toMatch(' cool ');
        expect(response.text).toMatch('</html>');
      });
  });

  // it('responds with 500 for /500', ()=>{
  //   return request(app)
  //     .post('/500')
  //     .expect(500)
  //     .expect('Content-Type', 'text/html')
  //     .expect('Test Error');
  // });

  // it('responds with message for POST /api/cowsay', ()=> {
  //   return request(app)
  //     .post('api/cowsay')
  //     .send({ text: 'Batman'})
  //     .expect(200)
  //     .expect('Content-Type', 'application/json')
  //     .expect(response => {
  //       expect(response.body).toBeDefined();
  //       expect(response.body.message).toMatch('Hello, Batman!');
  //     });
  // });

  describe('api routes', () => {
    it('can get /api/heroes', () => {
      var heroes = [
        new Hero({ name: 'Batman', universe: 'dc', power: 'rich' }),
      ];

      return Promise.all(
        heroes.map(hero => hero.save())
      ).then(savedHeroes => {
        return request(app)
          .get('/api/heroes')
          .expect(200)
          .expect('Content-Type', 'application/json')
          .expect(savedHeroes);
      });
    });

    it('can get /api/heroes?id=...', ()=> {
      var hero = new Hero({ name: 'test', universe: 'test', power: 'test' });

      return hero.save()
        .then(saved => {
          return request(app)
            .get(`/api/heroes?id=${saved.id}`)
            .expect(200)
            .expect('Content-Type', 'application/json')
            .expect(saved);
        });
    });

    // it('can POST /api/heroes to create hero', () => {
    //   return request(app)
    //     .post('/api/heroes')
    //     .send({ name: 'Testing', universe: 'to see', power: 'it works' })
    //     .expect(200)
    //     .expect('Content-Type', 'application/json')
    //     .expect(response => {
    //       expect(response.body).toBeDefined();
    //       expect(response.body.id).toBeDefined();
    //       expect(response.body.name).toBe('Testing');
    //       expect(response.body.universe).toBe('to see');
    //       expect(response.body.power).toBe('it works');
    //     });
    // });
  });
});
