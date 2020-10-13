import { initiateTheChoosingItemDropDownInDynamicOrder } from 'choosing-item-drop-down-in-dynamicOrder';
import { initiateTheChoosingItemDropDownInStaticOrder } from 'choosing-item-drop-down-in-staticOrder';
import {emptyMakeOrderBody} from "./general-make-an-order-functions";

var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");
var ITEMS_LIST_URL = buildUrlWithContextPath("items-in-zone-list");
var CHOOSE_ITEMS_IN_ORDER_UTL = buildUrlWithContextPath("choose-item-in-order");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_STATIC_RADIO_BUTTON = "staticRadioButton";
var ID_OF_DYNAMIC_RADIO_BUTTON = "staticRadioButton";
var ID_OF_DATE_OF_ORDER = 'dateOfOrder';
var ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT = 'chooseStoresDropDownListElement';
var ID_OF_CHOOSE_STORES_DROP_DOWN_LIST = 'chooseStoresDropDownList'

function emptyChooseStoresDropDownListElement()
{
    document.getElementById(ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT).innerHTML = '';
}

export function setMakeANewOrderButton() { // onload...do
    console.log("In setMakeANewOrderButtonInJS");
    $("#makeANewOrder").submit(function() {
        emptyMakeOrderBody();
        var makeOrderBody = $("#makeOrderBody");
        var selectOrderTypeHTML = getSelectOrderTypeHTML();
        var selectDateHTML = getSelectDateHTML();
        var nextButtonHTML = getNextButtonHTML();
        var chooseStoresDropDownList = '<div id=' + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT + '></div>';
        $(selectOrderTypeHTML + selectDateHTML + chooseStoresDropDownList + nextButtonHTML).appendTo(makeOrderBody);
        setTypeOfOrderRadioButtonEvent();
        setNextButtonInMakeAnOrderElement();
        return false;
    })
}

function setTypeOfOrderRadioButtonEvent()
{
    $("#staticRadioButton").click(function() {
        emptyChooseStoresDropDownListElement();
        initiateChooseStoresDropDownListElement();
    });
    $("#dynamicRadioButton").click(function() {
        emptyChooseStoresDropDownListElement();
    });
}


function initiateChooseStoresDropDownListElement()
{
    $(getChooseStoresDropDownListHTML()).appendTo($("#" + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT));
    getStoresListFromServerAndSetTheStoresList();
}

function getStoresListFromServerAndSetTheStoresList()
{
    var dataString = "zoneName="+zoneName;

    $.ajax({
        method:'GET',
        data: dataString,
        url: STORES_LIST_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
        },
        success: function(r) {
            setStoresListInStoreDropDownInOrder(r);
        }
    });
}

function setStoresListInStoreDropDownInOrder(detailsOnStoresInZone)
{
    console.log("in setStoresListInStoreDropDownInOrder");
    var chooseStoresDropDownList = $("#"+ ID_OF_CHOOSE_STORES_DROP_DOWN_LIST);
    $.each(detailsOnStoresInZone || [], function(index, storeInZone) {
        var storeID = storeInZone["serialNumber"];
        var storeName = storeInZone["name"];
        console.log("Adding store #" + storeID + ": " + storeName);
        $('<option value=' + storeID + '>' + 'storeID: ' + storeID + ', store Name: ' + storeName + '</option>').appendTo(chooseStoresDropDownList);

    });
}

function getSelectOrderTypeHTML()
{
    return '<p>Please select your type:</p>' +
        '<input type="radio" id=' + ID_OF_STATIC_RADIO_BUTTON + ' name="ordertype" value="static">'+
        '<label for="static">static</label><br>' +
        '<input type="radio" id=' + ID_OF_DYNAMIC_RADIO_BUTTON + ' name="ordertype" value="dynamic">' +
        '<label for="dynamic">dynamic</label><br>';
}

function getSelectDateHTML()
{
    return '<p>Enter the date</p>' +
        '<input type="date" id='+ ID_OF_DATE_OF_ORDER + ' name=' + ID_OF_DATE_OF_ORDER + '>' +
        '<br>';
}

function getNextButtonHTML()
{
    return '<form id = "makeANewOrder" name = "makeANewOrder">' +
        '<button name="Submit" type="submit" id="nextButtonInMakeAnOrderFirstScreen">next</button>' +
        '</form>';
}

