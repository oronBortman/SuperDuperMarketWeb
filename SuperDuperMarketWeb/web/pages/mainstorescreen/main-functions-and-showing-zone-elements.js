import {setMakeANewOrderButton} from "./making-an-order.js";

var chatVersion = 0;
var refreshRate = 5000; //milli seconds
var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");
var ITEMS_LIST_URL = buildUrlWithContextPath("items-in-zone-list");
var CHOOSE_ITEMS_IN_ORDER_UTL = buildUrlWithContextPath("choose-item-in-order");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_TBODY_OF_ZONE_ITEMS_TABLE = 'tbodyOfZoneItemsTable';
var ID_OF_TBODY_OF_STORE_TABLE = 'tbodyOfDetailsOnStoresInZone';

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
    var listOfitemsInStore = storeInZone["availableItemsList"]
    var detailsOnItemInStore = createItemsTableFromItemsListInStore(listOfitemsInStore);
    var totalOrdersFromStore = storeInZone["totalOrdersFromStore"];
    var totalProfitOfSoledItems = storeInZone["totalProfitOfSoledItems"];
    var PPK = storeInZone["PPK"];
    var totalProfitOfDeliveris = storeInZone["totalProfitOfDeliveris"];

    return "<tr><th>" + storeID + "</th>" +
    "<th>" + storeName + "</th>" +
    "<th>" + storeOwner + "</th>" +
    "<th>" + detailsOnItemInStore + "</th>" +
    "<th>" + totalOrdersFromStore + "</th>" +
    "<th>" + totalProfitOfSoledItems + "</th>" +
    "<th>" + PPK + "</th>" +
    "<th>" + totalProfitOfDeliveris + "</th></tr>"
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
    return "<tr>" +
        "<th>SerialNumber</th>" +
        "<th>Name</th>" +
        "<th>Type Of MeasureBy</th>" +
        "<th>Price Per Unit</th>" +
        "<th>Total Soled Items From Store</th>" +
        "</tr>";
}

function generateRowInItemsInStoreHTMLTable(item)
{
    var serialNumber = item["serialNumber"];
    var name = item["name"];
    var typeOfMeasureBy = item["typeToMeasureBy"];
    var pricePerUnit = item["pricePerUnit"];
    var totalSoledItemsFromStore = item["totalSoledItemsFromStore"];

    return "<tr><th>" + serialNumber + "</th>" +
        "<th>" + name + "</th>" +
        "<th>" + typeOfMeasureBy + "</th>" +
        "<th>" + pricePerUnit + "</th>" +
        "<th>" + totalSoledItemsFromStore + "</th></tr>";
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

    return "<tr><th>" + serialNumber + "</th>" +
        "<th>" + name + "</th>" +
        "<th>" + typeOfMeasureBy + "</th>" +
        "<th>" + howManyShopsSellesAnItem + "</th>" +
        "<th>" + avgPriceOfItemInSK + "</th>" +
        "<th>" + howMuchTimesTheItemHasBeenOrdered + "</th></tr>";
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
        data: dataString,
        dataType: "json",
        success: function(detailsOnStoresInZone) {
            console.log("Succeed ajaxStoresList")
            refreshStoresInZoneList(detailsOnStoresInZone);
        }
    });
}

function ajaxItemsInZoneList() {
    var dataString = "zoneName="+zoneName;
    $.ajax({
        method:'GET',
        url: ITEMS_LIST_URL,
        data: dataString,
        dataType: "json",
        success: function(itemsInZone) {
            refreshItemsInZoneList(itemsInZone);
        }
    });
}


function setActionBasedOnRole(user)
{
    var userType = user["userType"];
    if(userType === "seller")
    {
        //TODO
        //Need to remove after fixing problem of connecting multiple users to website
        setMakeANewOrderButton();
        //  setUploadFileElement();

    }
    else if(userType === "customer")
    {
        setMakeANewOrderButton();
        //setChargingMoneyElement();
    }
}

function hideHTMLElementsByRole(user){
    var userType = user["userType"];
    if(userType === "seller")
    {
        // $("#manageAccount").hide();
    }
    else if(userType === "customer")
    {

        //  $("#loadFromXml").hide();
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