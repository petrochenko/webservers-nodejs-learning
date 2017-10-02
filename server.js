const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((request, response, next) => {
  let now =  new Date().toString();
  let log = `${now}: ${request.method} ${request.url}`;
  fs.appendFile('server.log', log + '\n', (error) => {
    if(error) {
      console.log('Unable to append to server.log');
    }
  });
  next();
});

// app.use((request, response, next) => {
//   response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('creamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (request, response) => {
  // response.send('Hello Express!');
  response.render('home.hbs', {
    name: 'Sergey',
    likes: [
      'Biking',
      'Cities'
    ],
    pageTitle: 'Home page',
  });
});

app.get('/about', (request, response) => {
  response.render('about.hbs', {
    pageTitle: 'About page',
  });
});

app.get('/bad', (request, response) => {
  response.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000')
});
