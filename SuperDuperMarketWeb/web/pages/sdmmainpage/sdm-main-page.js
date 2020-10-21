var chatVersion = 0;
var refreshRate = 5000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("users-list");
var ZONE_LIST_URL = buildUrlWithContextPath("zones-list");
var ACCOUNT_LIST_URL = buildUrlWithContextPath("accounts-list");
var CHARGING_MONEY_URL = buildUrlWithContextPath("charging-money");
var MOVE_TO_ZONE_URL = buildUrlWithContextPath("move-to-zone");
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
       // console.log("Adding user #" + index + ": " + userName);
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

       // console.log("Adding action #" + index);
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
   // var showAllItemsInZone = $("#showAllItemsInZone")
    document.getElementById('tbodyOfZonesTable').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(zones || [], function(index, zone) {
        var zoneOwner = zone["zoneOwner"];
        var zoneName = zone["zoneName"];
        var totalItemsTypesInZone = zone["totalItemsTypesInZone"];
        var totalStoresInZone = zone["totalStoresInZone"];
        var totalOrdersInZone = zone["totalOrdersInZone"];
        var avgOfOrdersNotIncludingDeliveries = zone["avgOfOrdersNotIncludingDeliveries"];
      //  console.log("Adding zone #" + index + ": " + zoneName);
        var idOfMoveToZoneForm = "moveToZone" + index;
     //   console.log("idOfMoveToZoneForm " + idOfMoveToZoneForm);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + zoneOwner + "</th>" +
            "<th>" + zoneName + "</th>" +
            "<th>" + totalItemsTypesInZone + "</th>" +
            "<th>" + totalStoresInZone + "</th>" +
            "<th>" + totalOrdersInZone + "</th>" +
            "<th>" + avgOfOrdersNotIncludingDeliveries + "</th>" +
            "<th>" +
                "<form id = \"moveToZone" + index + "\"" +
                        "name  = \"moveToZone" + index + "\"" +
                        "action = \"/SuperDuperMarketWeb_Web_exploded/move-to-zone\" method = \"GET\" class = \"move-to-zone\">" +
                        "<button name=\"Move to zone\" type=\"submit\" id=\"moveToZoneButton" + index + "\"" + "value=\"Move to zone\">Move to zone</button>" +
                         "<br>" +
                "</form>" +
            "</th></tr>").appendTo(tbodySelector);
        setMoveToZoneButton(zoneName, idOfMoveToZoneForm);
    });
}

function setMoveToZoneButton(zoneNameInput, idOfMoveToZoneForm) { // onload...do
    var idOfMoveToZoneFormWithSharp = "#" + idOfMoveToZoneForm
    console.log(zoneNameInput + " in setMoveToZoneButton");
    //var dataString = "zoneName="+zoneNameInput;
    // console.log(idOfMoveToZoneFormWithSharp)
    $(idOfMoveToZoneFormWithSharp).click(function() {
        $.ajax({
            method:'GET',
            data: {"zoneName":zoneNameInput},
            url: MOVE_TO_ZONE_URL,
            dataType: "json",
            timeout: 4000,
            error: function(e) {
                console.error(e);
                //$("#result").text("Failed to get result from server " + e);
            },
            success: function(r) {
                console.log("Succesfully!!!");
                console.log(r);
                localStorage.setItem('detailsOnZone',JSON.stringify(r));
                window.location.replace("../mainstorescreen/sdm-main-stores-page.html");
                // $("#result").text(r);
            }
        });
        // return value of the submit operation
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    })
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
            url: UPLOAD_XML_FILE,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            timeout: 4000,
            error: function(e) {
                console.error("Failed to submit");
               // alert('failedToSumbit');
                $("#result").text("Failed to get result from server " + e);
            },
            success: function(r) {
                //alert('succeedToSumbit');
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
            console.log("Succeed to read users list");
            console.log(users);
        },
        error:function(e)
        {
            console.error(e);
            console.log("There was error while trying to read users")
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
        },
        error:function(e)
        {
            console.log(e);
        }
    });
    //The users list is refreshed automatically every second
    setInterval(ajaxUsersList, refreshRate);
    setInterval(ajaxZonesList, refreshRate);
    setInterval(ajaxAccountsList, refreshRate);
});

