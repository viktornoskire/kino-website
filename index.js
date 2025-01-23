import { loadMovie, loadMovies } from './src/movies.js';
import createData from "./src/db.js";
import initialize from "./src/app.js";

const myAPI = {
  loadMovie,
  loadMovies,
  createData,
}

const app = initialize(myAPI)

app.listen(5080);
