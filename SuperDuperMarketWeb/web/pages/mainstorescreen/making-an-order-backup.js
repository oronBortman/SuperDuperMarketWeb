import { initiateTheChoosingItemDropDownInOrder } from './choosing-item-drop-down.js';
import {creatingCoordinatesHTMLAndSetEvents} from './creating-coordinate-elements.js';
import {
    createButton,
    appendHTMLToElement, emptyElementByID
} from "./general-functions.js";

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
var ID_OF_MAKE_AN_ORDER_CONTAINER = 'makeAnOrderContainer';
const ID_OF_DATE_ERROR = 'dateError';
const ID_OF_FIRST_ROW_OF_ORDER = 'firstRowOfOrder';
const ID_OF_SECOND_ROW_OF_ORDER = 'secondRowOfOrder';

var STATIC="static";
var DYNAMIC="dynamic";


function emptyChooseStoresDropDownListElement()
{
    document.getElementById(ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT).innerHTML = '';
}


export function setMakeANewOrderButton() { // onload...do
    console.log("In setMakeANewOrderButtonInJS");
    $("#makeANewOrder").submit(function() {
        emptyElementByID(ID_OF_MAKE_AN_ORDER_CONTAINER);
        var selectOrderMessageHTML = getSelectOrderTypeMessageHTML();
        var selectOrderTypeHTML = getSelectOrderTypeRadioButtonsHTML();
       // appendHTMLToElement(getOrderTypeErrorHTML(), ID_OF_MAKE_AN_ORDER_CONTAINER);
        var selectDateMessageHTML = getSelectDateMessageHTML();
        var selectDateHTML = getSelectDateHTML();
        var nextButtonHTML = createButton(ID_OF_NEXT_BUTTON, 'Next')// getNextButtonHTML();
        var chooseStoresDropDownList = '<div id=' + ID_OF_CHOOSE_STORES_DROP_DOWN_LIST_ELEMENT + '></div>';

        appendHTMLToElement(getRowHTML(ID_OF_FIRST_ROW_OF_ORDER), ID_OF_MAKE_AN_ORDER_CONTAINER);
        appendHTMLToElement(getRowHTML(ID_OF_SECOND_ROW_OF_ORDER), ID_OF_MAKE_AN_ORDER_CONTAINER);

        appendHTMLToElement(selectOrderMessageHTML, ID_OF_FIRST_ROW_OF_ORDER);
        appendHTMLToElement(selectDateMessageHTML, ID_OF_FIRST_ROW_OF_ORDER);
        appendHTMLToElement(selectOrderTypeHTML, ID_OF_SECOND_ROW_OF_ORDER);
        appendHTMLToElement(selectDateHTML, ID_OF_SECOND_ROW_OF_ORDER);
        appendHTMLToElement(getDateErrorHTML(), ID_OF_SECOND_ROW_OF_ORDER);
        creatingCoordinatesHTMLAndSetEvents(ID_OF_VALUE_OF_COORDINATE_X_CHOSEN, ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN, ID_OF_MAKE_AN_ORDER_CONTAINER);
        appendHTMLToElement(chooseStoresDropDownList, ID_OF_MAKE_AN_ORDER_CONTAINER);
        appendHTMLToElement(nextButtonHTML, ID_OF_MAKE_AN_ORDER_CONTAINER);

        setTypeOfOrderRadioButtonEvent();

        $("#" + ID_OF_DATE_ERROR).hide();

        $("#" + ID_OF_DYNAMIC_RADIO_BUTTON).prop("checked", true);
        setNextButtonInMakeAnOrderElement(ID_OF_MAKE_AN_ORDER_CONTAINER);
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



function getRowHTML(idOfRow)
{
    return '<div class="row" id=' + idOfRow + '></div>';
}

function getSelectOrderTypeMessageHTML()
{
    return '<div class="col-lg-4"' +
             '<p>Please select your type:</p>' +
            '</div>';
}

function getSelectOrderTypeRadioButtonsHTML()
{
    return '<div class="col-xs-1"' +
                '<input class="center-block" type="radio" id=' + ID_OF_STATIC_RADIO_BUTTON + ' name="orderType" value="static">'+
                '<label class="center-block"  for="static">static</label><br>' +
            '</div'+
            '<div class="col-xs-1"' +
                '<input class="center-block"  type="radio" id=' + ID_OF_DYNAMIC_RADIO_BUTTON + ' name="orderType" value="dynamic">' +
                '<label class="center-block"  for="dynamic">dynamic</label><br>'+
            '</div';
}

function getSelectDateHTML()
{
    return '<div class="col-xs-5">' +
                '<input class="center-block" type="date" id='+ ID_OF_DATE_OF_ORDER + ' name=' + ID_OF_DATE_OF_ORDER + '>' +
                '<br>' +
            '</div>';
}

function getSelectDateMessageHTML()
{
    return  '<div class="col-lg-2">' +
                '<p>Enter the date</p>' +
            '</div>';
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
function setNextButtonInMakeAnOrderElement(idOfMakeAnOrderContainer) { // onload...do

    $("#nextButtonInMakeAnOrderFirstScreen").click(function() {
        //Getting selected ordertype,date and store if it's static
      //  alert("clicked on nextButtonInMakeAnOrderFirstScreen");
     //   alert($("#" + ID_OF_DATE_OF_ORDER).val());
        if($("#" + ID_OF_DATE_OF_ORDER).val() === "")
        {
            //alert("date is not selected!");
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
  //  alert("date:" + date + " coordinateX: " + coordinateX + " coordinateY:" + coordinateY);
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