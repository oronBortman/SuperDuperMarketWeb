import {
    emptyMakeOrderBody,
    createEmptyDropDownListHTML,
    createEmptyTable,
    appendHTMLToMakeAndOrderBody,
    createEmptyHTMLContainer,
    createNextButtonHTMLAndAppendToMakeOrderBody, appendHTMLToElement, emptyElementByID
} from "./general-functions.js";
import {initiateRateStore} from "./rate-seller.js";

const GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL=buildUrlWithContextPath("get-store-orders-for-order-summery");

//ID's of HTML Elements
const ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
const ID_OF_NEXT_BUTTON = "nextButton";
const ID_OF_STORE_ORDERS_TABLE = "storeOrdersTable";
const ID_OF_STORE_ORDERS_TABLE_BODY = "storeOrdersTableBody";
const ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER = "storeOrderStatusContainer";

export function initiateShowingSummeryOfOrder(orderType)
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
            initiateChoosingStoreOrderDropDownHTMLInOrder();
            appendHTMLToMakeAndOrderBody(createEmptyDropDownListHTML("storeOrders", "Choose store order:", ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST));
            appendHTMLToMakeAndOrderBody(createEmptyTable(ID_OF_STORE_ORDERS_TABLE, ID_OF_STORE_ORDERS_TABLE_BODY));
            appendHTMLToMakeAndOrderBody(createEmptyHTMLContainer(ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER));
            createNextButtonHTMLAndAppendToMakeOrderBody(ID_OF_NEXT_BUTTON);
            setNextButtonEvent();
            setChoosingStoreOrderDropDownListEvent();
            setStoreOrdersListInDropDownInOrder(r);
        }
    })
}

export function initiateChoosingStoreOrderDropDownHTMLInOrder()
{
    var makeOrderBody = $("#" + ID_OF_MAKE_ORDER_BODY);
    emptyMakeOrderBody();
    console.log("In function initiateChoosingItemDropDownHTMLInOrder()\n")
    var chooseItemsDropDownList = '<div id="chooseItemsInDropDownListElement"></div>';
    $(chooseItemsDropDownList).appendTo(makeOrderBody);
}

export function setChoosingStoreOrderDropDownListEvent()
{
    $('#' + ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST).change(function () {
        var itemListStr = $('#' + ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST).val();
        var itemListJSON = JSON.parse(itemListStr);
        buildTableBodyHTMLAndUpdateStoresOrderTable(itemListJSON);
    });
}

export function setNextButtonEvent()
{
    $('#' + ID_OF_NEXT_BUTTON).click(function () {
        alert('Clicked On next button!');
        initiateRateStore();
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
        var itemsListStr =JSON.stringify(itemsList);
        console.log("Adding storeOrder #" + storeID + ": " + storeName);
       // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        $('<option value=' + itemsListStr + '>' + 'storeID: ' + storeID + ', Store Name: ' + storeName + '</option>').appendTo(chooseStoreOrdersDropDownListElement);
        if(index === 0)
        {
            buildTableBodyHTMLAndUpdateStoresOrderTable(itemsList);
            setStoreOrderStatusContainer(storeOrder);
        }
    });
}

export function setStoreOrderStatusContainer()
{
    emptyElementByID(ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER);
    appendHTMLToElement(createStoreStatusHTML(),ID_OF_SHOW_STORE_ORDER_STATUS_CONTAINER);
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

export function emptyTableBody()
{
    $( "#makeOrderBody" ).empty();
}

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
    appendHTMLToElement(generateFirstRowInDiscountsHTMLTable(), ID_OF_STORE_ORDERS_TABLE_BODY);
    $.each(itemsList || [], function(index, itemInOrder) {
        emptyTableBody();
        generateRowInDiscountsHTMLTable(itemInOrder);
    });
}
