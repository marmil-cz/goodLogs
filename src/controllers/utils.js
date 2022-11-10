/**
 * Container Url provider
 * @param {human readable container name} containerName 
 * @returns url to container page
 */
const getContainerUrl = (containerName) => {
    return `/container/${containerName}/`;
}

/**
 * Container event stream url
 * @param {human readable container name} containerName 
 * @returns access to event stream
 */
const getContainerLogUrl = (containerName) => {
    return `/container/${containerName}/stream`;
}

/**
 * HTML A tag with container url
 * @param {human readable container name} containerName 
 * @returns html A tag with access to container page
 */
const createContainerLink = (containerName) => {
    return `<a href='${getContainerUrl(containerName)}'>${containerName}</a>`;
}

/**
 * Container Id by its name
 * @param {docker object} docker 
 * @param {human readable container name} searchedName 
 * @returns unique identifier of container
 */
const getContainerIdByName = async (docker, searchedName) => {
    const containers = await docker.listContainers();
    return containers.find((containerInfo) => {
        const containerName = containerInfo.Names[0].replace(" ","").replace("/","");
        if (containerName === searchedName)
            return containerInfo.Id;
    });
}

/**
 * create message payload
 * @param {message to be distributed via sse} chunk 
 * @param {type of message} type 
 * @returns payload for sse stream
 */
const getMessagePayload = (chunk, type) => {
    const isoDate = new Date().toISOString();
    const str = chunk.toString('utf8');

    const output = {
      "data": str,
      "time": isoDate,
      type
    };

    return `data: ${JSON.stringify(output)} \n\n`;
};
  

module.exports = { 
    getContainerUrl, 
    getContainerLogUrl, 
    createContainerLink, 
    getContainerIdByName,
    getMessagePayload
};