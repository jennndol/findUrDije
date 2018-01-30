const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');

const genreRouter = require('./routers/genreRouter');
const eventRouter = require('./routers/eventRouter');
const authRouter = require('./routers/authRouter');
const djRouter = require('./routers/dj');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use(session({
  secret: 'ilovescotchscotchyscotchscotch',
  cookie: {
    maxAge: 60000
  }
}));
app.use(cookieParser());

app.use('/genres', genreRouter);
app.use('/events', eventRouter);
app.use('/auth', authRouter);
app.use('/dj', djRouter);

app.listen(3000, () => console.log(`The App listening on port 3000!`));
