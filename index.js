import express from 'express';
import fs from 'fs/promises';
import createData from './static/db.js';

const app = express();
app.set('view engine', 'pug');

app.get('/', async (req, res) => {
  res.render('home', createData());
});

app.get('/about', async (req, res) => {
  res.render('about', createData());
});

app.get('/kids', async (req, res) => {
  res.render('kids', createData());
});

app.use('/static', express.static('./static'));
app.use('/img', express.static('./public/img'));

app.listen(5080);
