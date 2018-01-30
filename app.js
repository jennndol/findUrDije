const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const genreRouter = require('./routers/genreRouter');
const eventRouter = require('./routers/eventRouter');
const dj = require('./routers/dj');
const book = require('./routers/book');
const index = require('./routers/index');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/', index);
app.use('/genres', genreRouter);
app.use('/events', eventRouter);
app.use('/djs', dj);
app.use('/books', book);


app.listen(3000, () => console.log(`The App listening on port 3000!`));
