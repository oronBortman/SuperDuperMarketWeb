import {setMakeANewOrderButton} from "./making-an-order.js";
import {initiateShowOrdersOfSellerStoresInCertainZone} from "./show-orders-of-seller.js";
import {initiateShowPrivateOrdersOfCustomer} from "./show-private-orders-of-customer.js";
import {initiateShowFeedbacksInCertainZone} from "./show-feedbacks-of-seller.js";
import {initiateAddANewStoreToZone} from "./adding-new-store-to-zone.js";
import {getAlertsFromServerAndUpdateOwner} from "../show-alerts.js";

var refreshRate = 5000; //milli seconds
var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");
var ITEMS_LIST_URL = buildUrlWithContextPath("items-in-zone-list");
var CHOOSE_ITEMS_IN_ORDER_UTL = buildUrlWithContextPath("choose-item-in-order");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_TBODY_OF_ZONE_ITEMS_TABLE = 'tbodyOfZoneItemsTable';
var ID_OF_TBODY_OF_STORE_TABLE = 'tbodyOfDetailsOnStoresInZone';

const ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_BUTTON = "showPrivateOrdersOfCustomerButton";
const ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER = "showPrivateOrdersOfCustomerContainer";
const ID_OF_SHOW_ORDERS_IN_SELLER_STORES_BUTTON = "showPrivateOrdersInSellerStoresButton";
const ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER = "showOrdersInSellerStoresContainer";
const ID_OF_SHOW_FEEDBACKS_BUTTON = 'showFeedbacksButton';
const ID_OF_SHOW_FEEDBACKS_CONTAINER = 'showFeedbacksContainer';
const ID_OF_ADD_NEW_STORE_TO_ZONE_BUTTON = 'addANewStoreToZoneButton';
const ID_OF_ADD_NEW_STORE_CONTAINER = 'addANewStoreContainer';
const ID_OF_SHOW_FEEDBACKS = 'showFeedbacksContainer';
const ID_OF_MAKE_A_NEW_ORDER_CONTAINER = 'makeANewOrderContainer';
const ID_OF_SHOW_PRIVATE_ORDER_OF_SELLER_CONTAINER = 'showPrivateOrdersOfSellerContainer';
const ID_OF_SHOW_PRIVATE_ORDER_OF_CUSTOMER_CONTAINER  = 'showPrivateOrdersOfCustomerContainer';


function emptyStoresInZoneTable() {
    document.getElementById(ID_OF_TBODY_OF_STORE_TABLE).innerHTML = '';
}

function refreshStoresInZoneList(detailsOnStoresInZone) {
    console.log("in refreshStoresInZoneList");
    emptyStoresInZoneTable();
    var showAllStoresInZoneSelector = $('#' + ID_OF_TBODY_OF_STORE_TABLE);
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(detailsOnStoresInZone || [], function(index, storeInZone) {
        console.log("Adding store #" + index + ": " + name);
        $(generateRowInStoresInZoneHTMLTable(storeInZone)).appendTo(showAllStoresInZoneSelector);
    });
}

function generateRowInStoresInZoneHTMLTable(storeInZone)
{
    var storeID = storeInZone["serialNumber"];
    var storeName = storeInZone["name"];
    var storeOwner = storeInZone["ownerName"];
    var listOfItemsInStore = storeInZone["availableItemsList"]
    var detailsOnItemInStore = createItemsTableFromItemsListInStore(listOfItemsInStore);
    var totalOrdersFromStore = storeInZone["totalOrdersFromStore"];
    var totalProfitOfSoledItems = storeInZone["totalProfitOfSoledItems"];
    var PPK = storeInZone["PPK"];
    var totalProfitOfDeliveris = storeInZone["totalProfitOfDeliveris"];

    return "<tr class='withBorder'><th class='withBorder'>" + storeID + "</th>" +
    "<th class='withBorder'>" + storeName + "</th>" +
    "<th class='withBorder'>" + storeOwner + "</th>" +
    "<th class='withBorder'>" + detailsOnItemInStore + "</th>" +
    "<th class='withBorder'>" + totalOrdersFromStore + "</th>" +
    "<th class='withBorder'>" + totalProfitOfSoledItems + "</th>" +
    "<th class='withBorder'>" + PPK + "</th>" +
    "<th class='withBorder'>" + totalProfitOfDeliveris + "</th></tr>"
}

