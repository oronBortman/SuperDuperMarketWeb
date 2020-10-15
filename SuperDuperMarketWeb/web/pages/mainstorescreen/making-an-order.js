import { initiateTheChoosingItemDropDownInOrder } from './choosing-item-drop-down.js';
import {emptyMakeOrderBody} from "./general-make-an-order-functions.js";

var CREATE_DYNAMIC_ORDER_URL = buildUrlWithContextPath("create-dynamic-order");
var CREATE_STATIC_ORDER_URL = buildUrlWithContextPath("create-static-order");
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
var ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y = "plusButtonInSelectCoordY";
var ID_OF_TABLE_OF_ENTERING_COORDINATE_X = "tableOfEnteringCoordX";
var ID_OF_TABLE_OF_ENTERING_COORDINATE_Y = "tableOfEnteringCoordY";
var COORDINATE_X = 'x';
var COORDINATE_Y = 'y';
var INITIAL_VALUE_OF_COORDINATE = '0';
var STATIC="static";
var DYNAMIC="dynamic";


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
        setMinusButtonOnCoordinate(COORDINATE_X);
        setPlusButtonOnCoordinate(COORDINATE_X);
        setMinusButtonOnCoordinate(COORDINATE_Y);
        setPlusButtonOnCoordinate(COORDINATE_Y);
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

    return '<p>Please Enter Cooridnate ' + typeOfCoordinate +'</p> ' +
        '<table class =' + idOfTableOfEnteringCoordinate + '>' +
        '<tr>' +
        '<th><button type="button" id=' + idOfMinusButtonOfCoordinate + '>-</button></th>' +
        '<th><p id=' + idOfValueCoordinateChosen + '>' + INITIAL_VALUE_OF_COORDINATE + '</p></th>' +
        '<th><button type="button" id=' + idOfPlusOfCoordinate + '>+</button></th>' +
        '</tr>' +
        '</table>';
}


//TODO
export function setMinusButtonOnCoordinate(typeOfCoordinate)
{
    console.log("inside setMinusButtonOnCoordinate function")
    var idOfMinusButtonOfCoordinate;
    var idOfValueCoordinateChosen;
    var coordinateValue;
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
        var coordinateValueStr = $("#" + idOfValueCoordinateChosen).text();
        var coordinateValueNum = parseInt(coordinateValueStr);
        console.log("Coordinate value before checking the value: " + coordinateValueNum);
        if(coordinateValueNum > 0)
        {
           // alert($("#" + idOfValueCoordinateChosen).text());
            console.log("Coordinate value before changing the value: " + coordinateValueNum);
            coordinateValueNum=coordinateValueNum-1;
            console.log("Coordinate value after clicking on minus button: " + coordinateValueNum);
            $("#" + idOfValueCoordinateChosen).text(coordinateValueNum);
           // alert($("#" + idOfValueCoordinateChosen).text());

        }
    });
}

//TODO
export function setPlusButtonOnCoordinate(typeOfCoordinate)
{
    console.log("inside setPlusButtonOnCoordinate");
    var idOfPlusButtonOfCoordinate;
    var idOfValueCoordinateChosen;
    var coordinateValue;
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
        var coordinateValueStr = $("#" + idOfValueCoordinateChosen).text();
        var coordinateValueNum = parseInt(coordinateValueStr);
        console.log("Coordinate value before checking the value: " + coordinateValueNum);
        if(coordinateValueNum < 50)
        {
            // alert($("#" + idOfValueCoordinateChosen).text());
            console.log("Coordinate value before changing the value: " + coordinateValueNum);
            coordinateValueNum=coordinateValueNum+1;
            console.log("Coordinate value after clicking on minus button: " + coordinateValueNum);
            $("#" + idOfValueCoordinateChosen).text(coordinateValueNum);
            // alert($("#" + idOfValueCoordinateChosen).text());

        }
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

    $("#nextButtonInMakeAnOrderFirstScreen").click(function() {
        //Getting selected ordertype,date and store if it's static
      //  alert("clicked on nextButtonInMakeAnOrderFirstScreen");
        if (document.getElementById(ID_OF_STATIC_RADIO_BUTTON).checked) {
            OpeningANewOrderFromHTMLElements(STATIC);
        }
        if (document.getElementById(ID_OF_DYNAMIC_RADIO_BUTTON).checked) {
            OpeningANewOrderFromHTMLElements(DYNAMIC);
        }
        // return value of the submit operation
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    })
}

function OpeningANewOrderFromHTMLElements(orderType)
{
    var date = document.getElementById(ID_OF_DATE_OF_ORDER).value;
    var coordinateX=$("#" + ID_OF_VALUE_OF_COORDINATE_X_CHOSEN).text();
    var coordinateY=$("#" + ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN).text();
    alert("date:" + date + " coordinateX: " + coordinateX + " coordinateY:" + coordinateY);
    if(orderType===STATIC)
    {
        var chooseStoresDropDownListElement = document.getElementById(ID_OF_CHOOSE_STORES_DROP_DOWN_LIST);
        var storeIDSelected = chooseStoresDropDownListElement.options[chooseStoresDropDownListElement.selectedIndex].value;
        OpeningANewStaticOrderInServer(date, storeIDSelected, coordinateX, coordinateY);
    }
    else if(orderType===DYNAMIC)
    {
        OpeningANewDynamicOrderInServer(date, coordinateX, coordinateY);
    }

    initiateTheChoosingItemDropDownInOrder(orderType);
}

function OpeningANewStaticOrderInServer(date, storeIDSelected, coordinateX, coordinateY)
{
    $.ajax({
        method:'GET',
        data:{"date":date,"storeIDSelected":storeIDSelected,"coordinateX":coordinateX,"coordinateY":coordinateY},
        url: CREATE_STATIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
            alert('error in OpeningANewDynamic\n' + e);
        },
        success: function(r) {
            console.log("Succesfully!!!");
            console.log(r);

        }
    });
}

function OpeningANewDynamicOrderInServer(date,coordinateX, coordinateY)
{
    $.ajax({
        method:'GET',
        data:{"date":date,"coordinateX":coordinateX,"coordinateY":coordinateY},
        url: CREATE_DYNAMIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
            alert('error in OpeningANewDynamic\n' + e);
        },
        success: function(r) {
            console.log("Succesfully!!!");
            console.log(r);
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

