import express from 'express';
import createData from './db.js';

export default function initialize(api) {
  const app = express();
  app.set('view engine', 'pug');


  app.get('/', async (req, res) => {
    const movies = await api.loadMovies();
    res.render('home', {
      data: createData(),
      movies: movies,
    });
  });

  app.get('/movies/:id', async (req, res) => {
    const id = req.params.id;
    try {
      res.render('movie', {
      data: createData(),
      movie: await api.loadMovie(id),
    });
    } catch (err) {
      res.status(404).render("404", { data: createData(),})
    }
  });

  app.get('/about', async (req, res) => {
    res.render('about', { data: createData() });
  });

  app.get('/kids', async (req, res) => {
    res.render('kids', { data: createData() });
  });

  app.use('/static', express.static('./static'));
  app.use('/img', express.static('./public/img'));
  app.use('/movies/static', express.static('./static'));
  app.use('/movies/img', express.static('./public/img'));

  return app;
}
