var chatVersion = 0;
var refreshRate = 5000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("users-list");
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var UPLOAD_XML_FILE = buildUrlWithContextPath("load-xml-file");

var CHAT_LIST_URL = buildUrlWithContextPath("chat");


//users = a list of usernames, essentially an array of javascript strings:
// ["moshe","nachum","nachche"...]
function refreshUsersList(users) {
    //clear all current users
    //$("#userstable").empty();
    var tbodySelector = $("#tbody");
    document.getElementById('tbody').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function(index, user) {
        var userName = user["userName"];
        var userType = user["userType"];
        console.log("Adding user #" + index + ": " + userName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + userName + "</th>" + "<th>" + userType + "</th>" + "</tr>").appendTo(tbodySelector);
    });
}

//TODO
function refreshZonesList(zones) {
    //clear all current users
    //$("#userstable").empty();
    var tbodySelector = $("#tbody");
    document.getElementById('tbody').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function(index, user) {
        var userName = user["userName"];
        var userType = user["userType"];
        console.log("Adding user #" + index + ": " + userName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + userName + "</th>" + "<th>" + userType + "</th>" + "</tr>").appendTo(tbodySelector);
    });
}


function uploadFile() { // onload...do
    $("#uploadXmlFile").submit(function() {
        var file1 = this[0].files[0];
        var formData = new FormData();

        formData.append("file", file1);
        //formData.append("mapName", this[1].value);
        $.ajax({
            method:'POST',
            data: formData,
            url: Upload_XML_FILE_UTL,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            timeout: 4000,
            error: function(e) {
                console.error("Failed to submit");
                $("#result").text("Failed to get result from server " + e);
            },
            success: function(r) {
                $("#result").text(r);
            }
        });
        // return value of the submit operation
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    })
}

//entries = the added chat strings represented as a single string
/*function appendToChatArea(entries) {
//    $("#chatarea").children(".success").removeClass("success");

    // add the relevant entries
    $.each(entries || [], appendChatEntry);

    // handle the scroller to auto scroll to the end of the chat area
    var scroller = $("#chatarea");
    var height = scroller[0].scrollHeight - $(scroller).height();
    $(scroller).stop().animate({ scrollTop: height }, "slow");
}
*/
/*function appendChatEntry(index, entry){
    var entryElement = createChatEntry(entry);
    $("#chatarea").append(entryElement).append("<br>");
}

function createChatEntry (entry){
    entry.chatString = entry.chatString.replace (":)", "<img class='smiley-image' src='../../common/images/smiley.png'/>");
    return $("<span class=\"success\">").append(entry.username + "> " + entry.chatString);
}
*/
function ajaxUsersList() {
    $.ajax({
        url: USER_LIST_URL,
        success: function(users) {
            refreshUsersList(users);
        }
    });
}

//call the server and get the chat version
//we also send it the current chat version so in case there was a change
//in the chat content, we will get the new string as well
/*function ajaxChatContent() {
    $.ajax({
        url: CHAT_LIST_URL,
        data: "chatversion=" + chatVersion,
        dataType: 'json',
        success: function(data) {
            /*
             data will arrive in the next form:
             {
                "entries": [
                    {
                        "chatString":"Hi",
                        "username":"bbb",
                        "time":1485548397514
                    },
                    {
                        "chatString":"Hello",
                        "username":"bbb",
                        "time":1485548397514
                    }
                ],
                "version":1
             }
             */
          /*  console.log("Server chat version: " + data.version + ", Current chat version: " + chatVersion);
            if (data.version !== chatVersion) {
                chatVersion = data.version;
                appendToChatArea(data.entries);
            }
            triggerAjaxChatContent();
        },
        error: function(error) {
            triggerAjaxChatContent();
        }
    });
}*/

//add a method to the button in order to make that form use AJAX
//and not actually submit the form
/*$(function() { // onload...do
    //add a function to the submit event
    $("#chatform").submit(function() {
        $.ajax({
            data: $(this).serialize(),
            url: this.action,
            timeout: 2000,
            error: function() {
                console.error("Failed to submit");
            },
            success: function(r) {
                //do not add the user string to the chat area
                //since it's going to be retrieved from the server
                //$("#result h1").text(r);
            }
        });

        $("#userstring").val("");
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    });
});

function triggerAjaxChatContent() {
    setTimeout(ajaxChatContent, refreshRate);
}*/

/*function createLoadFromXmlElements()
{
    $("<h4>Load xml file</h4>").appendTo($("#loadFromXml"));
}*/

//activate the timer calls after the page is loaded
function addGreetingToUser(user)
{
    var userName = user["userName"];
    var userType = user["userType"];
    $("<h3>Welcome, " + userType + " " + userName + "</h3>").appendTo($("#greeting"));

}

function hideHTMLElementsByRole(user){
    var userType = user["userType"];
    if(userType === "seller")
    {
        uploadFile();
    }
    else if(userType = "customer")
    {
        $("#loadFromXml").hide();
    }
}

$(function() {
    $.ajax({
        url:  USERS_TYPE_AND_NAME_URL ,
        success: function (user) {
             hideHTMLElementsByRole(user);
             addGreetingToUser(user);
        }
    });
    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
});

