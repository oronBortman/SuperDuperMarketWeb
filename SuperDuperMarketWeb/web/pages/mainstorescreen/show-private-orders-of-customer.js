import {
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

const GET_CUSTOMER_ORDERS_DETAILS_URL = buildUrlWithContextPath("get-customer-orders-details");
//ID's of HTML Elements
const ID_OF_CUSTOMER_ORDERS_TABLE_BODY = "customerOrdersTableBody";
const ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY = "specificCustomerOrderTableBody";
const ID_OF_INFO_ON_ORDER_ID = "infoOnCustomerOrderID";

export function initiateShowPrivateOrdersOfCustomer() {

    $.ajax({
        method: 'GET',
        data: {},
        url: GET_CUSTOMER_ORDERS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
           // alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
            setCustomerOrdersListInTable(r);
        }
    })
}

export function setCustomerOrdersListInTable(customerOrdersList)
{
    $.each(customerOrdersList || [], function(index, customerOrder) {
        console.log("Adding storeOrder #" + index);
        var orderID = customerOrder["serialID"]
        var itemsListInOrder = customerOrder["itemsListInOrder"];
        var idOfShowItemsDetailsInStoreOrderButton = "showItemsDetailsInStoreOrderButton" + index;
        appendHTMLToElement(generateRowInCustomerOrdersHTMLTable(customerOrder, idOfShowItemsDetailsInStoreOrderButton),ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
        setShowItemsInOrderTableButtonEvent(itemsListInOrder, orderID, idOfShowItemsDetailsInStoreOrderButton);
    });
}

export function setShowItemsInOrderTableButtonEvent(itemsList, orderID, idOfButton)
{
    $("#" + idOfButton).click(function() {
        emptyElementByID(ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
        $("#" + ID_OF_INFO_ON_ORDER_ID).text("Order ID:" + orderID);
        $.each(itemsList || [], function(index, itemInOrder) {
            appendHTMLToElement(generateRowInItemsFromStoreOrderHTMLTable(itemInOrder),ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
        });
    });
}

export function generateRowInCustomerOrdersHTMLTable(customerOrder, idOfButton)
{
    var serialID = customerOrder["serialID"];
    var date = customerOrder["date"];
    var location = customerOrder["location"];
    var totalStores = customerOrder["totalStores"];
    var totalItemsInOrder = customerOrder["totalItemsInOrder"];
    var totalItemsPriceInOrder = customerOrder["totalItemsPriceInOrder"];
    var totalDeliveryPrice = customerOrder["totalDeliveryPrice"];
    var totalOrderPrice = customerOrder["totalOrderPrice"];

    return "<tr class='withBorder'><th class='withBorder'>" + serialID + "</th>" +
        "<th class='withBorder'>" + date + "</th>" +
        "<th class='withBorder'>" + location + "</th>" +
        "<th class='withBorder'>" + totalStores + "</th>" +
        "<th class='withBorder'>" + totalItemsInOrder + "</th>" +
        "<th class='withBorder'>" + totalItemsPriceInOrder + "</th>" +
        "<th class='withBorder'>" + totalDeliveryPrice + "</th>" +
        "<th class='withBorder'>" + totalOrderPrice + "</th>" +
        "<th class='withBorder'>" + createButton(idOfButton, "Show") + "</th>";
}



export function generateRowInItemsFromStoreOrderHTMLTable(itemInOrder)
{
    var serialID = itemInOrder["serialID"];
    var nameOfItem = itemInOrder["nameOfItem"];
    var typeToMeasureBy = itemInOrder["typeToMeasureBy"];
    var AmountOfItemPurchased = itemInOrder["AmountOfItemPurchased"];
    var storeSerialID = itemInOrder["storeID"]
    var storeName = itemInOrder["storeName"]

    var pricePerUnit = itemInOrder["pricePerUnit"];
    var totalPriceOfItem = itemInOrder["totalPriceOfItem"];
    var FromDiscount = itemInOrder["FromDiscount"];

    return "<tr class='withBorder'><th class='withBorder'>" + serialID + "</th>" +
        "<th class='withBorder'>" + nameOfItem + "</th>" +
        "<th class='withBorder'>" + typeToMeasureBy + "</th>" +
        "<th class='withBorder'>" + storeSerialID + "</th>" +
        "<th class='withBorder'>" + storeName + "</th>" +
        "<th class='withBorder'>" + AmountOfItemPurchased + "</th>" +
        "<th class='withBorder'>" + pricePerUnit + "</th>" +
        "<th class='withBorder'>" + totalPriceOfItem + "</th>" +
        "<th class='withBorder'>" + FromDiscount + "</th>";
}