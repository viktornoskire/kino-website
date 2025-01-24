import { test, expect } from '@jest/globals';
import request from 'supertest';
import { loadMovies, loadMovie } from "../src/movies.js"
import initialize from '../src/app.js';

const api = {
  loadMovie: async () => ({
    id: 2,
    title: 'Encanto',
    image: {
      url: 'https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg',
    },
  }),
  loadMovies: async () => [
    {
      id: 2,
      title: 'Encanto',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BOTY1YmU1ZTItMzNjZC00ZGU0LTk0MTEtZDgzN2QwOWVlNjZhXkEyXkFqcGc@._V1_.jpg',
      },
    },
    {
      id: 5,
      title: 'The Muppets',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BMjE0MTM4NTc3NF5BMl5Ban',
      },
    },
    {
      id: 10,
      title: 'Training Day',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BMjRlNjUwOGYtNGQxZS00Zj',
      },
    },
    {
      id: 6,
      title: 'Forrest Gump',
      image: {
        url: 'https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg',
      },
    },
  ],
};

test('Are the correct movies displayed?', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/')
    .expect(200)
    .expect('Content-Type', /html/);

  expect(res.text).toContain('Encanto');
  expect(res.text).toContain('The Muppets');
  expect(res.text).toContain('Training Day');
  expect(res.text).toContain('Forrest Gump');
});

test('Is the correct movies displayed?', async () => {
  const app = initialize(api);

  const res = await request(app)
    .get('/movies/2')
    .expect(200)
    .expect('Content-Type', /html/);

  console.log(res);
  expect(res.text).toContain('Encanto');
});
