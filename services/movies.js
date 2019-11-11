const knex = require('../bin/config').movieknex;

module.exports = {
    getMovies: async () => {
        const movies = await knex('movies').orderBy('id');
        return movies;
    },

    getMovie: async (id) => {
        const movieResult = await knex('movies').where({'id': id});
        return movieResult[0];
    },

    getMovieScripts: async (movieId) => {
        const scripts = await knex('movie_scripts').where({'movie_id': movieId});
        return scripts;
    },

    addMovie: async (movie) => {
        const result = await knex('movies').insert(movie);
        return result;
    },

    updateMovie: async (movie) => {
        const result = await knex('movies').update(movie).where({ id: movie.id });
    }
};
