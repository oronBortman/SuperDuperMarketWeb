import {
    createEmptyTableWithBorder,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

const GET_CUSTOMER_ORDERS_DETAILS_URL = buildUrlWithContextPath("get-customer-orders-details");
//ID's of HTML Elements
const ID_OF_CUSTOMER_ORDERS_TABLE = "customerOrdersTable";
const ID_OF_CUSTOMER_ORDERS_TABLE_BODY = "customerOrdersTableBody";
const ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE = "specificCustomerOrderTable";
const ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY = "specificCustomerOrderTableBody";
const ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER = "showPrivateOrdersOfCustomerContainer";

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
            emptyElementByID(ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
           // appendHTMLToElement('<br><br>' + createEmptyTableWithBorder(ID_OF_CUSTOMER_ORDERS_TABLE, ID_OF_CUSTOMER_ORDERS_TABLE_BODY), ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER);
           // appendHTMLToElement(getSpecificOrderForCustomerMessage() + createEmptyTableWithBorder(ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE, ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY), ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER);
            setCustomerOrdersListInTable(r);
        }
    })
}

export function getSpecificOrderForCustomerMessage()
{
    return "<br><br><p>Details on the items in the store:</p><br>"
}


//The values in here are good
export function setCustomerOrdersListInTable(customerOrdersList)
{
   // appendHTMLToElement(generateFirstRowInCustomerOrdersHTMLTable(),ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
    $.each(customerOrdersList || [], function(index, customerOrder) {
        console.log("Adding storeOrder #" + index);
        var itemsListInOrder = customerOrder["itemsListInOrder"];
        var idOfShowItemsDetailsInStoreOrderButton = "showItemsDetailsInStoreOrderButton" + index;
        // alert("Adding item #" + index + "\n" +JSON.stringify(customerOrder));
        appendHTMLToElement(generateRowInCustomerOrdersHTMLTable(customerOrder, idOfShowItemsDetailsInStoreOrderButton),ID_OF_CUSTOMER_ORDERS_TABLE_BODY);
        setShowItemsInOrderTableButtonEvent(itemsListInOrder, idOfShowItemsDetailsInStoreOrderButton);
    });
}

/*export function generateFirstRowInCustomerOrdersHTMLTable()
{
    return "<tr class='withBorder'><th class='withBorder'>Serial ID</th>" +
        "<th class='withBorder'>date</th>" +
        "<th class='withBorder'>Location</th>" +
        "<th class='withBorder'>Total Stores</th>" +
        "<th class='withBorder'>Total Items In Order</th>" +
        "<th class='withBorder'>Total Items Price In Order</th>" +
        "<th class='withBorder'>Total Delivery Price</th>" +
        "<th class='withBorder'>Total Order Price</th>" +
        "<th class='withBorder'>Show details On Items In Order</th>";
}

export function generateFirstRowInItemsFromStoreOrderHTMLTable() {
    return "<tr class='withBorder'><th class='withBorder'>Serial ID</th>" +
        "<th class='withBorder'>Name</th>" +
        "<th class='withBorder'>Measure Type</th>" +
        "<th class='withBorder'>Store serialID</th>" +
        "<th class='withBorder'>Store Name</th>" +
        "<th class='withBorder'>Amount</th>" +
        "<th class='withBorder'>Price per unit</th>" +
        "<th class='withBorder'>Total Price</th>" +
        "<th class='withBorder'>Bought on sale</th>";
}*/

export function setShowItemsInOrderTableButtonEvent(itemsList, idOfButton)
{
    $("#" + idOfButton).click(function() {
       // alert("clicked on " + idOfButton)
        emptyElementByID(ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
       // appendHTMLToElement(generateFirstRowInItemsFromStoreOrderHTMLTable(),ID_OF_SPECIFIC_CUSTOMER_ORDER_TABLE_BODY);
        $.each(itemsList || [], function(index, itemInOrder) {
         //   alert(JSON.stringify(itemsList));
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