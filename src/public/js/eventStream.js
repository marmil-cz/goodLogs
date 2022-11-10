
/**
 * initialize eventstream processing once page is loaded
 */
 window.addEventListener("load", function(e) {
    const eventList = document.getElementById("eventList");
    const evtSource = new EventSource(eventSourceUrl);

    evtSource.onmessage = function(e) {
        const message = JSON.parse(e.data);
        const { data, time, type } = message;
        const localTime = getLocalTime(new Date(time));
    
        printMessage("<i>" + localTime + "</i>: " + data, type);
    };      
    
    evtSource.onerror = function(e) {
        console.log("EventSource has been closed.");
    };
}, false);


const getLocalTime = (utc) => {
    const date = new Date(utc);
    return date.toLocaleString('en-GB', 
      { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
}

const printMessage = (payload, type = "") => {
    const newElement = document.createElement("li");
    newElement.setAttribute('class', type);
    newElement.innerHTML = payload;
    
    const latestId = eventList.children.length - 1;
    const latestElement = eventList.children[latestId];
    try {
        const newElementMsg = newElement.innerText.split(":")[3].trim();
        const latestElementMsg = latestElement.innerText.split(":")[3].trim();
        if (newElementMsg == latestElementMsg &&
            newElement.className == latestElement.className &&
            newElement.className == "system")
        {
            eventList.removeChild(latestElement);   
        }
    }
    catch (e) {
        // console.log(e);
    }
    eventList.appendChild(newElement);
}
