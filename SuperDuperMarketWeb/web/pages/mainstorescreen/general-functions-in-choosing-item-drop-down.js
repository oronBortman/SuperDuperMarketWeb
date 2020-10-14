import {emptyMakeOrderBody} from "./general-make-an-order-functions.js";
import {initiateTheChoosingItemDropDownInStaticOrder} from "./choosing-item-drop-down-in-staticOrder.js";

var ID_OF_MINUS_BUTTON = "minusButton";
var ID_OF_PLUS_BUTTON = "plusButton";
var ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN = 'valueOfAmountOfItemChosen';
var ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
var ID_OF_ITEM_ELEMENT = 'itemElement';

var ITEMS_NOT_CHOSEN_IN_STATIC_ORDER_URL = buildUrlWithContextPath("get-items-that-are-available-in-static-order");
var GET_ITEM_FROM_STORE_URL = buildUrlWithContextPath("get-item-from-store");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT = "chooseItemsInDropDownListElement";
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
var NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
var ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
var ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
var ID_OF_ITEM_ELEMENT = 'itemElement';
var STATIC = 'static';
var DYNAMIC = 'dynamic';
var QUANTITY_DIFFERENCE = 1;
var WEIGHT_DIFFERENCE = 0.25;
var MIN_QUANTITY_AMOUNT = 1;
var MIN_WEIGHT_AMOUNT = 0.25;
var QUANTITY = "Quantity";
var WEIGHT = "Weight";


export function initiateChoosingItemDropDownHTMLInOrder()
{
    var makeOrderBody = $("#" + ID_OF_MAKE_ORDER_BODY);
    emptyMakeOrderBody();
    console.log("In function initiateChoosingItemDropDownHTMLInOrder()\n")
    var chooseItemsDropDownList = '<div id="chooseItemsInDropDownListElement"></div>';
    $(chooseItemsDropDownList).appendTo(makeOrderBody);
}

export function setChoosingItemFromDropDownListEvent(orderType)
{
    $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).change(function () {
        //var dropDownListElement = document.getElementById(ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST);
        // alert('chose item with value \n' + dropDownListElement);
        // var availableItem = dropDownListElement.options[dropDownListElement.selectedIndex].value;
        var itemStr = $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).val();
      //  alert('in setChoosingItemFromDropDownListEvent\n ' + itemStr);
        createItemToChooseElement(itemStr, orderType);
    });
}

export function createItemToChooseElement(itemStr, orderType)
{
    var itemJSON = JSON.parse(itemStr);
    var typeToMeasureBy = itemJSON["typeToMeasureBy"];
    emptyItemElement();
    ($(getHTMLOfItemToChooseInOrder(itemStr, orderType))).appendTo($("#" + ID_OF_ITEM_ELEMENT));
    ($(getHTMLOfTableOfEnteringAmountOfItem(typeToMeasureBy, orderType))).appendTo($("#" + ID_OF_ITEM_ELEMENT));
    setMinusButtonEvent(typeToMeasureBy);
    setPlusButtonEvent(typeToMeasureBy)
}

export function getChooseItemsDropDownListHTML()
{
    return '<form>' +
        '<label for="itemsInStore">Choose item:</label>'+
        '<select name=' + NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST + ' id=' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST + '>' +
        '</select>' +
        '</form>';
}

export function setItemsListInItemDropDownInOrder(itemsList, orderType)
{
    var chooseItemsDropDownList = $("#"+ ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST);

    $.each(itemsList || [], function(index, item) {
        var itemID = item["serialNumber"];
        var itemName = item["name"]["value"];
        var itemPrice = item["pricePerUnit"];
        var itemTypeOfMeasre = item["typeToMeasureBy"];
        var itemJson = {"serialNumber":itemID, "name":itemName,"pricePerUnit":itemPrice, "typeToMeasureBy":itemTypeOfMeasre}
        var itemStr =JSON.stringify(itemJson);
        console.log("Adding item #" + itemID + ": " + itemName);
      //  alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        $('<option value=' + itemStr + '>' + 'availableItem serialID: ' + itemID + ', available Item Name: ' + itemName + '</option>').appendTo(chooseItemsDropDownList);
        if(index === 0)
        {
            createItemToChooseElement(itemStr, orderType);
        }
    });
}

function getHTMLOfItemToChooseInOrder(itemStr, orderType)
{
    var itemJSON = JSON.parse(itemStr);
    var res;
    var serialIDOfItem = itemJSON["serialNumber"];
 //   alert('chose item!!!! ' + serialIDOfItem);
    var nameOfItem = itemJSON["name"];
   // alert('chose item with name ' + nameOfItem);

    var table='<table class ="tableOfItemForm">';
    var serialIdRow='<tr><th>serial id:</th><th>' + serialIDOfItem + '</th></tr>';
    var namRow='<tr><th>name:</th><th>' + nameOfItem + '</th></tr>';

    if(orderType === STATIC)
    {
        var availableItemPrice = itemJSON["pricePerUnit"];
     //   alert('chose item with price ' + availableItemPrice);
        var priceRow='<tr><th>price:</th><th>' + availableItemPrice + '</th></tr>';
        res = table + '<tbody>' + serialIdRow + namRow + priceRow + '</tbody>' + '</table>';
    }
    else
    {
        res = table + '<tbody>' + serialIdRow + namRow + '</tbody>' + '</table>';
    }
    return res;
}

