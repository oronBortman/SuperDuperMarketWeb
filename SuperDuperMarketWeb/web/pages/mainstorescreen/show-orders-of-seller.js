import {
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

const GET_STORE_ORDERS_DETAILS_URL = buildUrlWithContextPath("get-store-orders-details");
//ID's of HTML Elements
const ID_OF_STORE_ORDERS_TABLE_BODY = "storeOrdersTableBody";
const ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY = "specificStoreOrderTableBody";
const ID_OF_INFO_ON_ORDER_ID = "infoOnStoreOrderID";

var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;


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
            //alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_STORE_ORDERS_TABLE_BODY);
            setStoreOrdersListInTable(r);
        }
    })
}

export function setStoreOrdersListInTable(storeOrdersList)
{
    $.each(storeOrdersList || [], function(index, storeOrder) {
        console.log("Adding storeOrder #" + index);
        var itemsListInOrder = storeOrder["itemListInOrder"];
        var orderID = storeOrder["serialID"];
        var idOfShowItemsDetailsInStoreOrderButton = "showItemsDetailsInStoreOrderButton" + index;
        appendHTMLToElement(generateRowInStoreOrdersHTMLTable(storeOrder, idOfShowItemsDetailsInStoreOrderButton),ID_OF_STORE_ORDERS_TABLE_BODY);
        setShowItemsInOrderTableButtonEvent(itemsListInOrder, orderID, idOfShowItemsDetailsInStoreOrderButton);
    });
}

export function setShowItemsInOrderTableButtonEvent(itemsList, orderID, idOfButton)
{
    $("#" + idOfButton).click(function() {
        emptyElementByID(ID_OF_SPECIFIC_STORE_ORDER_TABLE_BODY);
        $("#" + ID_OF_INFO_ON_ORDER_ID).text("Order ID:" + orderID);
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