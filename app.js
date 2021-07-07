const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser')
require('dotenv').config();
require('./auth');
const cors = require('cors')

const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use(passport.initialize())

app.get('/',(req,res) => {
    res.sendFile('index.html', {root: __dirname })
})

app.get('/get/:login',(req,res,next) => {
        const token = req.params.login
        console.log(token)
       
        if(token) {
            jwt.verify(token,process.env.ACCESS_TOKEN_SECRET, function(err,decoded) {
             if(err) { return res.send('<a href="http://localhost:3000/login"> LOGIN </a>')}
             console.log(decoded)
              res.send(`<a href="https://mayank161.github.io/covid-main/"> CLICK HERE TO GET THE COVID UPDATE </a>`)
            })
        }
    })

app.get('/login',
passport.authenticate('google',{scope: ['email','profile']}))

app.get('/auth/google/callback', 
  passport.authenticate('google',{
      successRedirect: '/pass', 
      failureRedirect: '/fail' })
  );
 
  app.get('/fail',(req,res) => { res.send('fali')});

  app.get('/pass', async(req,res) => { 
      console.log('hii')
    const token = await jwt.sign({id: 1},process.env.ACCESS_TOKEN_SECRET);
    res.send(`<a href="https://mayank161.github.io/covid-main/"> CLICK HERE TO GET THE COVID UPDATE</a>
    <script>localStorage.setItem('token','${token}') </script>`)})

app.listen(3000,'0.0.0.0',() => console.log('working'))