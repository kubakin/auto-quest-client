const express = require('express');
const path = require('path');

const PORT = 80;

const app = express();
require('dotenv').config();
console.log(process.env);
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, 'build')));

app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})
app.listen(PORT, ()=> {
    console.log('listen on ' + PORT)
});