export function getAddItemToOrderButtonHTML()
{
    return '<button type="button" id=' + ID_OF_ADD_ITEM_TO_ORDER + '> Add item to order</button>';
}

function emptyItemElement()
{
    document.getElementById(ID_OF_ITEM_ELEMENT).innerHTML = '';
}

export function getItemElementHTMLAndAppendToMakeOrderBody()
{
    var makeOrderBody = $("#" + ID_OF_MAKE_ORDER_BODY);
    console.log("In function getItemElementHTML\n")
    var itemElement = '<div id=' + ID_OF_ITEM_ELEMENT + '></div>';
    $(itemElement).appendTo(makeOrderBody);
}

export function getHTMLOfTableOfEnteringAmountOfItem(typeToMeasureBy)
{

    var amount;
    if(typeToMeasureBy === QUANTITY)
    {
        amount=QUANTITY_DIFFERENCE;
    }
    else if(typeToMeasureBy === WEIGHT)
    {
        amount=WEIGHT_DIFFERENCE;
    }

    return '<table class ="tableOfEnteringAmountOfItem">' +
        '<tr>' +
        '<th id="minus"><button type="button" id=' + ID_OF_MINUS_BUTTON + '>-</button></th>' +
        '<th><p id=' + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN + '>' + amount + '</p></th>' +
        '<th><button type="button" id=' + ID_OF_PLUS_BUTTON + '>+</button></th>' +
        '</tr>' +
        '</table>';
}

export function setAddItemToOrderButtonClickedEvent()
{
    $("#" + ID_OF_ADD_ITEM_TO_ORDER).click(function() {
        subbingAmount();
        initiateTheChoosingItemDropDownInStaticOrder(storeIDSelected);
    });
}

function subbingAmount(amount, minAmount, difference)
{
    if(amount > minAmount)
    {
        amount=amount-difference;
        updateValueOfAmountOfItemChosen(amount);
    }
}

function addingAmount(amount, minAmount, difference)
{
    amount=amount+difference;
    updateValueOfAmountOfItemChosen(amount);
}

export function setMinusButtonEvent(typeToMeasureBy)
{
    console.log("inside setMinusButtonOnCoordinate function")

    $("#" + ID_OF_MINUS_BUTTON).click(function() {
       // console.log("Coordinate value before checking the value: " + coordinateValueNum);
        var amount;

        if(typeToMeasureBy === QUANTITY )
        {
            amount = getValueOfQuantityOfItemChosen();
            alert("chose to add quantity " + amount + " " + QUANTITY_DIFFERENCE + " " + QUANTITY_DIFFERENCE);
            subbingAmount(amount, MIN_QUANTITY_AMOUNT, QUANTITY_DIFFERENCE);
        }
        else if(typeToMeasureBy === WEIGHT)
        {
            amount = getValueOfWeightOfItemChosen();
            alert("chose to add weight " + amount + " " + MIN_WEIGHT_AMOUNT + " " + WEIGHT_DIFFERENCE);
            subbingAmount(amount,MIN_WEIGHT_AMOUNT,WEIGHT_DIFFERENCE);
        }
    });
}

function getValueOfQuantityOfItemChosen()
{
    var valueStr = $("#" + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text();
    return parseInt(valueStr);
}

function getValueOfWeightOfItemChosen()
{
    var valueStr = $("#" + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text();
    return parseFloat(valueStr);
}

function updateValueOfAmountOfItemChosen(value)
{
    $("#" + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text(value);

}

export function setPlusButtonEvent(typeToMeasureBy)
{
    console.log("inside setPlusButtonOnCoordinate");
    $("#" + ID_OF_PLUS_BUTTON).click(function() {

        //console.log("Coordinate value before checking the value: " + coordinateValueNum);
        var amount;
        if(typeToMeasureBy === QUANTITY )
        {
            amount = getValueOfQuantityOfItemChosen();
            alert("chose to add quantity " + amount + " " + QUANTITY_DIFFERENCE + " " + QUANTITY_DIFFERENCE);
            addingAmount(amount, MIN_QUANTITY_AMOUNT, QUANTITY_DIFFERENCE);
        }
        else if(typeToMeasureBy === WEIGHT)
        {
            amount = getValueOfWeightOfItemChosen();
            alert("chose to add weight " + amount + " " + MIN_WEIGHT_AMOUNT + " " + WEIGHT_DIFFERENCE);
            addingAmount(amount,MIN_WEIGHT_AMOUNT,WEIGHT_DIFFERENCE);
        }
    });
}

export function setNextButtonInChooseItemsElement() { // onload...do
    $("#makeANewOrder").submit(function() {
        var makeOrderBody = $("#makeOrderBody");
        document.getElementById('makeOrderBody').innerHTML = '';
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
