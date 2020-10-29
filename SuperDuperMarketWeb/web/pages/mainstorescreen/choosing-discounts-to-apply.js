
/**
 * Created by oronbortman on 15/10/2020.
 */

import {
    createEmptyHTMLContainer,
    createEmptyDropDownListHTML,
    createButton,
    emptyElementByID,
    createEmptyTableWithBorder,
    appendHTMLToElement, disableElement
} from "./general-functions.js";

import {initiateShowingSummeryOfOrder} from "./show-summery-of-order.js";

const APPLY_ONE_OF_DISCOUNT_URL=buildUrlWithContextPath("apply-one-of-discount");
const APPLY_ALL_OR_NOTHING_DISCOUNT_URL = buildUrlWithContextPath("apply-all-or-nothing-discount");
const GET_DISCOUNTS_FROM_SERVER_URL = buildUrlWithContextPath("get-discounts-from-server");
const INITIALIZE_DISCOUNTS_IN_ORDER = buildUrlWithContextPath("initialize-discounts-in-order");
const ID_OF_DISCOUNTS_DROP_DOWN = 'discountsDropDown';
const ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER = 'itemFromDiscountDropDownContainer';
const ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN = 'itemFromDiscountDropDown';
const ID_OF_ADD_DISCOUNT_BUTTON = 'addDiscountButton';
const ID_OF_TABLE =  'discountsTable';
const ID_OF_TABLE_BODY = 'discountsTableBody';
const ID_OF_NEXT_BUTTON = 'nextButton';
const ONE_OF = "ONE-OF";
const IRRELEVANT = "IRRELEVANT";
const ALL_OR_NOTHING = "ALL-OR-NOTHING";

export function prepareAndInitiateChoosingDiscountsToApply(idOfMakeAnOrderContainer)
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
           // alert('initial successfully');
            initiateChoosingDiscountsToApply(idOfMakeAnOrderContainer);
        }
    })

}

export function initiateChoosingDiscountsToApply(idOfMakeAnOrderContainer)
{
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_DISCOUNTS_FROM_SERVER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getDiscountJSONFromServer\n' + e);
            return("error");
        },
        success: function (r) {
           // alert('in initiateChoosingDiscountsToApply');
            //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)
            emptyElementByID(idOfMakeAnOrderContainer);
            appendHTMLToElement(createEmptyTableWithBorder(ID_OF_TABLE, ID_OF_TABLE_BODY), idOfMakeAnOrderContainer);
            appendHTMLToElement(createEmptyDropDownListHTML(ID_OF_DISCOUNTS_DROP_DOWN, 'Choose a discount', ID_OF_DISCOUNTS_DROP_DOWN), idOfMakeAnOrderContainer);
            appendHTMLToElement(createEmptyHTMLContainer(ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER), idOfMakeAnOrderContainer);
            appendHTMLToElement(createButton(ID_OF_ADD_DISCOUNT_BUTTON, "Apply discount"), idOfMakeAnOrderContainer);
            appendHTMLToElement('<br><br>',idOfMakeAnOrderContainer);
            appendHTMLToElement(createButton(ID_OF_NEXT_BUTTON,"Next"),idOfMakeAnOrderContainer);

            setDiscountTable(r);
            setDiscountDropDownList(r);
            setChoosingDiscountFromDropDownListEvent();

            if(r.length === 0)
            {
                disableElement(ID_OF_ADD_DISCOUNT_BUTTON);
            }
            else
            {
                setAddDiscountButtonEvent(idOfMakeAnOrderContainer);
            }
            setNextButtonEvent(idOfMakeAnOrderContainer);
        }
    })

}

export function setNextButtonEvent(idOfMakeAnOrderContainer)
{
    $("#" + ID_OF_NEXT_BUTTON).click(function() {
        initiateShowingSummeryOfOrder(idOfMakeAnOrderContainer);
    });
}

export function setDiscountTable(discountsJSON)
{
    //alert("in createDiscountTableAndAppendToMakeAnOrderBody and discountsJSON is: \n "+JSON.stringify(discountsJSON));
    appendHTMLToElement(generateFirstRowInDiscountsHTMLTable(),ID_OF_TABLE_BODY);
    //  var discountsStr = getDiscountJSONFromServer();
    // var discountsJSON = JSON.parse(discountsStr);
   // alert("In createDiscountsTableHTML, and discounts are: " + JSON.stringify(discountsJSON));
    $.each(discountsJSON || [], function(index, discountJSON) {
        console.log("Adding discount #" + index + ": ");
      //  alert("Adding discount #" + index + ": ");
        // var discountStr = JSON.parse(discount);
        appendHTMLToElement(generateRowInDiscountsHTMLTable(discountJSON),ID_OF_TABLE_BODY);
    });
}

