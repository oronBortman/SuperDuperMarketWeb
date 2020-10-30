import { initiateTheChoosingItemDropDownInOrder } from './choosing-item-drop-down.js';
import {creatingCoordinatesHTMLAndSetEvents} from './creating-coordinate-elements.js';
import {
    createButton,
    appendHTMLToElement, emptyElementByID,
    createEmptyPreContainer, disableElement
} from "./general-functions.js";

var CHECK_IF_LOCATION_USED = buildUrlWithContextPath("check-if-location-used");
var CREATE_DYNAMIC_ORDER_URL = buildUrlWithContextPath("create-dynamic-order");
var CREATE_STATIC_ORDER_URL = buildUrlWithContextPath("create-static-order");
var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");

var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;

var ID_OF_STATIC_RADIO_BUTTON = "staticRadioButton";
var ID_OF_DYNAMIC_RADIO_BUTTON = "dynamicRadioButton";
var ID_OF_DATE_OF_ORDER = 'dateOfOrder';
var ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT = 'chooseStoresDropDownListElement';
var ID_OF_CHOOSE_STORES_DROP_DOWN_LIST = 'chooseStoresDropDownList'
var ID_OF_NEXT_BUTTON = 'nextButtonInMakeAnOrderFirstScreen';
var ID_OF_VALUE_OF_COORDINATE_X_CHOSEN = "valueOfSelectedCoordinateX";
var ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN = "valueOfSelectedCoordinateY"
var ID_OF_MAKE_AN_ORDER_BODY = 'makeOrderBody';
const ID_OF_CUSTOMER_LOCATION_STATUS = 'customerLocationStatus';
const ID_OF_DATE_ERROR = 'dateError';
const ID_OF_MAKE_AN_ORDER_PRE = 'makeAnOrderPre';
var STATIC="static";
var DYNAMIC="dynamic";


function emptyChooseStoresDropDownListElement()
{
    document.getElementById(ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT).innerHTML = '';
}

export function setMakeANewOrderButton() { // onload...do
    console.log("In setMakeANewOrderButtonInJS");
    $("#makeANewOrderButton").click(function() {
        emptyElementByID(ID_OF_MAKE_AN_ORDER_BODY);
        appendHTMLToElement('<br><br>', ID_OF_MAKE_AN_ORDER_BODY);
        appendHTMLToElement(createEmptyPreContainer(ID_OF_MAKE_AN_ORDER_PRE), ID_OF_MAKE_AN_ORDER_BODY);

        var selectOrderTypeHTML = getSelectOrderTypeMessageHTML();
        var selectDateHTML = getSelectDateHTML();
        var nextButtonHTML = createButton(ID_OF_NEXT_BUTTON, 'Next')// getNextButtonHTML();
        var chooseStoresDropDownList = '<div id=' + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT + '></div>';
        appendHTMLToElement(selectOrderTypeHTML, ID_OF_MAKE_AN_ORDER_PRE);
        setTypeOfOrderRadioButtonEvent();
        appendHTMLToElement(selectDateHTML, ID_OF_MAKE_AN_ORDER_PRE);
        appendHTMLToElement(getDateErrorHTML(), ID_OF_MAKE_AN_ORDER_PRE);
        $("#" + ID_OF_DATE_ERROR).hide();
        creatingCoordinatesHTMLAndSetEvents(ID_OF_VALUE_OF_COORDINATE_X_CHOSEN, ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN, ID_OF_MAKE_AN_ORDER_PRE);
        appendHTMLToElement(ID_OF_MAKE_AN_ORDER_PRE);
        appendHTMLToElement('<p id="' + ID_OF_CUSTOMER_LOCATION_STATUS + '"></p>',ID_OF_MAKE_AN_ORDER_PRE);
        appendHTMLToElement(chooseStoresDropDownList, ID_OF_MAKE_AN_ORDER_PRE);
        appendHTMLToElement(nextButtonHTML, ID_OF_MAKE_AN_ORDER_PRE);
        $("#" + ID_OF_DYNAMIC_RADIO_BUTTON).prop("checked", true);
        setNextButtonInMakeAnOrderElement(ID_OF_MAKE_AN_ORDER_PRE);
        return false;
    })
}