function createItemsTableFromItemsListInStore(listOfItemsInStore)
{
    var itemsTableHeadline=generateItemsHTMLTableHeadline();
    var itemTableBody="";

    $.each(listOfItemsInStore || [], function(index, item) {
        console.log("Adding item #" + index + ": " + name);
        itemTableBody = itemTableBody + generateRowInItemsInStoreHTMLTable(item);
    });
    return "<table>" + itemsTableHeadline + itemTableBody + "</table>";
}

function generateItemsHTMLTableHeadline()
{
    return "<tr class='withBorder'>" +
        "<th class='withBorder'>SerialNumber</th>" +
        "<th class='withBorder'>Name</th>" +
        "<th class='withBorder'>Type Of MeasureBy</th>" +
        "<th class='withBorder'>Price Per Unit</th>" +
        "<th class='withBorder'>Total Soled Items From Store</th>" +
        "</tr>";
}

function generateRowInItemsInStoreHTMLTable(item)
{
    var serialNumber = item["serialNumber"];
    var name = item["name"];
    var typeOfMeasureBy = item["typeToMeasureBy"];
    var pricePerUnit = item["pricePerUnit"];
    var totalSoledItemsFromStore = item["totalSoledItemsFromStore"];

    return "<tr class='withBorder'><th class='withBorder'>" + serialNumber + "</th>" +
        "<th class='withBorder'>" + name + "</th>" +
        "<th class='withBorder'>" + typeOfMeasureBy + "</th>" +
        "<th class='withBorder'>" + pricePerUnit + "</th>" +
        "<th class='withBorder'>" + totalSoledItemsFromStore + "</th></tr>";
}

function refreshItemsInZoneList(itemsInZone) {
    document.getElementById(ID_OF_TBODY_OF_ZONE_ITEMS_TABLE).innerHTML = '';
    // rebuild the list of items: scan all items and add them to the list of items
    $.each(itemsInZone || [], function(index, item) {
        console.log("Adding item #" + index + ": " + name);
        $(generateRowInItemsInZoneHTMLTable(item)).appendTo($('#' + ID_OF_TBODY_OF_ZONE_ITEMS_TABLE));
    });
}

function generateRowInItemsInZoneHTMLTable(item)
{
    var serialNumber = item["serialNumber"];
    var name = item["name"];
    var typeOfMeasureBy = item["typeOfMeasureBy"];
    var howManyShopsSellesAnItem = item["howManyShopsSellesAnItem"];
    var avgPriceOfItemInSK = item["avgPriceOfItemInSK"];
    var howMuchTimesTheItemHasBeenOrdered = item["howMuchTimesTheItemHasBeenOrdered"];

    return "<tr class='withBorder'><th class='withBorder'>" + serialNumber + "</th>" +
        "<th class='withBorder'>" + name + "</th>" +
        "<th class='withBorder'>" + typeOfMeasureBy + "</th>" +
        "<th class='withBorder'>" + howManyShopsSellesAnItem + "</th>" +
        "<th class='withBorder'>" + avgPriceOfItemInSK + "</th>" +
        "<th class='withBorder'>" + howMuchTimesTheItemHasBeenOrdered + "</th></tr>";
}

function setMoveToTheMainPageButton() { // onload...do
    $("#moveToSDMMainPage").submit(function() {
        window.location.replace("../sdmmainpage/sdm-main-page.html");
        return false;
    })
}


function ajaxStoresList() {
    console.log("in ajaxStoresList");
    var dataString = "zoneName="+zoneName;
    $.ajax({
        method:'GET',
        url: STORES_LIST_URL,
        data: {"zoneName":zoneName},
        dataType: "json",
        success: function(detailsOnStoresInZone) {
            console.log("Succeed ajaxStoresList")
            refreshStoresInZoneList(detailsOnStoresInZone);
        },
        error: function(e) {
            console.error(e);
            alert('error in ajaxStoresList\n' + e);
        }
    });
}

