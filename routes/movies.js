const express = require('express');
const router = express.Router();
const movieService = require('../services/movies');
const movieParser = require('body-parser');

/* GET users listing. */
router.get('/movies', async (req, res, next) => {
    const movies = await movieService.getMovies();
    res.json(movies);
    console.log('this is router movie get');
});

router.get('/movies/:id', async (req, res, next) => {
    const id = req.params.id;
    const movie = await movieService.getMovie(id);
    res.json(movie);
});

router.post('/movies', async (req, res, next) => {

    const movie = {
       title: req.body.title,
       genre: req.body.genre,
       image: req.body.image
   };

   await movieService.addMovie(movie);
   res.sendStatus(200);
});

router.put('/movies/:id', async (req, res, next) => {

   const movie = {
       id: req.params.id,
       title: req.body.title,
       genre: req.body.genre,
       image: req.body.image
   };

   await movieService.updateMovie(movie);
   res.sendStatus(200);
});

router.get('/movies/:id/scripts', async (req, res, next) => {
    const id = req.params.id;

    const scripts = await movieService.getMovieScripts(id);
    res.json(scripts);
});

router.post('/movies/:id/scripts', async  (req, res, next)=>{
    const script = {
        movie_id: req.params.id,
        begin_at: req.body.begin_at,
        end_at: req.body.end_at,
        script: req.body.script,
    };

    await movieService.addMovieScript(script);
    res.sendStatus(200);
});

router.put('movie/:movie_id/scripts/:id', async (req, res, next) => {
    const script = {
        movie_id: req.params.movie_id,
        id: req.params.id,
        begin_at: req.body.begin_at,
        end_at: req.body.end_at,
        script: req.body.script,
    };

    await movieService.updateMovieScrips(script);
    res.sendStatus(200);
});

module.exports = router;
