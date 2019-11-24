const express = require('express');
const router = express.Router();
const teacherService = require('../services/teachers');

router.get('/teachers',async (req, res, next) => {
    const teacher = await teacherService.getTeachers();
    res.json(teacher);
})

router.get('/teachers/:id', async (req, res, next) => {
    const id = req.params.id;
    const teachers = await teacherService.getTeacher(id);
    res.json(teachers);
})

router.post('/teachers' ,async (req, res, next) =>{
    const teacher = {
        name : req.body.name,
        adm : req.body.adm,
        special : req.body.special
    }

    await teacherService.addTeacher(teacher);
    res.sendStatus(200);
})

module.exports= router;
