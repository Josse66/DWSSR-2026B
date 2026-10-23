import express from 'express'

const usersRouter = express.Router();

/* GET users listing. */
usersRouter.get('/', (req, res, _next) => {
  res.send('<h1 style = "color: blue; background-color: lightblue; font-size: 45px">LISTA DE USUARIOS</h1>');
});

export default usersRouter;
