
const express = require('express');
const router = express.Router();
const movieService = require('../services/movies');
const movieParser = require('body-parser');
const auth = require('../bin/auth');

/* GET users listing. */
router.get('/movies', auth.validate, async (req, res, next) => {
    const movies = await movieService.getMovies();
    res.json(movies);
    console.log('this is router movie get');
});

router.get('/movies/:id', auth.validate, async (req, res, next) => {
    const id = req.params.id;
    const userId = req.user.id;
    const movie = await movieService.getMovie(id);
    res.json(movie);
});

router.delete('/movies/:id', auth.validate, async (req, res, next) => {

  const id = req.params.id;
  await movieService.deleteMovie(id);
  res.sendStatus(200);
});

router.post('/movies', auth.validate, async (req, res, next) => {

    const movie = {
       title: req.body.title,
       genre: req.body.genre,
       image: req.body.image,
       StartTime: req.body.StartTime
       //updated_at : Date.now()
   };

   await movieService.addMovie(movie);
   res.sendStatus(200);
});

router.put('/movies', auth.validate, async (req, res, next) => {

   const movie = {
       title: req.body.title,
       genre: req.body.genre,
       image: req.body.image,
       StartTime:req.body.StartTime,
       Summary: req.body.Summary
   };

   const moive = await movieService.updateMovie(movie);
   res.json(moive)
   //res.sendStatus(200);
});

router.get('/movies/:id/scripts', auth.validate, async (req, res, next) => {
    const id = req.params.id;

    const scripts = await movieService.getMovieScripts(id);
    res.json(scripts);
});

router.post('/movies/:id/scripts', auth.validateAdmin, async  (req, res, next)=>{
    const script = {
        movie_id: req.params.id,
        begin_at: req.body.begin_at,
        end_at: req.body.end_at,
        script: req.body.script,
    };

    await movieService.addMovieScript(script);
    res.sendStatus(200);
});

router.put('movie/:movie_id/scripts/:id', auth.validate, async (req, res, next) => {

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
