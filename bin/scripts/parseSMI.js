const request = require('request-promise');
const knex = require('../config').movieknex;

const movieService = require('../../services/movies');

const parser = require("sami-parser");
const srtparser = require("subtitles-parser");
const chardet = require("chardet");
const iconv  = require("iconv-lite");
const utils = require('utils');

function parseTime(input) {
    let   ms = input % 1000; input = ~~(input / 1000);
    let  sec = input %   60; input = ~~(input /   60);
    let  min = input %   60; input = ~~(input /   60);
    let hour = input;
    return padLeft(hour, 2, "0") + ":" +
        padLeft( min, 2, "0") + ":" +
        padLeft( sec, 2, "0") + "." +
        padLeft(  ms, 3, "0");
}

function parseSmi(rawData) {
    // 1. read file
    // 2. parse smi -> array data
    // 3. data 에서 의미있는 정보 추출 (begin_at, end_at, script)
    // 4. return [{ begin_at, end_at, script }]

    let encoding = chardet.detect(rawData);

    let smiData = iconv.decode(rawData, "EUC-KR");
    let smiParsed = parser.parse(smiData, {});

    let movie_scripts = [ {begin_at: 0, end_at: 0, script :""}];

    for(let segment of smiParsed.result) {
        let text = segment.languages.ko || segment.languages.kr ||
            segment.languages.en || segment.languages.ko-KR ||"";
        let start = parseTime(segment.startTime);
        let end = parseTime(segment.endTime);

        const script = {

            begin_at: segment.startTime,
            end_at: segment.endTime,
            script: text,

        };
        movie_scripts.push(script);
    }

    return movie;
}

async function postScriptData(scripts) {
    // for문 돌면서 post -> localhost:3000/movies/:id/script

    //requst.js를 이용해서 post하는 것이 좋을 것 같다
    //knex는 db, request.js는 html

     for(element of scripts){

         const script = {
             movie_id : 1,
             begin_at: element.startTime,
             end_at: element.endTime,
             script: element.text,
         };

         const result = await knex('movie_scripts').insert(script)
         //return result;

         console.log(result);
     }

}

async function parseAndPost() {
    //const scripts = parseSmi(fs.readFileSync('./Sister.smi', 'EUC-KR'));

 /*   let scripts2 = parser.parseFile('./Sister.smi', options = {});
    console.log(JSON.stringify(scripts2));*/

    const fs = require("fs");
    const srt = fs.readFileSync('bin/scripts/Sister.srt', "utf8");
    let scripts = srtparser.fromSrt(srt, true);

    //const scripts2 = srtparser.fromSrt(srt);
    //const scripts = parseSmi('./Sister.smi');

    await postScriptData(scripts);

    process.exit();
}

parseAndPost();
// node bin/scripts/parseSMI근ㄷ
