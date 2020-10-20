import {createEmptyHTMLContainer,
    createEmptyDropDownListHTML,
    createButton,
    disableElement,
    enableElement,
    emptyElementByID,
    appendHTMLToElement
} from "./general-functions.js";
import {prepareAndInitiateChoosingDiscountsToApply} from "./choosing-discounts-to-apply.js"
import {initiateShowStoresStatusTable} from "./show-store-status-in-dynamic-order.js"

const ITEMS_NOT_CHOSEN_IN_ORDER_URL=buildUrlWithContextPath("get-items-that-are-available-in-order");
const ACTIVATE_DYNAMIC_ALGORITHM_IN_DYNAMIC_ORDER_URL = buildUrlWithContextPath("activate-dynamic-algorithm-in-dynamic-order");

const ADD_ITEM_TO_ORDER = buildUrlWithContextPath("add-item-to-order");
//ID's of HTML Elements
const ID_OF_MINUS_BUTTON = "minusButton";
const ID_OF_PLUS_BUTTON = "plusButton";
const ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN = 'valueOfAmountOfItemChosen';
const ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT = "chooseItemsInDropDownListElement";
const ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
const ID_OF_ITEM_ELEMENT = 'itemElement';
const ID_OF_NEXT_BUTTON = "nextButton";

const STATIC = 'static';
const DYNAMIC = 'dynamic';

const QUANTITY_DIFFERENCE = 1;
const WEIGHT_DIFFERENCE = 0.25;
const MIN_QUANTITY_AMOUNT = 1;
const MIN_WEIGHT_AMOUNT = 0.25;
const QUANTITY = "Quantity";
const WEIGHT = "Weight";

export function initiateTheChoosingItemDropDownInOrder(orderType, idOfMakeAnOrderContainer)
{
    emptyElementByID(idOfMakeAnOrderContainer);
    appendHTMLToElement(createEmptyHTMLContainer(ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT),idOfMakeAnOrderContainer);
    appendHTMLToElement(createChooseItemsDropDownListHTML(),ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT);
    appendHTMLToElement(createEmptyHTMLContainer(ID_OF_ITEM_ELEMENT), ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT);
    appendHTMLToElement(createButton(ID_OF_NEXT_BUTTON,"Next"),idOfMakeAnOrderContainer);

    disableElement(ID_OF_NEXT_BUTTON)
    setNextButtonEvent(orderType, idOfMakeAnOrderContainer);
    setChoosingItemFromDropDownListEvent(orderType);
    getItemsListFromServerAndSetTheItemsList(orderType);
}

export function setChoosingItemFromDropDownListEvent(orderType)
{
    $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).change(function () {
        var itemStr = $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).val();
        createItemToChooseElement(itemStr, orderType);
    });
}

export function setNextButtonEvent(orderType, idOfMakeAnOrderContainer)
{
    $('#' + ID_OF_NEXT_BUTTON).click(function () {
        alert('Clicked On next button!');
        if(orderType === STATIC)
        {
            alert('order is static!');
            prepareAndInitiateChoosingDiscountsToApply(idOfMakeAnOrderContainer);
        }
        else if(orderType === DYNAMIC)
        {
            alert('order is dynamic!');
            activateDynamicAlgorithm();
            initiateShowStoresStatusTable(idOfMakeAnOrderContainer);
        }
    });
}

export function appendElementToItemElement(elementToAppend)
{
    elementToAppend.appendTo($("#" + ID_OF_ITEM_ELEMENT));
}

export function setItemEvents(typeToMeasureBy, orderType, serialIDOfItem)
{
    setMinusButtonEvent(typeToMeasureBy);
    setPlusButtonEvent(typeToMeasureBy);
    setAddItemToOrderButtonClickedEvent(orderType,serialIDOfItem);//,typeToMeasureBy);
}

export function createHTMLElementsAndAppendThemToItemElement(itemStr, typeToMeasureBy, orderType)
{
    appendElementToItemElement($(getHTMLOfItemToChooseInOrder(itemStr, orderType)));
    appendElementToItemElement($(getHTMLOfTableOfEnteringAmountOfItem(typeToMeasureBy, orderType)));
    appendElementToItemElement($(getAddItemToOrderButtonHTML()));
}

