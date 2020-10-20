import {createEmptyDropDownListHTML,
    createEmptyTable,
    createEmptyHTMLContainer,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";
import {initiateRateStore} from "./rate-seller.js";

const GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL=buildUrlWithContextPath("get-store-orders-for-order-summery");

//ID's of HTML Elements
const ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_NEXT_BUTTON = "nextButton";
const ID_OF_STORE_ORDERS_TABLE = "storeOrdersTable";
const ID_OF_STORE_ORDERS_TABLE_BODY = "storeOrdersTableBody";
const ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER = "storeOrderStatusContainer";
const ID_OF_CHOOSE_ITEMS_DROP_DOWN_LIST_CONTAINER = "chooseItemsInDropDownListElement";

export function initiateShowingSummeryOfOrder(idOfMakeAnOrderContainer)
{
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            emptyElementByID(idOfMakeAnOrderContainer);
            appendHTMLToElement(createEmptyHTMLContainer(ID_OF_CHOOSE_ITEMS_DROP_DOWN_LIST_CONTAINER), idOfMakeAnOrderContainer)
            appendHTMLToElement(createEmptyDropDownListHTML("storeOrders", "Choose store order:", ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST), idOfMakeAnOrderContainer)
            appendHTMLToElement(createEmptyTable(ID_OF_STORE_ORDERS_TABLE, ID_OF_STORE_ORDERS_TABLE_BODY), idOfMakeAnOrderContainer);
            appendHTMLToElement(createEmptyHTMLContainer(ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER), idOfMakeAnOrderContainer);
            appendHTMLToElement(createButton(ID_OF_NEXT_BUTTON,"Next"),idOfMakeAnOrderContainer);

            setStoreOrdersListInDropDownInOrder(r);
            setNextButtonEvent(idOfMakeAnOrderContainer);
            setChoosingStoreOrderDropDownListEvent();
        }
    })
}

export function setChoosingStoreOrderDropDownListEvent()
{
    $('#' + ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST).change(function () {
        var storeOrderStr = $('#' + ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST).val();
        //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)
        var storeOrderJSON =JSON.parse(storeOrderStr);
        var itemsListJSON = storeOrderJSON["itemsList"];
        buildTableBodyHTMLAndUpdateStoresOrderTable(itemsListJSON);
        setStoreOrderStatusContainer(storeOrderJSON);
    });
}

export function setNextButtonEvent(idOfMakeAnOrderContainer)
{
    $('#' + ID_OF_NEXT_BUTTON).click(function () {
      //  alert('Clicked On next button!');
        initiateRateStore(idOfMakeAnOrderContainer);
    });
}

//The values in here are good
export function setStoreOrdersListInDropDownInOrder(storeOrdersList)
{
    var chooseStoreOrdersDropDownListElement = $("#"+ ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST);
    $.each(storeOrdersList || [], function(index, storeOrder) {
        var storeID = storeOrder["serialNumber"];
        var storeName = storeOrder["name"];
        var itemsList = storeOrder["itemsList"];
        //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)
        var storeOrderStr =JSON.stringify(storeOrder);
        //        $("<option value='" + discountStr + "'>" + discountName + "</option>").appendTo(discountDropDownList);
      //  console.log("Adding storeOrder #" + storeID + ": " + itemsListStr);
   //     alert("Adding store #" + storeName + ": " + storeID + "\n" + itemsListStr);
        $("<option value='" + storeOrderStr + "'>" + "storeID: " + storeID + ", Store Name: '" + storeName + "'</option>").appendTo(chooseStoreOrdersDropDownListElement);
        if(index === 0)
        {
            buildTableBodyHTMLAndUpdateStoresOrderTable(itemsList);
            setStoreOrderStatusContainer(storeOrder);
        }
    });
}

export function setStoreOrderStatusContainer(storeOrder)
{
    emptyElementByID(ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER);
    appendHTMLToElement(createStoreStatusHTML(storeOrder),ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER);
}

export function createStoreStatusHTML(storeOrder)
{
    var storeID = storeOrder["serialNumber"];
    var storeName = storeOrder["name"];
    var PPK = storeOrder["PPK"];
    var distanceToCustomer = storeOrder["distanceToCustomer"];
    var deliveryCost = storeOrder["deliveryCost"];
    var date = storeOrder["date"];

    return '<p>Serial Number: ' + storeID +'</p>' +
        '<p>Store Name: ' + storeName + '</p>' +
        '<p>PPK: ' + PPK + '</p>' +
        '<p>DistanceToCustomer: ' + distanceToCustomer + '</p>' +
        '<p>DeliveryCost: ' + deliveryCost + '</p>' +
        '<p>Date: ' + date + '</p>';
}
/*
0:
serialNumber:1
name: baba store
ownerName:
PPK:
distanceToCustomer:
deliveryCost
date:

itemsList{
    var serialID = itemInOrder["serialID"];
     var itemName = itemInOrder["itemName"];
    var measureType = itemInOrder["measureType"];
    var amount = itemInOrder["amount"];
    var pricePerUnit = itemInOrder["pricePerUnit"];
    var totalPrice = itemInOrder["totalPrice"];
    var boughtOnSale = itemInOrder["boughtOnSale"];
}
*/

export function generateFirstRowInDiscountsHTMLTable()
{
    return "<tr><th>Serial ID</th>" +
        "<th>Name</th>" +
        "<th>MeasureType</th>" +
        "<th>Amount</th>" +
        "<th>Price per unit</th>" +
        "<th>Total Price</th>" +
        "<th>Bought on sale</th>";
}

export function generateRowInDiscountsHTMLTable(itemInOrder)
{
    var serialID = itemInOrder["serialID"];
    var itemName = itemInOrder["itemName"];
    var measureType = itemInOrder["measureType"];
    var amount = itemInOrder["amount"];
    var pricePerUnit = itemInOrder["pricePerUnit"];
    var totalPrice = itemInOrder["totalPrice"];
    var boughtOnSale = itemInOrder["boughtOnSale"];

    return "<tr><th>" + serialID + "</th>" +
        "<th>" + itemName + "</th>" +
        "<th>" + measureType + "</th>" +
        "<th>" + amount + "</th>" +
        "<th>" + pricePerUnit + "</th>" +
        "<th>" + totalPrice + "</th>" +
        "<th>" + boughtOnSale + "</th>";
}

export function buildTableBodyHTMLAndUpdateStoresOrderTable(itemsList)
{
    emptyElementByID(ID_OF_STORE_ORDERS_TABLE_BODY);
    appendHTMLToElement(generateFirstRowInDiscountsHTMLTable(), ID_OF_STORE_ORDERS_TABLE_BODY);
    $.each(itemsList || [], function(index, itemInOrder) {
        appendHTMLToElement(generateRowInDiscountsHTMLTable(itemInOrder), ID_OF_STORE_ORDERS_TABLE_BODY);
    });
}
