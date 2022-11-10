

const getContainerLogPreview = (containerName, url) => {
    return `
    <div class="logDetail">
        <h4><a href="${url}">${containerName}</a></h4>
        <iframe src="${url}"></iframe>
    </div>`;
}

const appendPreviewLog = (event, containerName, url) => {
    event.preventDefault();

    const iframe = getContainerLogPreview(containerName, url);
    const previewList = document.getElementById("previewList");
    
    const newElement = document.createElement("div");
    newElement.setAttribute('class', "preview");
    newElement.innerHTML = iframe;

    previewList.appendChild(newElement);
}