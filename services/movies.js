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

    addMovie: async (movie) => {
        const result = await knex('movies').insert(movie);
        return result;
    },

    updateMovie: async (movie) => {
        const result = await knex('movies').update(movie).where({ title: movie.title});
    },

    getMovieScripts: async (movieId) => {
        const scripts = await knex('movie_scripts').where({'movie_id': movieId}).orderBy('id');
        return scripts;
    },

    addMovieScript: async (script) => {
        const result = await knex('movie_scripts').insert(script);
    },

    updateMovieScrips : async (script) => {
        const result = await knex('movie_scripts').update(script).where({ id: script.id, movie_id: script.movie_id });
    },

    updateMovieStartTime : async(movieId) =>{
        const result = await knex('movies').update(movieId).where({ updated_at : movieId.updated_at})
    },

    getMovieStartTime : async(movieId) =>{
        const result = await knex('movies').where({ id : movieID})
        return result;
    },

    deleteMovie : async (id) =>{
        const movieResult = await knex('movies').where({'id' : id})
    }
};
