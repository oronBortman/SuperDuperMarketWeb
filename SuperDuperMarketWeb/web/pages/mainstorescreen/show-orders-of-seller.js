import {
    createEmptyTable,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-make-an-order-functions.js";

const GET_STORE_ORDERS_DETAILS_URL = buildUrlWithContextPath("get-store-orders-details");
//ID's of HTML Elements
const ID_OF_STORE_ORDERS_TABLE = "storeOrdersTable";
const ID_OF_STORE_ORDERS_TABLE_BODY = "storeOrdersTableBody";
const ID_OF_SPECIFIC_STORE_ORDER_TABLE = "specificStoreOrderTable";
const ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY = "specificStoreOrderTableBody";

const ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER = "showOrdersInSellerStoresContainer";
/*
storeOrder["serialID"]
storeOrder["date"];
storeOrder["customerName"];
storeOrder["locationOfCustomer"]
storeOrder["totalItemsInOrder"]
storeOrder["totalItemsPriceInOrder"]
storeOrder["totalDeliveryPrice"]
storeOrder["itemListInOrder"]


itemInOrder["serialID"]
itemInOrder["nameOfItem"]
itemInOrder["typeToMeasureBy"]
itemInOrder["AmountOfItemPurchased"]
itemInOrder["pricePerUnit"]
itemInOrder["totalPriceOfItem"]
itemInOrder["FromDiscount"]
*/

export function initiateShowOrdersOfSellerStoresInCertainZone()
{
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_STORE_ORDERS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_STORE_ORDERS_TABLE);
            appendHTMLToElement(createEmptyTable(ID_OF_STORE_ORDERS_TABLE, ID_OF_STORE_ORDERS_TABLE_BODY), ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER);
            appendHTMLToElement(createEmptyTable(ID_OF_SPECIFIC_STORE_ORDER_TABLE, ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY), ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER);
            setStoreOrdersListInTable(r);
        }
    })
}


//The values in here are good
export function setStoreOrdersListInTable(storeOrdersList)
{
    appendHTMLToElement(generateFirstRowInStoreOrdersHTMLTable(),ID_OF_STORE_ORDERS_TABLE_BODY);
    $.each(storeOrdersList || [], function(index, storeOrder) {
        console.log("Adding storeOrder #" + index);
        var itemsListInOrder = storeOrder["itemsListInOrder"];
        var idOfShowItemsDetailsInStoreOrderButton = "showItemsDetailsInStoreOrderButton" + index;
        // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        appendHTMLToElement(generateRowInStoreOrdersHTMLTable(storeOrder, index),ID_OF_STORE_ORDERS_TABLE_BODY);
        setShowItemsInOrderTableButtonEvent(itemsListInOrder, idOfShowItemsDetailsInStoreOrderButton);
    });
}

export function generateFirstRowInStoreOrdersHTMLTable()
{
    return "<tr><th>Serial ID</th>" +
        "<th>Date</th>" +
        "<th>Customer Name</th>" +
        "<th>Location Of Customer</th>" +
        "<th>Total Items In Order</th>" +
        "<th>Total Items Price In Order</th>" +
        "<th>Total Delivery Price</th>" +
        "<th>Show details On Items In Order</th>";
}

export function generateFirstRowInItemsFromStoreOrderHTMLTable()
{
    return "<tr><th>Serial ID</th>" +
        "<th>Name</th>" +
        "<th>MeasureType</th>" +
        "<th>Amount</th>" +
        "<th>Price per unit</th>" +
        "<th>Total Price</th>" +
        "<th>Bought on sale</th>";
}

export function setShowItemsInOrderTableButtonEvent(itemsList, idOfButton)
{
    $("#" + idOfButton).click(function() {
        emptyElementByID(ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
        appendHTMLToElement(generateFirstRowInItemsFromStoreOrderHTMLTable(),ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
        $.each(itemsList || [], function(index, itemInOrder) {
            appendHTMLToElement(generateRowInItemsFromStoreOrderHTMLTable(itemInOrder),ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
        });
    });
}

export function generateRowInStoreOrdersHTMLTable(storeOrder, idOfButton)
{
    var serialID = storeOrder["serialID"];
    var date = storeOrder["date"];;
    var customerName = storeOrder["customerName"];
    var locationOfCustomer = storeOrder["locationOfCustomer"];
    var totalItemsInOrder = storeOrder["totalItemsInOrder"];
    var totalItemsPriceInOrder = storeOrder["totalItemsPriceInOrder"];
    var totalDeliveryPrice = storeOrder["totalDeliveryPrice"];

    return "<tr><th>" + serialID + "</th>" +
        "<th>" + date + "</th>" +
        "<th>" + customerName + "</th>" +
        "<th>" + locationOfCustomer + "</th>" +
        "<th>" + totalItemsInOrder + "</th>" +
        "<th>" + totalItemsPriceInOrder + "</th>" +
        "<th>" + totalDeliveryPrice + "</th>" +
        "<th>" + createButton(idOfButton, "Show") + "</th>";
}

export function generateRowInItemsFromStoreOrderHTMLTable(itemInOrder)
{
    var serialID = itemInOrder["serialID"]
    var nameOfItem = itemInOrder["nameOfItem"]
    var typeToMeasureBy = itemInOrder["typeToMeasureBy"]
    var AmountOfItemPurchased = itemInOrder["AmountOfItemPurchased"]
    var pricePerUnit = itemInOrder["pricePerUnit"]
    var totalPriceOfItem = itemInOrder["totalPriceOfItem"]
    var FromDiscount = itemInOrder["FromDiscount"]

    return "<tr><th>" + serialID + "</th>" +
        "<th>" + nameOfItem + "</th>" +
        "<th>" + typeToMeasureBy + "</th>" +
        "<th>" + AmountOfItemPurchased + "</th>" +
        "<th>" + pricePerUnit + "</th>" +
        "<th>" + totalPriceOfItem + "</th>" +
        "<th>" + FromDiscount + "</th>";
}