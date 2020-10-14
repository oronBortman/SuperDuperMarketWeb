import {emptyMakeOrderBody} from "./general-make-an-order-functions.js";

var ID_OF_MINUS_BUTTON = "minusButton";
var ID_OF_PLUS_BUTTON = "plusButton";
var ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN = 'valueOfAmountOfItemChosen';
var ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
export function initiateChoosingItemDropDownHTMLInOrder()
{
    var makeOrderBody = $("#" + ID_OF_MAKE_ORDER_BODY);
    emptyMakeOrderBody();
    console.log("In function initiateChoosingItemDropDownHTMLInOrder()\n")
    var chooseItemsDropDownList = '<div id="chooseItemsInDropDownListElement"></div>';
    $(chooseItemsDropDownList).appendTo(makeOrderBody);
}


export function getHTMLOfTableOfEnteringAmountOfItem()
{
    return '<table class ="tableOfEnteringAmountOfItem">' +
        '<tr>' +
        '<th id="minus"><button type="button" id=' + ID_OF_MINUS_BUTTON + '>-</button></th>' +
        '<th><p id=' + ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN + '></p></th>' +
        '<th><button type="button" id=' + ID_OF_PLUS_BUTTON + '>+</button></th>' +
        '</tr>' +
        '</table>';
}


export function setItemToChooseInOrder(item, typeOfOrder)
{
    var serialIDOfItem = 1;
    var nameOfItem = "banana";
    var typeToMeasureBy = "Quantity"
    //Quantity("Quantity"),
    //  Weight("Weight");
    var tableOfItemFormHTML;

    if(typeOfOrder === "static")
    {

    }
    if(typeOfOrder === "dynamic")
    {

    }
    var tableOfEnteringAmountOfItemHTML= getHTMLOfTableOfEnteringAmountOfItem();

    var itemToChooseElementHTML = '<div class="square">' + tableOfItemFormHTML + tableOfEnteringAmountOfItemHTML + '</div>';

    setMinusButton(typeToMeasureBy);
    setPlusButton(typeToMeasureBy);
}

//TODO
export function setMinusButton(typeToMeasureBy, idOfValueOfAmountOfItemChosen)
{
    ID_OF_MINUS_BUTTON
    ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN
    if(typeToMeasureBy === "Quantity")
    {

    }
    else if(typeToMeasureBy === "Weight")
    {

    }
}

//TODO
export function setPlusButton(typeToMeasureBy, idOfValueOfAmountOfItemChosen)
{
    ID_OF_PLUS_BUTTON
    ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN
    if(typeToMeasureBy === "Quantity")
    {

    }
    else if(typeToMeasureBy === "Weight")
    {

    }
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
