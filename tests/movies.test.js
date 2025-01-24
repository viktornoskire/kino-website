import { test, expect } from '@jest/globals';
import request from 'supertest';
import { loadMovies, loadMovie } from "../src/movies.js"
import initialize from '../src/app.js';

const api = {
  loadMovie,
  loadMovies,
}

test('Are the correct movies displayed?', async () => {
  const app = initialize(api);

  const res = await request(app).get('/').expect('Content-Type', /html/);
  expect(res.text).toContain('Encanto');
  expect(res.text).toContain('Forrest Gump');
  expect(res.text).toContain('Training Day');
});

test('Is the correct movies displayed?', async () => {
  const app = initialize(api);

  const res = await request(app).get('/movies/2').expect('Content-Type', /html/);
  console.log(res);
  expect(res.text).toContain('Encanto');
});
