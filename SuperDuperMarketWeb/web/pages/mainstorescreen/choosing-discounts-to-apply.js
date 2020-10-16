
/**
 * Created by oronbortman on 15/10/2020.
 */

import {emptyMakeOrderBody,
    createHTMLContainerAndAppendToMakeOrderBody,
    createEmptyDropDownListHTML,
    appendHTMLToMakeAndOrderBody,
    createButton,
    createNextButtonHTMLAndAppendToMakeOrderBody,
    createEmptyTable,
    appendHTMLToElement} from "./general-make-an-order-functions.js";
import {setNextButtonEvent} from "./choosing-item-drop-down.js";

const APPLY_ONE_OF_DISCOUNT_URL=buildUrlWithContextPath("apply-one-of-discount");
const APPLY_ALL_OR_NOTHING_DISCOUNT_URL = buildUrlWithContextPath("apply-all-or-nothing-discount");
const GET_DISCOUNTS_FROM_SERVER_URL = buildUrlWithContextPath("get-discounts-from-server");
const INITIALIZE_DISCOUNTS_IN_ORDER = buildUrlWithContextPath("initialize-discounts-in-order");
var ID_OF_DISCOUNTS_DROP_DOWN = 'discountsDropDown';
var ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER = 'itemFromDiscountDropDownContainer';
var ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN = 'itemFromDiscountDropDown';
var ID_OF_ADD_AN_ITEM_FROM_DISCOUNT_BUTTON = 'addAnItemFromDiscountButton'
var ID_OF_ADD_DISCOUNT_BUTTON = 'addDiscountButton';
var ID_OF_ADD_ITEM_FROM_DISCOUNT_BUTTON = 'addItemFromDiscountButton';
var ID_OF_TABLE =  'discountsTable';
var ID_OF_TABLE_BODY = 'discountsTableBody';
const ONE_OF = "ONE-OF";
const IRRELEVANT = "IRRELEVANT";
const ALL_OR_NOTHING = "ALL-OR-NOTHING";

export function prepareAndInitiateChoosingDiscountsToApply()
{
    $.ajax({
        method: 'POST',
        data: {},
        url: INITIALIZE_DISCOUNTS_IN_ORDER,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  postToServerTheChosenOneOfDiscount\n' + e);
        },
        success: function (r) {
            alert('initial successfully');
        }
    })
    initiateChoosingDiscountsToApply();

}

export function initiateChoosingDiscountsToApply()
{
    var discountStr = getDiscountJSONFromServer();
    alert("The discountStr is: " + discountStr);
    emptyMakeOrderBody();
    createDiscountTableAndAppendToMakeAnOrderBody(discountStr);
    createDiscountDropDownListAndAppendToMakeAnOrderBody(discountStr);
    setChoosingDiscountFromDropDownListEvent();
    createAddDiscountButtonAndAppendToMakeAnOrderBody();
    setAddDiscountButtonEvent();
    createHTMLContainerAndAppendToMakeOrderBody(ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER);
    createNextButtonHTMLAndAppendToMakeOrderBody();
    setNextButtonEvent();
}

export function createDiscountTableAndAppendToMakeAnOrderBody(discountStr)
{
    var discountsTableHTML = createDiscountsTableHTML(discountStr);
    appendHTMLToMakeAndOrderBody(discountsTableHTML);
}

export function createDiscountDropDownListAndAppendToMakeAnOrderBody(discountStr)
{
    var discountsDropDownListHTML = createEmptyDropDownListHTML(ID_OF_DISCOUNTS_DROP_DOWN, 'Choose a discount', ID_OF_DISCOUNTS_DROP_DOWN);
    appendHTMLToMakeAndOrderBody(discountsDropDownListHTML);
    setDiscountDropDownList(discountStr);
}

