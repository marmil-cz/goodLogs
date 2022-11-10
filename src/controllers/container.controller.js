'use strict';
const viewController = require( "./view.controller" ); 
const utils = require( "./utils" ); 
const docker = require("../utils/docker");
const stream = require('stream');


/**
 * 
 * @param {http request} req 
 * @param {http response} res 
 * @param {*} next 
 */
async function getLogPage(req, res, next) {
  const url = `event-stream`;
  res
    .status(200)
    .send( viewController.containerLogPage(url) );
};

/**
 * 
 * @param {http request} req 
 * @param {http response} res 
 * @param {*} next 
 */
async function getStream(req, res, next) {
  
  const publishMessage = (msg, type) => {
      res.write( utils.getMessagePayload(msg, type));
  }

  let containerName = req.params.containerName;
  res.writeHead(200, { "Content-Type": "text/event-stream",  "Cache-control": "no-cache" });

  const id = await utils.getContainerIdByName(docker, containerName);
  if (!id) {
      publishMessage("No such container is running", "system");
      res.end();
      return;
  }

  var inStream;
  const stdoutLog = new stream.PassThrough();
  const stderrLog = new stream.PassThrough();

  stdoutLog.on('data', (chunk) => {
      publishMessage(chunk, "stdout");
  });
  stdoutLog.on('close', () => {
      console.log("closed stream ", (new Date()).toUTCString());
      res.end();
  });

  stderrLog.on('data', (chunk) => {
      publishMessage(chunk, "stderr");
  });
  stderrLog.on('close', () => {
      console.log("closed stream ", (new Date()).toUTCString());
      res.end();
  });

  const container = docker.getContainer(id.Id);
  container.logs({stdout: true, stderr: true, follow: true, tail: 100 })
  .then(logs => {
      inStream = logs;
      
      inStream.on('resume', () => {
          publishMessage("Connection has been resumed", "system");
      });
      
      inStream.on('end', () => {
          console.log(`closed cont ${containerName} ${(new Date()).toUTCString()}`);
          res.end();
      });
      return container.modem.demuxStream(logs, stdoutLog, stderrLog);
  })
  .catch( err => {
      console.log(`err ${containerName}`);
      res.end();
  });
};

module.exports = {
  getLogPage,
  getStream
};