export function createItemToChooseElement(itemStr, orderType)
{
    var itemJSON = JSON.parse(itemStr);
    var typeToMeasureBy = itemJSON["typeToMeasureBy"];
    var serialIDOfItem = itemJSON["serialNumber"];
    emptyItemElement();
    createHTMLElementsAndAppendThemToItemElement(itemStr, typeToMeasureBy,orderType);
    setItemEvents(typeToMeasureBy,orderType,serialIDOfItem);

}


export function createChooseItemsDropDownListHTML()
{
    var forName = "itemInStore";
    var headline = "Choose item:";
    return createEmptyDropDownListHTML(forName, headline, ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST)
}

export function emptyChooseItemsDropDownList()
{
    $( "#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST ).empty();
}

//The values in here are good
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
        //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)

        var itemStr =JSON.stringify(itemJson);
        console.log("Adding item #" + itemID + ": " + itemName);
       // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        $("<option value='" + itemStr + "'>" + "availableItem serialID: " + itemID + ", available Item Name: '" + itemName + "'</option>").appendTo(chooseItemsDropDownList);
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
    //    alert("in getHTMLOfItemToChooseInOrder and pricePerUnit is:" + availableItemPrice );
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
    return createButton(ID_OF_ADD_ITEM_TO_ORDER, "Add item to order");
}


export function emptyItemElement()
{
    $( "#" + ID_OF_ITEM_ELEMENT ).empty();
}

export function createItemElementHTMLAndAppendToMakeOrderBody()
{
    createEmptyHTMLContainer(ID_OF_ITEM_ELEMENT);
}


//Value in here are not good
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
   // alert("in getHTMLOfTableOfEnteringAmountOfItem and amount is:" + amount );


    return '<table class ="tableOfEnteringAmountOfItem">' +
        '<tr>' +
        '<th id="minus"><button type="button" id=' + ID_OF_MINUS_BUTTON + '>-</button></th>' +
        '<th><p id=' + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN + '>' + amount + '</p></th>' +
        '<th><button type="button" id=' + ID_OF_PLUS_BUTTON + '>+</button></th>' +
        '</tr>' +
        '</table>';
}

export function setAddItemToOrderButtonClickedEvent(orderType, serialIDOfItem)
{
    //   alert("in getItemsListFromServerAndSetTheItemsList: " + orderType);
    $("#" + ID_OF_ADD_ITEM_TO_ORDER).click(function() {
        var amountOfItem =  $('#' + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN).text();
     //   alert("Inside setAddItemToOrderButtonClickedEvent and value are: orderType:"+ orderType + " serialIDOfITem:" + serialIDOfItem + " amountOfItem:" + amountOfItem)
        $.ajax({
            method: 'POST',
            data: {"orderType":orderType, "serialIDOfItem":serialIDOfItem, "amountOfItem":amountOfItem},
            url: ADD_ITEM_TO_ORDER,
            dataType: "json",
            timeout: 4000,
            error: function (e) {
                console.error(e);
                alert('error in  setAddItemToOrderButtonClickedEvent\n' + e);
            },
            success: function (r) {
                if(r.length == 0)
                {
                    disableElement(ID_OF_ADD_ITEM_TO_ORDER);
                }
                enableElement(ID_OF_NEXT_BUTTON); // need to execute just after adding the first item - to fix late
                emptyChooseItemsDropDownList();
                setItemsListInItemDropDownInOrder(r, orderType);
            }
        })
    })
}

export function addSelectedItemToOrder(orderType)
{

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

export function activateDynamicAlgorithm()
{
    $.ajax({
        method: 'POST',
        data: {},
        url: ACTIVATE_DYNAMIC_ALGORITHM_IN_DYNAMIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getItemsListFromServerAndSetTheItemsList\n' + e);
        },
        success: function (r) {
            alert('succeed to activate dynamic algorithm.This is the json of the items added to order:\n' + r);
        }
    })
}