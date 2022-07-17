const fs = require('fs');
const express = require('express');
const path = require('path');
const { application } = require('express');
const app = express();
const port = process.env.PORT || 3001;

app.use(express.static('./public'));

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});