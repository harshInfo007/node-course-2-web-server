const express = require('express');
const hbs = require('hbs');
const fs= require('fs');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'hbs')
app.use((req, resp, next) => {

    console.dir(req.originalUrl) // '/admin/new'
    console.dir(req.baseUrl) // '/admin'
    console.dir(req.path)

    const log = `${new Date().toString()} : ${req.originalUrl} ${req.path} ${req.method} `;
    console.log(log)
    fs.appendFile('logs.txt', log, (err) => {
        if (err) throw err;
        console.log('The "data to append" was appended to file!');
      });
    next();
})

app.use((req, resp, next) => {

    // resp.render('maintanance.hbs', {
    //     pageTitle: 'Maintanance Page',
    // })
    next();
})
app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})
hbs.registerHelper('makeTextUppercase', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, resp) => {
    resp.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to our Website'
    })
})

app.get('/',(req, resp) => {
    resp.send({
        name: 'Harsh',
        Hobbies:[
            'Playing volleyball',
            'CS',
        ]
    })
})

app.get('/about', (req, resp) => {
    resp.render('about.hbs', {
        pageTitle: 'About Page',
    })
})

app.listen(port, () => {
    console.log(`App is launched with port number ${port}`);
});