#!/bin/bash

# script helps to rebuild the image and run it as new container

docker build -t goodlogs/goodlogs .

docker run -it --rm  -p 8009:8089 -v /var/run/docker.sock:/var/run/docker.sock goodlogs/goodlogs 
