'use strict';

const express = require('express');
const path = require('path');

const containerUtils = require( "./src/controllers/utils.js" ); 
const docker = require("./src/utils/docker.js");
const containersRouter = require('./src/routes/container.routes.js');

// Constants
const PORT = 8089;
const HOST = '0.0.0.0';

// App
const app = express();
app.use('/container', containersRouter); // to serve container related subtree
app.use(express.static(path.join(__dirname, 'src/public')));

/**
 * servers list of available containers
 */
app.get('/', async (req, res) => {
  
    let containerList = "";
    const containers = await docker.listContainers();
    containers.forEach(function (containerInfo) {
        const containerName = containerInfo.Names[0].replace(" ","").replace("/","");
        containerList += `<h3>${containerName}</h3>${containerUtils.createContainerLink(containerName)}`;
    });

    const output = "<h1>Active containers</h1>" + containerList;
    
    res.status(200).send(output);
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
});