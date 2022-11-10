
const logPage = (url) => {
    return `
  <!DOCTYPE Html>
  <html> 
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
    <script rel="stylesheet" type="text/Javascript" src="/js/eventStreamProcessing.js"></script>
  </head>
  <body>
     <a id="keepScrolling" href="#" onClick="keepScrolling(event)">Keep auto-scrolling</a>
     <ul class="eventStream" id="eventList"> </ul>
  
     <script>
      const AUTO_SCROLLING_INTERVAL = 1000;
      let userMove = false;

      window.addEventListener("mousewheel", function(e) {
        setAutoScrolling(false);
      }, false);
  
      const setAutoScrolling = (value) => {
        const button = document.getElementById("keepScrolling");        
        if (value) {
          userMove = false;
          button.setAttribute("style", "display: none" );
        }
        else {
          userMove = true;
          button.setAttribute("style", "display: block" )
        }
      }

      const keepScrolling = (event) => {
        event.preventDefault();
        setAutoScrolling(true);  
        scrollDown();      
      }

      const scrollDown = () => {
        document.documentElement.scrollTop = document.documentElement.scrollHeight;
      }

      var scrollInterval = setInterval(function() { 
        if(!userMove) {
          scrollDown();
        }
      }, AUTO_SCROLLING_INTERVAL);
   
      var eventList = document.getElementById("eventList");
      var evtSource = new EventSource("${url}");
    
      evtSource.onmessage = function(e) {
        const message = JSON.parse(e.data);
        const { data, time, type } = message;
        const localTime = getLocalTime(new Date(time));
    
        printMessage("<i>" + localTime + "</i>: " + data, type);
      };      
    
      evtSource.onerror = function(e) {
        console.log("EventSource has been closed.");
      };
    </script>
  </body>
  </html>`;
};

module.exports = { logPage };