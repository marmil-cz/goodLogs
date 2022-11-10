'use strict';

const containerUtils = require( "./utils" ); 
const docker = require("../utils/docker");
const viewController = require( "./view.controller" ); 

/**
 * 
 * @param {http request} req 
 * @param {http response} res 
 * @param {*} next 
 */
async function getContainerListPage(req, res, next) {
    let containerList = "";
    const containers = await docker.listContainers();
    containers.forEach(function (containerInfo) {
        const containerName = containerInfo.Names[0].replace(" ","").replace("/","");
        const containerUrl = containerUtils.getContainerUrl(containerName);
        containerList += `<li><a href="#" onclick="appendPreviewLog(event,'${containerName}', '${containerUrl}')">${containerName}</a></li>`;
    });

    const output = viewController.containerListPage(containerList);
    res.status(200).send(output);
};

module.exports = {
    getContainerListPage,
};