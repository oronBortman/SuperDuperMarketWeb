import { initiateTheChoosingItemDropDownInStaticOrder } from './choosing-item-drop-down-in-staticOrder.js';
import {emptyMakeOrderBody} from "./general-make-an-order-functions.js";

var CREATE_DYNAMIC_ORDER_URL = buildUrlWithContextPath("create-dynamic-order-servlet");
var CREATE_STATIC_ORDER_URL = buildUrlWithContextPath("create-static-order-servlet");
var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");
var ITEMS_LIST_URL = buildUrlWithContextPath("items-in-zone-list");
var CHOOSE_ITEMS_IN_ORDER_UTL = buildUrlWithContextPath("choose-item-in-order");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_STATIC_RADIO_BUTTON = "staticRadioButton";
var ID_OF_DYNAMIC_RADIO_BUTTON = "dynamicRadioButton";
var ID_OF_DATE_OF_ORDER = 'dateOfOrder';
var ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT = 'chooseStoresDropDownListElement';
var ID_OF_CHOOSE_STORES_DROP_DOWN_LIST = 'chooseStoresDropDownList'

var ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_X="minusButtonInSelectCoordX";
var ID_OF_VALUE_OF_COORDINATE_X_CHOSEN = "valueOfSelectedCoordX";
var ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_X = "plusButtonInSelectCoordX";
var ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_Y = "minusButtonInSelectCoordY";
var ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN = "valueOfSelectedCoordY"
var ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y = "minusButtonInSelectCoordY";
var ID_OF_TABLE_OF_ENTERING_COORDINATE_X = "tableOfEnteringCoordX";
var ID_OF_TABLE_OF_ENTERING_COORDINATE_Y = "tableOfEnteringCoordY";
var COORDINATE_X = 'x';
var COORDINATE_Y = 'y';

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
        var selectCoordinateXHTML = getSelectedCoordinateHTML(COORDINATE_X);
        var selectCoordinateYHTML = getSelectedCoordinateHTML(COORDINATE_Y);
        var nextButtonHTML = getNextButtonHTML();
        var chooseStoresDropDownList = '<div id=' + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT + '></div>';
        $(selectOrderTypeHTML + selectDateHTML + selectCoordinateXHTML + selectCoordinateYHTML + chooseStoresDropDownList + nextButtonHTML).appendTo(makeOrderBody);
        setTypeOfOrderRadioButtonEvent();
        setNextButtonInMakeAnOrderElement();
        return false;
    })
}


function getSelectedCoordinateHTML(typeOfCoordinate)
{
    var idOfTableOfEnteringCoordinate;
    var idOfMinusButtonOfCoordinate;
    var idOfPlusOfCoordinate;
    var idOfValueCoordinateChosen;

    if(typeOfCoordinate === COORDINATE_X)
    {
        idOfTableOfEnteringCoordinate = ID_OF_TABLE_OF_ENTERING_COORDINATE_X;
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_X;
        idOfPlusOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_X;
        idOfValueCoordinateChosen = ID_OF_VALUE_OF_COORDINATE_X_CHOSEN;
    }
    else if(typeOfCoordinate === COORDINATE_Y)
    {
        idOfTableOfEnteringCoordinate = ID_OF_TABLE_OF_ENTERING_COORDINATE_Y;
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_Y;
        idOfPlusOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y;
        idOfValueCoordinateChosen = ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN;
    }

    return '<p Please Enter Cooridnate ' + typeOfCoordinate +
        '<table class =' + idOfTableOfEnteringCoordinate + '>' +
        '<tr>' +
        '<th><button type="button" id=' + idOfMinusButtonOfCoordinate + '>-</button></th>' +
        '<th><p id=' + idOfValueCoordinateChosen + '></p></th>' +
        '<th><button type="button" id=' + idOfPlusOfCoordinate + '>+</button></th>' +
        '</tr>' +
        '</table>';
}


//TODO
export function setMinusButton(typeOfCoordinate)
{
    var idOfMinusButtonOfCoordinate;
    var idOfValueCoordinateChosen;
    if(typeOfCoordinate === COORDINATE_X)
    {
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_X;
        idOfValueCoordinateChosen = ID_OF_VALUE_OF_COORDINATE_X_CHOSEN;
    }
    else if(typeOfCoordinate === COORDINATE_Y)
    {
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_Y;
        idOfValueCoordinateChosen = ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN;
    }
    $("#" + idOfMinusButtonOfCoordinate).click(function() {

    });
}

//TODO
export function setPlusButton(typeOfCoordinate)
{
    var idOfPlusButtonOfCoordinate;
    var idOfValueCoordinateChosen;
    if(typeOfCoordinate === COORDINATE_X)
    {
        idOfPlusButtonOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_X;
        idOfValueCoordinateChosen = ID_OF_VALUE_OF_COORDINATE_X_CHOSEN;
    }
    else if(typeOfCoordinate === COORDINATE_Y)
    {
        idOfPlusButtonOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y;
        idOfValueCoordinateChosen = ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN;
    }
    $("#" + idOfPlusButtonOfCoordinate).click(function() {

    });
}

function setTypeOfOrderRadioButtonEvent()
{
    $("#" + ID_OF_STATIC_RADIO_BUTTON).click(function() {
        console.log("clicked static radio button");
        emptyChooseStoresDropDownListElement();
        initiateChooseStoresDropDownListElement();
    });
    $("#" + ID_OF_DYNAMIC_RADIO_BUTTON).click(function() {
        console.log("clicked dynamic radio button");
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

function OpeningANewStaticOrderInServer(date, storeIDSelected)
{
    var dataString = "date="+date + ",storeIDSelected="+storeIDSelected;
    $.ajax({
        method:'GET',
        data: dataString,
        url: CREATE_STATIC_ORDER_URL,
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
            // $("#result").text(r);
        }
    });
}

function OpeningANewDynamicOrderInServer(date)
{
    var dataString = "date="+date;
    $.ajax({
        method:'GET',
        data: dataString,
        url: CREATE_DYNAMIC_ORDER_URL,
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