function getChooseStoresDropDownListHTML()
{
    return '<form>' +
        '<label for="stores">Choose store:</label>'+
        '<select name="chooseStoresDropDownList" id=' + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST + '>' +
        '</select>' +
        '</form>';
}

//TODO
//Need to pass if static or dynamic
function setNextButtonInMakeAnOrderElement() { // onload...do
    var date = document.getElementById(ID_OF_DATE_OF_ORDER).value;
    var chooseStoresDropDownListElement;
    var storeIDSelected=null;
    $("#nextButtonInMakeAnOrderFirstScreen").submit(function() {
        //Getting selected ordertype,date and store if it's static
        if (document.getElementById(ID_OF_STATIC_RADIO_BUTTON).checked) {
            chooseStoresDropDownListElement = document.getElementById(ID_OF_CHOOSE_STORES_DROP_DOWN_LIST);
            storeIDSelected = chooseStoresDropDownListElement.options[chooseStoresDropDownListElement.selectedIndex].value;
            OpeningANewStaticOrderInServer(date, storeIDSelected);
            initiateTheChoosingItemDropDownInStaticOrder(storeIDSelected);
        }
        if (document.getElementById(ID_OF_DYNAMIC_RADIO_BUTTON).checked) {
            OpeningANewDynamicOrderInServer(date);
            initiateTheChoosingItemDropDownInDynamicOrder();
        }
        // return value of the submit operation
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    })
}

function OpeningANewStaticOrderInServer()
{
    $.ajax({
        method:'GET',
        data: dataString,
        url: CHOOSE_ITEMS_IN_ORDER_UTL,
        dataType: "json",
        //action: MOVE_TO_ZONE_URL,
        //contentType: 'application/json; charset=utf-8',
        // processData: false, // Don't process the files
        //contentType: false, // Set content type to false as jQuery will tell the server its a query string request
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
}

function OpeningANewDynamicOrderInServer()
{
    $.ajax({
        method:'GET',
        data: dataString,
        url: CHOOSE_ITEMS_IN_ORDER_UTL,
        dataType: "json",
        //action: MOVE_TO_ZONE_URL,
        //contentType: 'application/json; charset=utf-8',
        // processData: false, // Don't process the files
        //contentType: false, // Set content type to false as jQuery will tell the server its a query string request
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
}


function setNextButtonInShowStoresStatusInDynamicOrderElement() { // onload...do
    $("#makeANewOrder").submit(function() {
        var makeOrderBody = $("#makeOrderBody");
        emptyMakeOrderBody();
        var selectOrderTypeHTML = '<p>Please select your type:</p>' +
            '<input type="radio" id="static" name="ordertype" value="static">'+
            '<label for="static">static</label><br>' +
            '<input type="radio" id="dynamic" name="ordertype" value="dynamic">' +
            '<label for="dynamic">dynamic</label><br>';
        var selectDateHTML = '';
        var nextButtonHTML = '';
        $(selectOrderTypeHTML + selectDateHTML).appendTo(makeOrderBody);
        return false;
    })
}

function setNextButtonInSalesScreenInOrderElement() { // onload...do
    $("#makeANewOrder").submit(function() {
        var makeOrderBody = $("#makeOrderBody");
        emptyMakeOrderBody();
        var selectOrderTypeHTML = '<p>Please select your type:</p>' +
            '<input type="radio" id="static" name="ordertype" value="static">'+
            '<label for="static">static</label><br>' +
            '<input type="radio" id="dynamic" name="ordertype" value="dynamic">' +
            '<label for="dynamic">dynamic</label><br>';
        var selectDateHTML = '';
        var nextButtonHTML = '';
        $(selectOrderTypeHTML + selectDateHTML).appendTo(makeOrderBody);
        return false;
    })
}

function setFinishButtonInShowStatusOfOrderInOrderElement() { // onload...do
    $("#makeANewOrder").submit(function() {
        var makeOrderBody = $("#makeOrderBody");
        emptyMakeOrderBody();
        var selectOrderTypeHTML = '<p>Please select your type:</p>' +
            '<input type="radio" id="static" name="ordertype" value="static">'+
            '<label for="static">static</label><br>' +
            '<input type="radio" id="dynamic" name="ordertype" value="dynamic">' +
            '<label for="dynamic">dynamic</label><br>';
        var selectDateHTML = '';
        var nextButtonHTML = '';
        $(selectOrderTypeHTML + selectDateHTML).appendTo(makeOrderBody);
        return false;
    })
}

