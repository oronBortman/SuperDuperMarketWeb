var chatVersion = 0;
var refreshRate = 5000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("users-list");
var ZONE_LIST_URL = buildUrlWithContextPath("zones-list");
var ACCOUNT_LIST_URL = buildUrlWithContextPath("accounts-list");
var CHARGING_MONEY_URL = buildUrlWithContextPath("charging-money");

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

function refreshAccountsList(historyOfAccountsActions) {
    var tbodySelector = $("#tbodyOfManageAccountTable");
    document.getElementById('tbodyOfManageAccountTable').innerHTML = '';
    $.each(historyOfAccountsActions || [], function(index, acountAction) {
        var typeOfActionInAccount = acountAction["typeOfActionInAccount"];
        var date = acountAction["date"];
        var amountOfMoneyInAction = acountAction["amountOfMoneyInAction"];
        var amountOfMoneyBeforeAction = acountAction["amountOfMoneyBeforeAction"];
        var amountOfMoneyAfterAction = acountAction["amountOfMoneyAfterAction"];

        console.log("Adding action #" + index);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + typeOfActionInAccount + "</th>" +
            "<th>" + date + "</th>" +
            "<th>" + amountOfMoneyInAction + "</th>" +
            "<th>" + amountOfMoneyBeforeAction + "</th>" +
            "<th>" + amountOfMoneyAfterAction + "</th>" +
            "</tr>").appendTo(tbodySelector);    });
}

//TODO
function refreshZonesList(zones) {
    var tbodySelector = $("#tbodyOfZonesTable");
    document.getElementById('tbodyOfZonesTable').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(zones || [], function(index, zone) {
        var zoneOwner = zone["zoneOwner"];
        var zoneName = zone["zoneName"];
        var totalItemsTypesInZone = zone["totalItemsTypesInZone"];
        var totalStoresInZone = zone["totalStoresInZone"];
        var totalOrdersInZone = zone["totalOrdersInZone"];
        var avgOfOrdersNotIncludingDeliveries = zone["avgOfOrdersNotIncludingDeliveries"];
        console.log("Adding zone #" + index + ": " + zoneName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + zoneOwner + "</th>" +
            "<th>" + zoneName + "</th>" +
            "<th>" + totalItemsTypesInZone + "</th>" +
            "<th>" + totalStoresInZone + "</th>" +
            "<th>" + totalOrdersInZone + "</th>" +
            "<th>" + avgOfOrdersNotIncludingDeliveries + "</th>" +
            "</tr>").appendTo(tbodySelector);
    });
}


function setUploadFileElement() { // onload...do
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

/*function setChargingMoneyElement() { // onload...do
    $("#uploadXmlFile").submit(function() {

        formData.append("file", file1);
        //formData.append("mapName", this[1].value);
        $.ajax({
            method:'POST',
            data: formData,
            url: CHARGING_MONEY_URL,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            timeout: 4000,
            error: function(e) {
                console.error("Failed to submit");
                $("#resultOfChargingMoney").text("Failed to get result from server " + e);
            },
            success: function(r) {
                $("#resultOfChargingMoney").text(r);
            }
        });
        // return value of the submit operation
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    })
}*/

function ajaxUsersList() {
    $.ajax({
        url: USER_LIST_URL,
        success: function(users) {
            refreshUsersList(users);
        }
    });
}

function ajaxAccountsList() {
    $.ajax({
        url: ACCOUNT_LIST_URL,
        success: function(acounts) {
            refreshAccountsList(acounts);
        }
    });
}

function ajaxZonesList() {
    $.ajax({
        url: ZONE_LIST_URL,
        success: function(zones) {
            refreshZonesList(zones);
        }
    });
}

function addGreetingToUser(user)
{
    var userName = user["userName"];
    var userType = user["userType"];
    $("<h3>Welcome, " + userType + " " + userName + "</h3>").appendTo($("#greeting"));

}
function setActionBasedOnRole(user)
{
    var userType = user["userType"];
    if(userType === "seller")
    {
        setUploadFileElement();

    }
    else if(userType === "customer")
    {
        //setChargingMoneyElement();
    }
}

function hideHTMLElementsByRole(user){
    var userType = user["userType"];
    if(userType === "seller")
    {
        $("#manageAccount").hide();
    }
    else if(userType === "customer")
    {
        $("#loadFromXml").hide();
    }
}

$(function() {
    $.ajax({
        url:  USERS_TYPE_AND_NAME_URL ,
        success: function (user) {
             hideHTMLElementsByRole(user);
            setActionBasedOnRole(user);
             addGreetingToUser(user);
        }
    });
    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxZonesList, refreshRate);
    setInterval(ajaxAccountsList, refreshRate);
});

