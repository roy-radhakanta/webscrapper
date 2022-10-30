const PORT = 8000;

const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');

const app = express();
const url = 'https://www.linkedin.com/login';
axios(url)
    .then(response => {
        const html = response.data;

        const $ = cheerio.load(html);
        const articles = [];
        $('input', html).each(function(){
            const title = $(this).text();
            const url = $(this).find('a').attr('href');
            articles.push({title: title, url: url});
        });
        console.log(articles);
    }).catch(error=>console.log(error))

app.listen(PORT, ()=>{console.log(`server running on port ${PORT}`)});