import express from "express";

export default function initialize(api) {
    const app = express();
    app.set('view engine', 'pug');

    app.get('/', async (req, res) => {
      res.render('home', {
        data: api.createData(),
        movies: await api.loadMovies(),
      });
    });

    app.get('/movies/:id', async (req, res) => {
      const id = req.params.id;
      res.render('movie', {
        data: api.createData(),
        movie: await api.loadMovie(id),
      });
    });

    app.get('/about', async (req, res) => {
      res.render('about', { data: api.createData() });
    });

    app.get('/kids', async (req, res) => {
      res.render('kids', { data: api.createData() });
    });

    app.use('/static', express.static('./static'));
    app.use('/img', express.static('./public/img'));
    app.use('/movies/static', express.static('./static'));
    app.use('/movies/img', express.static('./public/img'));

    return app;
}