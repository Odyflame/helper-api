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
})

module.exports = router;
