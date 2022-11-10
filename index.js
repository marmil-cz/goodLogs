'use strict';

const express = require('express');
const path = require('path');

const containerUtils = require( "./src/controllers/utils" ); 
const docker = require("./src/utils/docker");
const containersRouter = require('./src/routes/container.routes');
const rootRouter = require('./src/routes/root.routes');
const viewController = require( "./src/controllers/view.controller" ); 

// Constants
const PORT = 8089;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/', rootRouter); // to serve log preview
app.use('/container', containersRouter); // to serve container related subtree
app.use(express.static(path.join(__dirname, 'src/public')));

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});