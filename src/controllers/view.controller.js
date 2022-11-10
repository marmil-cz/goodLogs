
const logPage = (url) => {
    return `
<!DOCTYPE HTML>
<html> 
  <head>
    <title>Container Log</title>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
    <script src="/js/eventStream.js"></script>
    <script src="/js/scrolling.js"></script>
  </head>
  <body>
    <a id="keepScrolling" href="#" onClick="keepScrolling(event)">Keep auto-scrolling</a>
    <ul class="eventStream" id="eventList"> </ul>
    <script>
      const eventSourceUrl = "${url}";
    </script>
  </body>
</html>`;
};

module.exports = { logPage };