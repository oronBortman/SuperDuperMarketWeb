import {setChargingMoneyButtonEvent} from "./charging-money.js";
import {getAlertsFromServerAndUpdateOwner} from "../show-alerts.js";
import {appendHTMLToElement, emptyElementByID} from "../mainstorescreen/general-functions.js";
import {triggerAjaxChatContent} from "../chatroom/chatroom.js";

var refreshRate = 5000; //milli seconds
var USER_LIST_URL = buildUrlWithContextPath("users-list");
var ZONE_LIST_URL = buildUrlWithContextPath("zones-list");
var ACCOUNT_LIST_URL = buildUrlWithContextPath("accounts-list");
var MOVE_TO_ZONE_URL = buildUrlWithContextPath("move-to-zone");
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var UPLOAD_XML_FILE = buildUrlWithContextPath("load-xml-file");


//users = a list of usernames, essentially an array of javascript strings:
// ["moshe","nachum","nachche"...]
function refreshUsersList(users) {
    //clear all current users
    var tbodySelector = $("#tbody");
    document.getElementById('tbody').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(users || [], function(index, user) {
        var userName = user["userName"];
        var userType = user["userType"];
       // console.log("Adding user #" + index + ": " + userName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr class='withBorder'>" +
            "<th class='withBorder'>" + userName + "</th>" +
            "<th class='withBorder'>" + userType + "</th>" +
            "</tr>").appendTo(tbodySelector);
    });
}

function refreshAccountsList(historyOfAccountsActions) {
    var tbodySelector = $("#tbodyOfManageAccountTable");
    document.getElementById('tbodyOfManageAccountTable').innerHTML = '';
    $.each(historyOfAccountsActions || [], function(index, accountAction) {
        var typeOfActionInAccount = accountAction["typeOfActionInAccount"];
        var date = accountAction["date"];
        var amountOfMoneyInAction = accountAction["amountOfMoneyInAction"];
        var amountOfMoneyBeforeAction = accountAction["amountOfMoneyBeforeAction"];
        var amountOfMoneyAfterAction = accountAction["amountOfMoneyAfterAction"];

        $("<tr class='withBorder'>" +
            "<th class='withBorder'>" + typeOfActionInAccount + "</th>" +
            "<th class='withBorder'>" + date + "</th>" +
            "<th class='withBorder'>" + amountOfMoneyInAction.toFixed(2) + "</th>" +
            "<th class='withBorder'>" + amountOfMoneyBeforeAction.toFixed(2) + "</th>" +
            "<th class='withBorder'>" + amountOfMoneyAfterAction.toFixed(2) + "</th>" +
            "</tr>").appendTo(tbodySelector);
    });
}

function refreshZonesList(zones) {
    var tbodySelector = $("#tbodyOfZonesTable");
    document.getElementById('tbodyOfZonesTable').innerHTML = '';
    $.each(zones || [], function(index, zone) {
        var zoneOwner = zone["zoneOwner"];
        var zoneName = zone["zoneName"];
        var totalItemsTypesInZone = zone["totalItemsTypesInZone"];
        var totalStoresInZone = zone["totalStoresInZone"];
        var totalOrdersInZone = zone["totalOrdersInZone"];
        var avgOfOrdersNotIncludingDeliveries = zone["avgOfOrdersNotIncludingDeliveries"];
        var idOfMoveToZoneForm = "moveToZone" + index;
        $("<tr class='withBorder'><th class='withBorder'>" + zoneOwner + "</th>" +
            "<th class='withBorder'>" + zoneName + "</th>" +
            "<th class='withBorder'>" + totalItemsTypesInZone + "</th>" +
            "<th class='withBorder'>" + totalStoresInZone + "</th>" +
            "<th class='withBorder'>" + totalOrdersInZone + "</th>" +
            "<th class='withBorder'>" + avgOfOrdersNotIncludingDeliveries + "</th>" +
            "<th class='withBorder'>" +
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
    $(idOfMoveToZoneFormWithSharp).click(function() {
        $.ajax({
            method:'GET',
            data: {"zoneName":zoneNameInput},
            url: MOVE_TO_ZONE_URL,
            dataType: "json",
            timeout: 4000,
            error: function(e) {
                console.error(e);
            },
            success: function(r) {
                console.log("Succesfully!!!");
                console.log(r);
                localStorage.setItem('detailsOnZone',JSON.stringify(r));
                window.location.replace("../mainstorescreen/sdm-main-stores-page.html");
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
        $.ajax({
            method:'POST',
            data: formData,
            url: UPLOAD_XML_FILE,
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
        success: function(accounts) {
            refreshAccountsList(accounts);
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

export function getChargingAccount()
{
    return '<p class ="alignToCenter" >Please add amount of money to charge</p>'+
    '<input type="text" id="chargingMoneyTextField" name = "chargingMoneyTextField" class ="alignToCenter" >'+
       ' <p style="color:red;" id="dateError" class ="alignToCenter" ></p>' +
        '<p class ="alignToCenter" >Enter the date</p>' +
        '<input type="date" id="dateOfChargingMoney" name="dateOfChargingMoney" class ="alignToCenter" >' +
            '<p style="color:red;" id="moneyError" class ="alignToCenter" ></p>' +
            '<button name="Charge money" type="button" id="chargingMoneyButton" value="Charge money" class ="alignToCenter" >Charge money</button>' +
            '<p id="resultOfChargingMoney" class ="alignToCenter" ></p>';
}
function addGreetingToUser(user)
{
    var userName = user["userName"];
    var userType = user["userType"];
    $("#greeting").text("Welcome, " + userType + " " + userName);

}
function setActionBasedOnRole(user)
{
    var userType = user["userType"];
    if(userType === "seller")
    {
        setUploadFileElement();
        setInterval(getAlertsFromServerAndUpdateOwner, refreshRate);
    }
    else if(userType === "customer")
    {
        emptyElementByID("chargingMoneyPre");
        appendHTMLToElement(getChargingAccount(),"chargingMoneyPre");
        setChargingMoneyButtonEvent();
    }
}

function hideHTMLElementsByRole(user){
    var userType = user["userType"];
    if(userType === "seller")
    {
        $("#chargingMoneyContainer").hide();
    }
    else if(userType === "customer")
    {
        $("#loadFromXml").hide();
        $("#alerts").hide();
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
    triggerAjaxChatContent();
});

