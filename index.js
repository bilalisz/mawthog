const express = require('express');
const app = express();

const request = (req, res)=>{
    res.send('This is my first api');
}


app.use('/', request);


const port = 5000;

app.listen(port, () => console.log(`Example app listening on port ${port}!`))