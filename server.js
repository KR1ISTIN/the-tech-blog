const path = require('path');
const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const sequelize = require('./connections/config');
const session = require('express-session');

const hbs = exphbs.create({}); // dont think i need this
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const PORT = process.env.PORT || 3001;

const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 15 * 60 * 1000,
      httpOnly: true, // helps prevent some XSS attacks
      secure: false, // not requiring a https request to send this cookie back and forth for localhost, should be set to true though, maybe change after project is done?
      sameSite: 'strict'
    },
    resave: true,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
  };

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // static folder
app.use(express.static(path.join(__dirname, "public")));
app.engine('handlebars', hbs.engine);
// ({
    // layoutsDir: `${__dirname}/views/layouts`,
    // extname: "hbs",
    // defaultLayout: 'main',
    // partialsDir:`${__dirname}/views/partials` // refers to partial folder
// })); 

app.set('view engine', 'handlebars');


//app.use((require('./controllers/'))); // this shouldn't be necessary based on next line below
app.use(routes);


app.get('/', (req, res) => {
    //res.send(200).json()
    res.render('homescreen', {layout: 'landing'}); // layout is the file oh whichever html file under views you wanna give client
})

/*
app.get('/main', (req, res)=> {
    res.render('homescreen', {layout: 'main'}); // layout is the file oh whichever html file under views you wanna give client
}); // this GET call makes no sense when you think about it.. when you open the page FIRST BEFORE ANYTHING, you want 'main' rendering.. 
    // you don't want to go to website.com/main just to get the thing to load correctly... right?

app.get('/home', (req, res)=> {
    res.render('blogs', {layout: 'access'}); // layout is the file oh whichever html file under views you wanna give client
   
});

app.get('dashboard/:id', (req, res)=> {
    res.render('dashboard', {layout: 'main'}); // layout is the file oh whichever html file under views you wanna give client
   
});

app.get('/home/post/:id', (req, res)=> {
    res.render('homepost', {layout: 'access'}); // layout is the file oh whichever html file under views you wanna give client
    //res.send('index') // name of file to server
});
*/

// sync sequelize models to the database, then turn on the server---
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () =>
      console.log(`App listening at http://localhost:${PORT}`)
    );
  });