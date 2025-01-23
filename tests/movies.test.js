import { test, expect } from '@jest/globals';
import request from 'supertest';

import initialize from '../src/app.js';

test('Are the correct movies displayed?', async () => {
  const app = initialize({
    loadMovie: async () => {
      return {
        id: 1,
        title: 'Encanto',
      };
    },
    loadMovies: async () => {
      return [
        {
          id: 1,
          title: 'Encanto',
        },
        {},
      ];
    },
  });

  const res = await request(app)
    .get("/")
    .expect("Content-Type", /html/)
    .expect(200)

    expect(response.text).toMatch("Encanto");
});