function ajaxItemsInZoneList() {
    var dataString = "zoneName="+zoneName;
    $.ajax({
        method:'GET',
        url: ITEMS_LIST_URL,
        data: {"zoneName":zoneName},
        dataType: "json",
        success: function(itemsInZone) {
            refreshItemsInZoneList(itemsInZone);
        },
        error: function(e) {
            console.error(e);
            alert('error in ajaxItemsInZoneList\n' + e);
        }
    });
}


function setActionBasedOnRole(user)
{
    var userType = user["userType"];
    if(userType === "seller")
    {
        //TODO
        //setShowOrdersInSellerStoresButtonEvent()
       // setShowFeedbacksButtonEvent();
        setAddANewStoreButtonEvent();
        setInterval(initiateShowFeedbacksInCertainZone, refreshRate);
        setInterval(initiateShowOrdersOfSellerStoresInCertainZone, refreshRate);
        setInterval(getAlertsFromServerAndUpdateOwner, refreshRate);
    }

    else if(userType === "customer")
    {
        setMakeANewOrderButton();
       // setShowCustomerOrdersButtonEvent();
        setInterval(initiateShowPrivateOrdersOfCustomer, refreshRate);
    }
}

function setAddANewStoreButtonEvent()
{
    $("#" + ID_OF_ADD_NEW_STORE_TO_ZONE_BUTTON).click(function() {
        initiateAddANewStoreToZone();
    });
}

/*function setShowFeedbacksButtonEvent()
{
    $("#" + ID_OF_SHOW_FEEDBACKS_BUTTON).click(function() {
        initiateShowFeedbacksInCertainZone();
    });
}*/
/*
function setShowOrdersInSellerStoresButtonEvent()
{
    $("#" + ID_OF_SHOW_ORDERS_IN_SELLER_STORES_BUTTON).click(function() {
        initiateShowOrdersOfSellerStoresInCertainZone();
    })
}

function setShowCustomerOrdersButtonEvent()
{
    $("#" + ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_BUTTON).click(function() {
        initiateShowPrivateOrdersOfCustomer();
    })
}*/

/*
const ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_BUTTON = "showPrivateOrdersOfCustomerButton";
const ID_OF_SHOW_PRIVATE_ORDERS_OF_CUSTOMER_CONTAINER = "showPrivateOrdersOfSellerContainer";
const ID_OF_SHOW_ORDERS_IN_SELLER_STORES_BUTTON = "showPrivateOrdersInSellerStoresButton";
const ID_OF_SHOW_ORDERS_IN_SELLER_STORES_CONTAINER = "showOrdersInSellerStoresContainer";
const ID_OF_SHOW_FEEDBACKS_BUTTON = 'showFeedbacksButton';
const ID_OF_SHOW_FEEDBACKS_CONTAINER = 'showFeedbacksContainer';
 */
function hideHTMLElementsByRole(user){
    var userType = user["userType"];
    if(userType === "seller")
    {
         $("#" + ID_OF_MAKE_A_NEW_ORDER_CONTAINER).hide();
         $("#" + ID_OF_SHOW_PRIVATE_ORDER_OF_CUSTOMER_CONTAINER).hide();

    }
    else if(userType === "customer")
    {
        $("#" + ID_OF_SHOW_PRIVATE_ORDER_OF_SELLER_CONTAINER).hide();
        $("#" + ID_OF_SHOW_FEEDBACKS_CONTAINER).hide();
        $("#" + ID_OF_ADD_NEW_STORE_CONTAINER).hide();
    }
}

$(function() {
    $.ajax({
        url:  USERS_TYPE_AND_NAME_URL ,
        success: function (user) {
            hideHTMLElementsByRole(user);
            setActionBasedOnRole(user);
        }
    });
    setMoveToTheMainPageButton();
    //The users list is refreshed automatically every second
    setInterval(ajaxStoresList, refreshRate);
    setInterval(ajaxItemsInZoneList, refreshRate);
});

/*
                    <form id = "chargingMoney" name = "chargingMoney" action = "/SuperDuperMarketWeb_Web_exploded/charging-money" method = "POST" class = "charging-money">

 */