export function setDiscountDropDownList(discountStr)
{
    var discountsJSON = JSON.parse(discountStr);
    var discountDropDownList = $("#"+ ID_OF_DISCOUNTS_DROP_DOWN);
    $.each(discountsJSON || [], function(index, discount) {
        var discountName = discount["discountName"]
        alert("Adding discount " + discountName);
        $('<option value=' + discountStr + '>' + discountName + '</option>').appendTo(discountDropDownList);
    });
}
export function createAddDiscountButtonAndAppendToMakeAnOrderBody()
{
    var addDiscountsButton = createButton(ID_OF_ADD_DISCOUNT_BUTTON, "Apply discount");
    appendHTMLToMakeAndOrderBody(addDiscountsButton);
}

export function setAddDiscountButtonEvent()
{
    $("#" + ID_OF_ADD_DISCOUNT_BUTTON).click(function() {
        alert("clicked on add discount button");
        var discountStr = $('#' + ID_OF_DISCOUNTS_DROP_DOWN).val();
        var discountJSON = JSON.parse(discountStr);
        var discountName = discountJSON["discountName"];
        var operator = discountJSON["ifYouBuy"]["operator"];

        if(operator === ONE_OF)
        {
            postToServerTheChosenAllOrNothingDiscount(discountName);
        }
        else if(operator === ALL_OR_NOTHING || operator === IRRELEVANT)
        {
            var offerStr = $("#" + ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN).val();
            var offerJSON = JSON.parse(offerStr);
            var quantity = offerJSON["quantity"];
            var forAdditional = offerJSON["forAdditional"];
            var itemId = offerJSON["itemId"];
            postToServerTheChosenOneOfDiscount(discountName, itemId, quantity,forAdditional);
        }

        initiateChoosingDiscountsToApply();
    });
}

export function postToServerTheChosenOneOfDiscount(discountName, itemSerialIDFromChosenOffer, quantityFromChosenOffer,forAdditionalFromChosenOffer)
{
    var discountsStr= {"discountName":discountName, "itemSerialIDFromChosenOffer":itemSerialIDFromChosenOffer, "quantityFromChosenOffer":quantityFromChosenOffer, "forAdditional": forAdditionalFromChosenOffer};
    $.ajax({
        method: 'POST',
        data: discountsStr,
        url: APPLY_ONE_OF_DISCOUNT_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  postToServerTheChosenOneOfDiscount\n' + e);
        },
        success: function (r) {
            initiateChoosingDiscountsToApply();
        }
    })
    return discountsStr;
}

export function postToServerTheChosenAllOrNothingDiscount(discountName)
{
    var discountsStr= {"discountName":discountName};

    $.ajax({
        method: 'POST',
        data: discountsStr,
        url: APPLY_ALL_OR_NOTHING_DISCOUNT_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  postToServerTheChosenAllOrNothingDiscount\n' + e);
        },
        success: function (r) {
            initiateChoosingDiscountsToApply();
        }
    })
    return discountsStr;
}

export function emptyAddItemContainer() {
    $( "#" + ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER).empty();

}
export function createItemsDropDownListAndAppendToAddItemContainer(discountStr) {
    var itemsFromDiscountDropDownListHTML = createEmptyDropDownListHTML(ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN, 'Choose an item', ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN);
    appendHTMLElementToAddItemContainer(itemsFromDiscountDropDownListHTML);
    setItemsFromDiscountsDropDownList(discountStr);
}

export function appendHTMLElementToAddItemContainer(htmlElement) {
    var itemFromDiscountDropDownListContainer = $("#" + ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER);
    $(htmlElement).appendTo(itemFromDiscountDropDownListContainer);
}

export function setChoosingDiscountFromDropDownListEvent(orderType)
{
    $('#' + ID_OF_DISCOUNTS_DROP_DOWN).change(function () {
        var discountStr = $('#' + ID_OF_DISCOUNTS_DROP_DOWN).val();
        var discountsJSON = JSON.parse(discountStr);
        var operator = discountsJSON["thenYouGet"]["operator"];
        if(operator === ONE_OF)
        {
            createItemsDropDownListAndAppendToAddItemContainer(discountStr);
        }
    });
}

