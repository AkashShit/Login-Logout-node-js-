const express=require('express');
const mongoose  = require('mongoose');
const cookieParser=require('cookie-parser');
const session=require('express-session');
const flash=require('connect-flash');
const path=require('path');
const app=express();
require('dotenv').config();
const port=process.env.PORT;
app.set("view engine","ejs");
app.set("views","views");
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({
    extended:true
}));
app.use(session({
    secret:"ak6617",
    saveUninitialized:true,
    resave:true
}));
app.use(flash());
app.use(cookieParser());
const authjwt=require('./middleware/authJwt');
app.use(authjwt.authjwt);
const homeRoute=require('./router/app.router');
// const flash = require('connect-flash/lib/flash');
app.use(homeRoute);
const dbDriver="mongodb+srv://akashshit:akash%406617@cluster0.zqtmcwd.mongodb.net/exam2";
mongoose.connect(dbDriver,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then((res)=>{
    app.listen(port,()=>{
        console.log("DB connect");
        console.log(`server start @ http://localhost:${port}`);
    })
}).catch((err)=>{
    console.log('DB not connect');
    console.log(err);
})