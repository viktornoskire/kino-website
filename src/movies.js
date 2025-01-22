import fetch from "node-fetch";

const apiBase = 'https://plankton-app-xhkom.ondigitalocean.app/api';

function toMovieObject(api) {
    return {
        id: api.id,
        ...api.attributes,
    }
}

export async function loadMovies() {
    const res = await fetch(apiBase + "/movies");
    const payload = await res.json();
    return payload.data.map(toMovieObject);
};

export async function loadMovie(id) {
    const res = await fetch(apiBase + "/movies/" + id);
    const payload = await res.json();
    return toMovieObject(payload.data);
};