export function setDiscountDropDownList(discountsJSON)
{
    //  var discountsJSON = JSON.parse(discountStr);
   // alert("in setDiscountDropDownList" + JSON.stringify(discountsJSON))
    var discountDropDownList = $("#"+ ID_OF_DISCOUNTS_DROP_DOWN);
    var firstOperatorOneOF = true;
    $.each(discountsJSON || [], function(index, discountJSON) {
        var discountName = discountJSON["discountName"]
        var operator = discountJSON["thenYouGet"]["operator"];
        var discountStr = JSON.stringify(discountJSON);
      //  alert("added discount to dropDownList and this is the json:\n" + discountStr);
      //  alert("Adding discount " + discountName + " and the discountStr is: " + discountStr);
        $("<option value='" + discountStr + "'>" + discountName + "</option>").appendTo(discountDropDownList);
        if(operator === ONE_OF && firstOperatorOneOF === true)
        {
           // alert("first discount with operator ONE_OF");
            emptyAddItemContainer();
           // alert("The first value of ONE_OF and and discountsJSON is: " + JSON.stringify(discountJSON));
            createItemsDropDownListAndAppendToAddItemContainer(discountJSON);
            firstOperatorOneOF=false;


        }
    });
}
export function createAddDiscountButtonAndAppendToMakeAnOrderBody()
{

}

export function setAddDiscountButtonEvent(idOfMakeAnOrderContainer)
{
    $("#" + ID_OF_ADD_DISCOUNT_BUTTON).click(function() {
     //   alert("clicked on add discount button");
        var discountStr = $('#' + ID_OF_DISCOUNTS_DROP_DOWN).val();
        var discountJSON = JSON.parse(discountStr);
        var discountName = discountJSON["discountName"];
        var operator = discountJSON["thenYouGet"]["operator"];
        alert('clicked on setAddDiscountButtonEvent' + discountStr);
        if(operator === ONE_OF)
        {
            var offerStr = $("#" + ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN).val();
            var offerJSON = JSON.parse(offerStr);
            var quantity = offerJSON["quantity"];
            var forAdditional = offerJSON["forAdditional"];
            var itemId = offerJSON["itemId"];
            postToServerTheChosenOneOfDiscount(discountName, itemId, quantity,forAdditional, idOfMakeAnOrderContainer);
        }
        else if(operator === ALL_OR_NOTHING || operator === IRRELEVANT)
        {
            postToServerTheChosenAllOrNothingDiscount(discountName, idOfMakeAnOrderContainer);
        }
     //   alert("non of the operator! " + discountName  + " " + operator);
    });
}

export function postToServerTheChosenOneOfDiscount(discountName, itemSerialIDFromChosenOffer, quantityFromChosenOffer,forAdditionalFromChosenOffer, idOfMakeAnOrderContainer)
{
  //  alert('in postToServerTheChosenOneOfDiscount');
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
            initiateChoosingDiscountsToApply(idOfMakeAnOrderContainer);
        }
    })
}

export function postToServerTheChosenAllOrNothingDiscount(discountName, idOfMakeAnOrderContainer)
{
  //  alert('in postToServerTheChosenAllOrNothingDiscount');
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
            initiateChoosingDiscountsToApply(idOfMakeAnOrderContainer);
        }
    })
}

export function emptyAddItemContainer() {
    $( "#" + ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER).empty();
   // alert("in emptyAddItemContainer")

}
//good
export function createItemsDropDownListAndAppendToAddItemContainer(discountJSON) {
    var itemsFromDiscountDropDownListHTML = createEmptyDropDownListHTML('itemFromDiscount', 'Choose an item', ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN);
    //alert("The itemsFromDiscountDropDownListHTML is: \n" + itemsFromDiscountDropDownListHTML);
  //  alert("inside createItemsDropDownListAndAppendToAddItemContainer and discountsJSON is: \n" + JSON.stringify(discountJSON));

    appendHTMLElementToAddItemContainer(itemsFromDiscountDropDownListHTML); //good
   // alert("1");
    setItemsFromDiscountsDropDownList(discountJSON);
  //  alert("2");
}

export function appendHTMLElementToAddItemContainer(htmlElement) {
    var itemFromDiscountDropDownListContainer = $("#" + ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN_CONTAINER);
    $(htmlElement).appendTo(itemFromDiscountDropDownListContainer);
}

