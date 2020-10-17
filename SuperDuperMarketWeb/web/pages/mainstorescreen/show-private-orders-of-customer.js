import {
    createEmptyTable,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-make-an-order-functions.js";

const GET_CUSTOMER_ORDERS_DETAILS_URL = buildUrlWithContextPath("get-customer-orders-details");
//ID's of HTML Elements
const ID_OF_CUSTOMER_ORDERS_TABLE = "customerOrdersTable";
const ID_OF_CUSTOMER_ORDERS_TABLE_BODY = "customerOrdersTableBody";
const ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE = "specificCustomerOrderTable";
const ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY = "specificCustomerOrderTableBody";
const ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER = "showPrivateOrdersOfSellerContainer";

export function initiateShowPrivateOrdersOfCustomer() {

    /*
    customerOrder["serialID"]
    customerOrder["date"];
    customerOrder["location"]
    customerOrder["totalStores"]
    customerOrder["totalItemsInOrder"]
    customerOrder["totalItemsPriceInOrder"]
    customerOrder["totalDeliveryPrice"]
    customerOrder["totalOrderPrice"]
    customerOrder["itemsListInOrder"]
    */
    /*
    itemInOrder["serialID"]
    itemInOrder["nameOfItem"]
    itemInOrder["storeSerialID"]
    itemInOrder["storeName"]
    itemInOrder["AmountOfItemPurchased"]
    itemInOrder["totalPriceOfItem"]
    itemInOrder["FromDiscount"]

     */


    $.ajax({
        method: 'GET',
        data: {},
        url: GET_CUSTOMER_ORDERS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_CUSTOMER_ORDERS_TABLE);
            appendHTMLToElement(createEmptyTable(ID_OF_CUSTOMER_ORDERS_TABLE, ID_OF_CUSTOMER_ORDERS_TABLE_BODY), ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER);
            appendHTMLToElement(createEmptyTable(ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE, ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY), ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER);
            setCustomerOrdersListInTable(r);
        }
    })
}


//The values in here are good
export function setCustomerOrdersListInTable(customerOrdersList)
{
    appendHTMLToElement(generateFirstRowInCustomerOrdersHTMLTable(),ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
    $.each(customerOrdersList || [], function(index, customerOrder) {
        console.log("Adding storeOrder #" + index);
        var itemsListInOrder = customerOrder["itemsListInOrder"];
        var idOfShowItemsDetailsInStoreOrderButton = "showItemsDetailsInStoreOrderButton" + index;
        // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        appendHTMLToElement(generateRowInCustomerOrdersHTMLTable(customerOrder, index),ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
        setShowItemsInOrderTableButtonEvent(itemsListInOrder, idOfShowItemsDetailsInStoreOrderButton);
    });
}

export function generateFirstRowInCustomerOrdersHTMLTable()
{
    return "<tr><th>Serial ID</th>" +
        "<th>date</th>" +
        "<th>Location</th>" +
        "<th>Total Stores</th>" +
        "<th>Total Items In Order</th>" +
        "<th>Total Items Price In Order</th>" +
        "<th>Total Delivery Price</th>" +
        "<th>Total Order Price</th>" +
        "<th>Show details On Items In Order</th>";
}

export function generateFirstRowInItemsFromStoreOrderHTMLTable() {
    return "<tr><th>Serial ID</th>" +
        "<th>Name</th>" +
        "<th>Measure Type</th>" +
        "<th>Store serialID</th>" +
        "<th>Store Name</th>" +
        "<th>Amount</th>" +
        "<th>Price per unit</th>" +
        "<th>Total Price</th>" +
        "<th>Bought on sale</th>";
}

export function setShowItemsInOrderTableButtonEvent(itemsList, idOfButton)
{
    $("#" + idOfButton).click(function() {
        emptyElementByID(ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
        appendHTMLToElement(generateFirstRowInItemsFromStoreOrderHTMLTable(),ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
        $.each(itemsList || [], function(index, itemInOrder) {
            appendHTMLToElement(generateRowInItemsFromStoreOrderHTMLTable(itemInOrder),ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
        });
    });
}

export function generateRowInCustomerOrdersHTMLTable(customerOrder, idOfButton)
{
    var serialID = customerOrder["serialID"];
    var date = customerOrder["date"];;
    var location = customerOrder["location"];
    var totalStores = customerOrder["totalStores"];
    var totalItemsInOrder = customerOrder["totalItemsInOrder"];
    var totalItemsPriceInOrder = customerOrder["totalItemsPriceInOrder"];
    var totalDeliveryPrice = customerOrder["totalDeliveryPrice"];
    var totalOrderPrice = customerOrder["totalOrderPrice"];

    return "<tr><th>" + serialID + "</th>" +
        "<th>" + date + "</th>" +
        "<th>" + location + "</th>" +
        "<th>" + totalStores + "</th>" +
        "<th>" + totalItemsInOrder + "</th>" +
        "<th>" + totalItemsPriceInOrder + "</th>" +
        "<th>" + totalDeliveryPrice + "</th>" +
        "<th>" + totalOrderPrice + "</th>" +
        "<th>" + createButton(idOfButton, "Show") + "</th>";
}



export function generateRowInItemsFromStoreOrderHTMLTable(itemInOrder)
{
    var serialID = itemInOrder["serialID"];
    var nameOfItem = itemInOrder["nameOfItem"];
    var typeToMeasureBy = itemInOrder["typeToMeasureBy"];
    var AmountOfItemPurchased = itemInOrder["AmountOfItemPurchased"];


    var pricePerUnit = itemInOrder["pricePerUnit"];
    var totalPriceOfItem = itemInOrder["totalPriceOfItem"];
    var FromDiscount = itemInOrder["FromDiscount"];

    return "<tr><th>" + serialID + "</th>" +
        "<th>" + nameOfItem + "</th>" +
        "<th>" + typeToMeasureBy + "</th>" +
        "<th>" + storeSerialID + "</th>" +
        "<th>" + storeName + "</th>" +
        "<th>" + AmountOfItemPurchased + "</th>" +
        "<th>" + pricePerUnit + "</th>" +
        "<th>" + totalPriceOfItem + "</th>" +
        "<th>" + FromDiscount + "</th>";
}