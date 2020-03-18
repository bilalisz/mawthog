const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const pool = mysql.createConnection(

    {
        host     : 'localhost',
        user     : 'root',
        password : '',
        database : 'eyeshop'
      }

);
pool.connect();

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const persons = [
    {
        id:1,
        name:'Bilal'
    },
    {
        id:2,
        name:'Haidar'
    }
]
const home = (req, res)=>{
    pool.query('select * from wp_posts', (error, result, fields)=>{
        console.log(result);
        res.render('index', {data: result});
    })

}

const about = (req, res)=>{
    res.render('about')
}
app.set('view engine', 'ejs');

app.get('/home', home);

app.get('/about', about);


const postAbout = (req, res)=>{
    const message = req.body.message;
    const country = req.body.country;
    const posts = {message:message, country:country};
    pool.query(`insert into cat set ?`, posts, (error,result)=>{
        console.log(error)
     res.send('done' + error);
    });
    
}
app.post('/postdata', postAbout);



const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))