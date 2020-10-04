
$(function() {
    //The users list is refreshed automatically every second
    // setInterval(ajaxUsersList, refreshRate);
    //  console.log(request.getSession().getAttribute("username"));
    //console.log(pageContext.getSession(true).getAttribute().getValue());
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const errorMessage = urlParams.get('errorMessage')
    console.log(errorMessage + "asdfasdfsa")
    console.log("asdfasdfsa")
    $("<p>" + errorMessage + "</p>").appendTo($("#errorMessage"));
    //The chat content is refreshed only once (using a timeout) but
    //on each call it triggers another execution of itself later (1 second later)
    // triggerAjaxChatContent();
    //The chat content is refreshed only once (using a timeout) but
});