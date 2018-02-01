const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
var flash        = require('req-flash');


const index = require('./routers/index');
const genreRouter = require('./routers/genreRouter');
const eventRouter = require('./routers/eventRouter');
const djRouter = require('./routers/dj');
const bookRouter = require('./routers/bookRouter');
const authRouter = require('./routers/authRouter');
const searchRouter = require('./routers/searchRouter');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());
app.use(session({
  secret: 'hackTiv8IsTheBestIloVeIt',
  cookie: {
    maxAge: 60000
  }
}));

app.use(cookieParser());
app.use(flash());

app.use(express.static('public'));

app.use('/search', searchRouter);
app.use('/books', bookRouter);
app.use('/genres', genreRouter);
app.use('/events', eventRouter);
app.use('/auth', authRouter);
app.use('/djs', djRouter);
app.use('/', index);

app.listen(3000, () => console.log(`The App listening on port 3000!`));
