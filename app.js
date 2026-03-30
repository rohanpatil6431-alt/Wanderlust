if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}
const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose');
const localUrl = 'mongodb://localhost:27017/airbnb-clone';
// const dburl = process.env.ATLASDB_URL;
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
app.engine('ejs', ejsMate);
const wrapAsync = require('./utils/wrapAsync.js');
const listingRouter = require('./routes/listing.js');
const reviewRouter = require('./routes/review.js');
const userRouter = require('./routes/user.js');
const DEFAULT_IMAGE_URL = "https://images.unsplash.com/photo-1501785888041-af3ef285b470";
const session = require('express-session');

const ExpressError = require('./utils/ExpressError.js');
const flash = require('connect-flash');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user.js');
process.noDeprecation = true; // suppresses all deprecation warnings
main()
    .then(() => {
        console.log('Connected to MongoDB')
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err)
    });

async function main() {
    await mongoose.connect(localUrl);
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));


const sessionOptions = {
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, // 1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


// app.get('/', wrapAsync((req, res) => {
//     res.send('Hello World!')
// }))



app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.currentUser = req.user;
    next();
});

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/users", userRouter);


app.use((err, req, res, next) => {
    let { statusCode = 500, message = 'Something went wrong' } = err;
    res.status(statusCode).render('error.ejs', { err });
    
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
