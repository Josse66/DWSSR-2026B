import express from 'express';

const indexRouter = express.Router();

let counter = 0;
const numbers = []

/* GET home page. */
// eslint-disable-next-line
indexRouter.get('/', function(req, res, next) {
  counter+=1;
  numbers.push(counter)
  res.render('index', { title: 'Jose Armando',
    counter,
    numbers
  });
});

export default indexRouter;