export function setChoosingDiscountFromDropDownListEvent()
{
    $('#' + ID_OF_DISCOUNTS_DROP_DOWN).change(function () {
        var discountStr = $('#' + ID_OF_DISCOUNTS_DROP_DOWN).val();
       // alert("discountStr is:" + discountStr);
        var discountJSON = JSON.parse(discountStr);
        var operator = discountJSON["thenYouGet"]["operator"];
        if(operator === ONE_OF)
        {
          //  alert("Discount has been chosen!");
            emptyAddItemContainer();
            createItemsDropDownListAndAppendToAddItemContainer(discountJSON);
        }
        else
        {
            emptyAddItemContainer();
        }
    });
}

export function setItemsFromDiscountsDropDownList(discountJSON)
{
//
  //  alert("in setItemsFromDiscountsDropDownList and discountJSON is: " + JSON.stringify(discountJSON));
    //  var discountJSON = JSON.parse(discountStr);
    var name = discountJSON["discountName"];
    var ifYouBuy = discountJSON["ifYouBuy"];
    var ifYouBuy = discountJSON["thenYouGet"];
    var offerListJSON = discountJSON["thenYouGet"]["offerList"];
 //   alert("in setItemsFromDiscountsDropDownList and offerListJSON:\n" + JSON.stringify(offerListJSON));
    //var offerListStr = JSON.stringify(offerListJSON);

    $.each(offerListJSON || [], function(index, offerJSON) {
        //  var offerStr = JSON.stringify(offerJSON);
    //    alert("Adding offer to itemsFromDiscountDropDownList" + offerJSON);
        var optionHTML = getOfferMessage(offerJSON);
      //  alert("optionHTML: " + optionHTML);
        appendHTMLToElement(optionHTML, ID_OF_ITEM_FROM_DISCOUNT_DROP_DOWN);
    });
}

export function getOfferMessage(offerJSON)
{
    var offerStr = JSON.stringify(offerJSON);
    var quantity = offerJSON["quantity"]
    var forAdditional = offerJSON["forAdditional"]
    var itemName = offerJSON["itemName"]

    return '<option value=' + offerStr + '>' + quantity + ' of ' + itemName + ' for ' + forAdditional + '$</option>';
}

export function getDiscountJSONFromServer()
{
    // var discountsStr=null;

    //return discountsStr;
}

export function createDiscountsTableHTML(discountsJSON)
{

}

export function generateFirstRowInDiscountsHTMLTable()
{
    return "<tr><th>Details of discount</th>";
}

export function generateRowInDiscountsHTMLTable(discountJSON)
{
    return "<tr><th>" + getDiscountMessage(discountJSON) + "</th>";
}

export function getDiscountMessage(discountJSON)
{
    // var discountsJSON = JSON.parse(discountStr);
    var discountName = discountJSON["discountName"];
    //convert ifYouBuyStr to ifYouBuyJSON
    var quantity = discountJSON["ifYouBuy"]["quantity"];
    var itemName = discountJSON["ifYouBuy"]["itemName"];
    var operator = discountJSON["thenYouGet"]["operator"];

    var message = '<table class="tableWithBorder"' +
        "<tr><th>Name of sale: " + discountName + "</th></tr>" +
        "<tr><th>Buy: " + quantity + " of " + itemName + "</th></th>" +
        "<tr><th> Get:"

        "Get:\n";
    var offerListJSON = discountJSON["thenYouGet"]["offerList"];
    //  var offerListStr = JSON.stringify(discountsJSON["offerList"]);
    var newMessage =  message.concat(getStringByOperator(offerListJSON, operator));
   // alert("newMessage: " + newMessage);
    return newMessage + '</th></tr></table>';
}

export function getStringByOperator(offerListJSON, operator)
{
    var allOrNothingOffers = "";
    //  var offerListJSON = JSON.parse(offerListStr);
    //convert offerListStr to json
   // alert("offerListJSON: " + offerListJSON);
    $.each(offerListJSON || [], function(index, offer) {
        if(index !== 0) // if this is not the first offer
        {
          //  allOrNothingOffers = allOrNothingOffers.concat(" ");
            if(operator === ALL_OR_NOTHING || operator === IRRELEVANT) {
                allOrNothingOffers = allOrNothingOffers.concat(" AND" );
            }
            else if(operator === ONE_OF) {
                allOrNothingOffers = allOrNothingOffers.concat(" OR ");
            }
        }
        allOrNothingOffers = allOrNothingOffers.concat(offer["quantity"]+ " amount of " + offer["itemName"] + " for additional " + offer["forAdditional"] + "$");
       // alert("allOrNothingOffer: " + allOrNothingOffers);
    });
    return  allOrNothingOffers;
}
