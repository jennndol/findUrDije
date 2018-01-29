const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const genreRouter = require('./routers/genreRouter');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());


app.use('/genres', genreRouter);

const dj = require('./routers/dj');

app.use('/dj', dj);

app.listen(3000, () => console.log(`The App listening on port 3000!`));
