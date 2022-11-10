const getContainerUrl = (containerName) => {
    return `/container/${containerName}/`;
}

const getContainerLogUrl = (containerName) => {
    return `/container/${containerName}/stream`;
}

const createContainerLink = (containerName) => {
    return `<a href='${getContainerUrl(containerName)}'>${containerName}</a>`;
}

const getContainerIdByName = async (docker, searchedName) => {
    const containers = await docker.listContainers();
    return containers.find((containerInfo) => {
        const containerName = containerInfo.Names[0].replace(" ","").replace("/","");
        if (containerName === searchedName)
            return containerInfo.Id;
    });
}

/**
 * 
 * @param {message to be distributed vias sse} chunk 
 * @param {type of message} type 
 * @returns 
 */
const getMessagePayload = (chunk, type) => {
    var isoDate = new Date().toISOString();
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