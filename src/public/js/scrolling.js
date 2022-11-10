

const AUTO_SCROLLING_INTERVAL = 1000;
let userMove = false;

/**
 * initialize autoscrolling once page is loaded
 */
window.addEventListener("load", function(e) {
    setInterval(function() { 
        if (!userMove) {
            scrollDown();
        }
    }, AUTO_SCROLLING_INTERVAL);

    window.addEventListener("mousewheel", function(e) {
        setAutoScrolling(false);
    }, false);

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