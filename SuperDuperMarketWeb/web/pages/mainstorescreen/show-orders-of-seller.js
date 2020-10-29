import {
    createEmptyTableWithBorder,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

const GET_STORE_ORDERS_DETAILS_URL = buildUrlWithContextPath("get-store-orders-details");
//ID's of HTML Elements
const ID_OF_STORE_ORDERS_TABLE = "storeOrdersTable";
const ID_OF_STORE_ORDERS_TABLE_BODY = "storeOrdersTableBody";
const ID_OF_SPECIFIC_STORE_ORDER_TABLE = "specificStoreOrderTable";
const ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY = "specificStoreOrderTableBody";

var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;

const ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER = "showPrivateOrdersOfSellerContainer";
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
        data: {"zoneName":zoneName},
        url: GET_STORE_ORDERS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_STORE_ORDERS_TABLE_BODY);
           // appendHTMLToElement('<br><br>' + createEmptyTableWithBorder(ID_OF_STORE_ORDERS_TABLE, ID_OF_STORE_ORDERS_TABLE_BODY), ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER);
            //appendHTMLToElement(getSpecificOrderForSellerMessage() + createEmptyTableWithBorder(ID_OF_SPECIFIC_STORE_ORDER_TABLE, ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY), ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER);
            setStoreOrdersListInTable(r);
        }
    })
}
export function getSpecificOrderForSellerMessage()
{
    return "<br><br><p>Details on the items in the store order:</p><br>"
}

//The values in here are good
export function setStoreOrdersListInTable(storeOrdersList)
{
  //  appendHTMLToElement(generateFirstRowInStoreOrdersHTMLTable(),ID_OF_STORE_ORDERS_TABLE_BODY);
    $.each(storeOrdersList || [], function(index, storeOrder) {
        console.log("Adding storeOrder #" + index);
        var itemsListInOrder = storeOrder["itemListInOrder"];
        var idOfShowItemsDetailsInStoreOrderButton = "showItemsDetailsInStoreOrderButton" + index;
        // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        appendHTMLToElement(generateRowInStoreOrdersHTMLTable(storeOrder, idOfShowItemsDetailsInStoreOrderButton),ID_OF_STORE_ORDERS_TABLE_BODY);
        setShowItemsInOrderTableButtonEvent(itemsListInOrder, idOfShowItemsDetailsInStoreOrderButton);
    });
}

/*export function generateFirstRowInStoreOrdersHTMLTable()
{
    return "<tr class='withBorder'><th class='withBorder'>Serial ID</th>" +
        "<th class='withBorder'>Date</th>" +
        "<th class='withBorder'>Customer Name</th>" +
        "<th class='withBorder'>Location Of Customer</th>" +
        "<th class='withBorder'>Total Items In Order</th>" +
        "<th class='withBorder'>Total Items Price In Order</th>" +
        "<th class='withBorder'>Total Delivery Price</th>" +
        "<th class='withBorder'>Show details On Items In Order</th>";
}

export function generateFirstRowInItemsFromStoreOrderHTMLTable()
{
    return "<tr class='withBorder'><th class='withBorder'>Serial ID</th>" +
        "<th class='withBorder'>Name</th>" +
        "<th class='withBorder'>MeasureType</th>" +
        "<th class='withBorder'>Amount</th>" +
        "<th class='withBorder'>Price per unit</th>" +
        "<th class='withBorder'>Total Price</th>" +
        "<th class='withBorder'>Bought on sale</th>";
}*/

export function setShowItemsInOrderTableButtonEvent(itemsList, idOfButton)
{
    $("#" + idOfButton).click(function() {
        emptyElementByID(ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
       // appendHTMLToElement(generateFirstRowInItemsFromStoreOrderHTMLTable(),ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
        $.each(itemsList || [], function(index, itemInOrder) {
            appendHTMLToElement(generateRowInItemsFromStoreOrderHTMLTable(itemInOrder),ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
        });
    });
}

export function generateRowInStoreOrdersHTMLTable(storeOrder, idOfButton)
{
    var serialID = storeOrder["serialID"];
    var date = storeOrder["date"];
    var customerName = storeOrder["customerName"];
    var locationOfCustomer = storeOrder["locationOfCustomer"];
    var totalItemsInOrder = storeOrder["totalItemsInOrder"];
    var totalItemsPriceInOrder = storeOrder["totalItemsPriceInOrder"];
    var totalDeliveryPrice = storeOrder["totalDeliveryPrice"];

    return "<tr class='withBorder'><th class='withBorder'>" + serialID + "</th>" +
        "<th class='withBorder'>" + date + "</th>" +
        "<th class='withBorder'>" + customerName + "</th>" +
        "<th class='withBorder'>" + locationOfCustomer + "</th>" +
        "<th class='withBorder'>" + totalItemsInOrder + "</th>" +
        "<th class='withBorder'>" + totalItemsPriceInOrder + "</th>" +
        "<th class='withBorder'>" + totalDeliveryPrice + "</th>" +
        "<th class='withBorder'>" + createButton(idOfButton, "Show") + "</th>";
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
    return "<tr class='withBorder'><th class='withBorder'>" + serialID + "</th>" +
        "<th class='withBorder'>" + nameOfItem + "</th>" +
        "<th class='withBorder'>" + typeToMeasureBy + "</th>" +
        "<th class='withBorder'>" + AmountOfItemPurchased + "</th>" +
        "<th class='withBorder'>" + pricePerUnit + "</th>" +
        "<th class='withBorder'>" + totalPriceOfItem + "</th>" +
        "<th class='withBorder'>" + FromDiscount + "</th>";
}