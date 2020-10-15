import {emptyMakeOrderBody} from "./general-make-an-order-functions.js";

const ITEMS_NOT_CHOSEN_IN_ORDER_URL=buildUrlWithContextPath("get-items-that-are-available-in-order");

//ID's of HTML Elements
const ID_OF_MINUS_BUTTON = "minusButton";
const ID_OF_PLUS_BUTTON = "plusButton";
const ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN = 'valueOfAmountOfItemChosen';
const ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT = "chooseItemsInDropDownListElement";
const ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
const ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
const ID_OF_ITEM_ELEMENT = 'itemElement';

const STATIC = 'static';
const DYNAMIC = 'dynamic';

const QUANTITY_DIFFERENCE = 1;
const WEIGHT_DIFFERENCE = 0.25;
const MIN_QUANTITY_AMOUNT = 1;
const MIN_WEIGHT_AMOUNT = 0.25;
const QUANTITY = "Quantity";
const WEIGHT = "Weight";

export function initiateTheChoosingItemDropDownInOrder(orderType)
{
    initiateChoosingItemDropDownHTMLInOrder();
    $(getChooseItemsDropDownListHTML()).appendTo($("#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT));
    $(getAddItemToOrderButtonHTML()).appendTo($("#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT));
    getItemElementHTMLAndAppendToMakeOrderBody();
    setChoosingItemFromDropDownListEvent(orderType);
    setAddItemToOrderButtonClickedEvent();
    getItemsListFromServerAndSetTheItemsList(orderType);
}

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
        var itemStr = $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).val();
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
        var itemTypeOfMeasure = item["typeToMeasureBy"];
        var itemJson = {
            "serialNumber": itemID,
            "name": itemName,
            "pricePerUnit": itemPrice,
            "typeToMeasureBy": itemTypeOfMeasure
        };
        var itemStr =JSON.stringify(itemJson);
        console.log("Adding item #" + itemID + ": " + itemName);
       // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        $('<option value=' + itemStr + '>' + 'availableItem serialID: ' + itemID + ', available Item Name: ' + itemName + '</option>').appendTo(chooseItemsDropDownList);
        if(index === 0)
        {
            createItemToChooseElement(itemStr, orderType);
        }
    });
}

export function getHTMLOfItemToChooseInOrder(itemStr, orderType)
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

export function emptyItemElement()
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
        initiateTheChoosingItemDropDownInOrder(storeIDSelected);
    });
}

export function subbingAmount(amount, minAmount, difference)
{
    if(amount > minAmount)
    {
        amount=amount-difference;
        updateValueOfAmountOfItemChosen(amount);
    }
}

export function addingAmount(amount, minAmount, difference)
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
        //    alert("chose to add quantity " + amount + " " + QUANTITY_DIFFERENCE + " " + QUANTITY_DIFFERENCE);
            subbingAmount(amount, MIN_QUANTITY_AMOUNT, QUANTITY_DIFFERENCE);
        }
        else if(typeToMeasureBy === WEIGHT)
        {
            amount = getValueOfWeightOfItemChosen();
          //  alert("chose to add weight " + amount + " " + MIN_WEIGHT_AMOUNT + " " + WEIGHT_DIFFERENCE);
            subbingAmount(amount,MIN_WEIGHT_AMOUNT,WEIGHT_DIFFERENCE);
        }
    });
}

export function getValueOfQuantityOfItemChosen()
{
    var valueStr = $("#" + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text();
    return parseInt(valueStr);
}

export function getValueOfWeightOfItemChosen()
{
    var valueStr = $("#" + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text();
    return parseFloat(valueStr);
}

export function updateValueOfAmountOfItemChosen(value)
{
    $("#" + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text(value);

}

function setPlusButtonEvent(typeToMeasureBy)
{
    console.log("inside setPlusButtonOnCoordinate");
    $("#" + ID_OF_PLUS_BUTTON).click(function() {

        //console.log("Coordinate value before checking the value: " + coordinateValueNum);
        var amount;
        if(typeToMeasureBy === QUANTITY )
        {
            amount = getValueOfQuantityOfItemChosen();
           // alert("chose to add quantity " + amount + " " + QUANTITY_DIFFERENCE + " " + QUANTITY_DIFFERENCE);
            addingAmount(amount, MIN_QUANTITY_AMOUNT, QUANTITY_DIFFERENCE);
        }
        else if(typeToMeasureBy === WEIGHT)
        {
            amount = getValueOfWeightOfItemChosen();
       //     alert("chose to add weight " + amount + " " + MIN_WEIGHT_AMOUNT + " " + WEIGHT_DIFFERENCE);
            addingAmount(amount,MIN_WEIGHT_AMOUNT,WEIGHT_DIFFERENCE);
        }
    });
}

export function getItemsListFromServerAndSetTheItemsList(orderType)
{
 //   alert("in getItemsListFromServerAndSetTheItemsList: " + orderType);
    $.ajax({
        method: 'GET',
        data: {"orderType":orderType},
        url: ITEMS_NOT_CHOSEN_IN_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getItemsListFromServerAndSetTheItemsList\n' + e);
        },
        success: function (r) {
            if(r.length == 0)
            {
                $('#' + ID_OF_ADD_ITEM_TO_ORDER).prop("disabled",true);
            }
            setItemsListInItemDropDownInOrder(r, orderType);
        }
    })
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