export function setItemsFromDiscountsDropDownList(discountStr)
{
    var discountJSON = JSON.parse(discountStr);
    var offerListJSON = discountJSON["thenYouGet"]["offerList"];
    var offerListStr = JSON.stringify(offerListJSON);

    $.each(offerListJSON || [], function(index, offerJSON) {
        var offerStr = JSON.stringify(offerJSON);
        alert("Adding offer to itemsFromDiscountDropDownList");
        var optionHTML = getOfferMessage(offerStr);
        appendHTMLToElement(optionHTML, ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN);
    });
}

export function getOfferMessage(offerStr)
{
    var offerJSON = JSON.parse(offerStr);
    var quantity = offerJSON["quantity"]
    var forAdditional = offerJSON["forAdditional"]
    var itemName = offerJSON["itemName"]

    return '<option value=' + offerStr + '>' + quantity + ' of ' + itemName + ' for ' + forAdditional + '$</option>';
}

export function getDiscountJSONFromServer()
{
    var discountsStr=null;
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_DISCOUNTS_FROM_SERVER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getDiscountJSONFromServer\n' + e);
        },
        success: function (r) {
            //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)
            discountsStr = JSON.stringify(r);
        }
    })
    return discountsStr;
}

export function createDiscountsTableHTML(discountStr)
{
    createEmptyTable(ID_OF_TABLE, ID_OF_TABLE_BODY);
    var tableBodyElement = $('#' + ID_OF_TABLE_BODY);
    appendHTMLToElement(generateFirstRowInDiscountsHTMLTable(),tableBodyElement);
  //  var discountsStr = getDiscountJSONFromServer();
    var discountsJSON = JSON.parse(discountsStr);
    $.each(discountsJSON || [], function(index, discount) {
        console.log("Adding discount #" + index + ": ");
        var discountStr = JSON.parse(discount);
        appendHTMLToElement(generateRowInDiscountsHTMLTable(discountStr),tableBodyElement);
    });
}

export function generateFirstRowInDiscountsHTMLTable()
{
    return "<tr><th>Details of discount</th>";
}

export function generateRowInDiscountsHTMLTable(discountStr)
{
    return "<tr><th>" + getDiscountMessage(discountStr) + "</th>";
}

export function getDiscountMessage(discountStr)
{
    var discountsJSON = JSON.parse(discountStr);
    var discountName = discountsJSON["discountName"];
    //convert ifYouBuyStr to ifYouBuyJSON
    var quantity = discountsJSON["ifYouBuy"]["quantity"]
    var itemName = discountsJSON["ifYouBuy"]["itemName"]
    var operator = discountsJSON["ifYouBuy"]["operator"]

    var message = "Name of sale: " + discountName + "\n" +
    "Buy: " + quantity + " of " + itemName + "\n" +
    "Get:\n";
    var offerListStr = JSON.stringify(discountsJSON["offerList"]);
    return message.concat(getStringByOperator(offerListStr, operator));
}

export function getStringByOperator(offerListStr, operator)
{
    var allOrNothingOffers = "";
    var offerListJSON = JSON.parse(offerListStr);
    //convert offerListStr to json
    $.each(offerListJSON || [], function(index, offer) {
        if(index !== 0) // if this is not the first offer
        {
            allOrNothingOffers = allOrNothingOffers.concat("         ");
            if(operator === ALL_OR_NOTHING) {
                allOrNothingOffers = allOrNothingOffers.concat("AND\n");
            }
            else if(operator === ONE_OF) {
                allOrNothingOffers = allOrNothingOffers.concat("OR\n");
            }
        }
        allOrNothingOffers = allOrNothingOffers.concat(offer["quantity"]+ " amount of " + offer["itemName"] + " for " + offer["forAdditional"] + "\n");
    });
    return  allOrNothingOffers;
}