export function getDateErrorHTML()
{
    return '<p id=' + ID_OF_DATE_ERROR + ' style="color:red;">Need to choose date</p>';
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
        $("<option value=" + storeID + ">" + "storeID: " + storeID + ", store Name: '" + storeName + "'</option>").appendTo(chooseStoresDropDownList);

    });
}

function getSelectOrderTypeMessageHTML()
{
    return '<p>Please select your type:</p>' +
            '<input type="radio" id=' + ID_OF_STATIC_RADIO_BUTTON +
                ' name="orderType" value="static">'+
                '<label   for="static">static</label><br>' +
                '<input  type="radio" id=' + ID_OF_DYNAMIC_RADIO_BUTTON +
                ' name="orderType" value="dynamic">' +
                '<label   for="dynamic">dynamic</label><br>';
}

function getSelectDateHTML()
{
    return '<p>Enter the date</p>' +
        '<input type="date" id='+ ID_OF_DATE_OF_ORDER + ' name=' + ID_OF_DATE_OF_ORDER + '>' +
        '<br>';
}

function getChooseStoresDropDownListHTML()
{
    return '<form>' +
        '<label for="stores">Choose store:</label>'+
        '<select name="chooseStoresDropDownList" id=' + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST + '>' +
        '</select>' +
        '</form>';
}

function setNextButtonInMakeAnOrderElement(idOfMakeAnOrderContainer) { // onload...do

    $("#nextButtonInMakeAnOrderFirstScreen").click(function() {
        var coordinateX = $("#" + ID_OF_VALUE_OF_COORDINATE_X_CHOSEN).text();
        var coordinateY = $("#" + ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN).text();
        var customerLocationStatusSelector =  $("#" + ID_OF_CUSTOMER_LOCATION_STATUS);
        customerLocationStatusSelector.text('');
        $("#" + ID_OF_DATE_ERROR).hide();

        $.ajax({
            method: 'GET',
            data: {"coordinateX":coordinateX, "coordinateY":coordinateY},
            url: CHECK_IF_LOCATION_USED,
            dataType: "json",
            timeout: 4000,
            error: function (e) {
                console.error(e);
                alert('error in checkIfLocationUSED\n' + e);
            },
            success: function (r) {
                if(r["thereIsAlreadyStoreInLocation"] === "true")
                {
                    customerLocationStatusSelector.css('color', 'red');
                    customerLocationStatusSelector.text("Error: Can't create order from this location because there is a store in this location!");
                }
                else if($("#" + ID_OF_DATE_OF_ORDER).val() === "")
                {
                    $("#" + ID_OF_DATE_ERROR).show();
                }
                else
                {
                    if (document.getElementById(ID_OF_STATIC_RADIO_BUTTON).checked) {
                        OpeningANewOrderFromHTMLElements(STATIC, idOfMakeAnOrderContainer);
                    }
                    else if (document.getElementById(ID_OF_DYNAMIC_RADIO_BUTTON).checked) {
                        OpeningANewOrderFromHTMLElements(DYNAMIC, idOfMakeAnOrderContainer);
                    }
                }
            }
        });
        // !!!!return value of the submit operation
        // by default - we'll always return false so it doesn't redirect the user.
        return false;
    })
}

function OpeningANewOrderFromHTMLElements(orderType, idOfMakeAnOrderContainer)
{
    var date = document.getElementById(ID_OF_DATE_OF_ORDER).value;
    var coordinateX=$("#" + ID_OF_VALUE_OF_COORDINATE_X_CHOSEN).text();
    var coordinateY=$("#" + ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN).text();
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

    initiateTheChoosingItemDropDownInOrder(orderType, idOfMakeAnOrderContainer);
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