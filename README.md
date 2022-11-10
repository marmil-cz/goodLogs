# GoodLogs

GoodLogs provides ability to get the user friendly access to all the running docker container logs within local environment.

## There are two options how the application can be launched

### 1) NodeJs application  
Installation of dependencies:  
``npm install``  
Launch the application:  
``npm start``  
Open application in web browser:  
``http://localhost:8089/``  


### 2) Docker Container  
  
Build docker image:  
``docker build -t goodlogs/goodlogs .``  
Launch docker container from prepared image:  
``docker run -it --rm  -p 8089:8089 -v /var/run/docker.sock:/var/run/docker.sock goodlogs/goodlogs``  
Open application in web browser:  
``http://localhost:8089/``  
