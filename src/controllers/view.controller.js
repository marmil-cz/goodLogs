
const containerLogPage = (url) => {
  const head = `
    <title>Container Log</title>
    <script src="/js/eventStream.js"></script>
    <script src="/js/scrolling.js"></script>
  `;

  const body = `
    <a id="keepScrolling" href="#" onClick="keepScrolling(event)">Keep auto-scrolling</a>
    <ul class="eventStream" id="eventList"> </ul>
    <script>
      const eventSourceUrl = "${url}";
    </script>
    `;

  return defaultTemplate(head, body);
};

const containerListPage = (containerList) => {
  const head = `<script src="/js/previewLog.js"></script>`;
  const body = `
    <h1>Active containers</h1>
    <div class="containersToChoose">Choose containers for log previews:  
      <ul>
      ${containerList}
      </ul>
    </div>
    <div id="previewList"></div>`;

  return defaultTemplate(head, body);
}

const defaultTemplate = (head, body) => {
  return `
<!DOCTYPE HTML>
<html> 
  <head>
    <link rel="stylesheet" type="text/css" href="/css/styles.css">
    ${head}
  </head>
  <body>
    ${body}
  </body>
</html>`;
}

module.exports = { 
  containerLogPage, 
  containerListPage 
};