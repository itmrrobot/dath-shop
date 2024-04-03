const express = require("express");
const bodyParser = require('body-parser')
const path = require("path");
require("dotenv").config();
const connection = require("./common/connection");
const cors = require("cors");
const paymentRouter = require("./router/payment");
const productsRouter = require("./router/products");
const categoryRouter = require("./router/category");
const orderRouter = require("./router/order");
const customerRouter = require("./router/customer");
const authRouter = require("./router/users");
const cartRouter = require("./router/cart");
const wishlistRouter = require("./router/wishlist");
const paypalRouter = require("./router/paypalPayment");
const inventoryRouter = require("./router/invertory");
const chatbotRouter = require("./router/chatbot");
const passport = require('passport');
const OAuth2Strategy = require("passport-google-oauth2").Strategy;
const session = require('express-session');
const {User} = require('./models/index');
const jwt = require('jsonwebtoken');


const app = express();
const port = process.env.PORT || 8888;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

const corsOptions ={
    origin:'*', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

// setup session
app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:true
}))

// setuppassport
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new OAuth2Strategy({
        clientID:process.env.GOOGLE_CLIENT_ID,
        clientSecret:process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:"/auth/google/callback",
        scope:["profile","email"]
    },
    async(accessToken,refreshToken,profile,done)=>{
        try {
            let user = await User.findOne({id:profile.id});
            console.log(profile.id);
            if(!user){
                user = await User.create({
                    id:profile.id,
                    name:profile.displayName,
                    email:profile.emails[0].value,
                    avatar:profile.photos[0].value
                });
            }

            return done(null,user)
        } catch (error) {
            return done(error,null)
        }
    }
    )
)

passport.serializeUser((user,done)=>{
    done(null,user);
})

passport.deserializeUser((user,done)=>{
    done(null,user);
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static('img'));
app.use(paymentRouter);
app.use(productsRouter);
app.use(categoryRouter);
app.use(orderRouter);
app.use(customerRouter);
app.use(authRouter);
app.use(cartRouter);
app.use(wishlistRouter);
app.use(paypalRouter);
app.use(inventoryRouter);
app.use(chatbotRouter);
app.use(cors());
connection();
app.listen(port,() => {
    console.log(`Server start on port ${port}`);
});