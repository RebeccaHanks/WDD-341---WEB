// express web server

const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Konnor Kraft')
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Web Server is listening at port ${PORT}`);
});
