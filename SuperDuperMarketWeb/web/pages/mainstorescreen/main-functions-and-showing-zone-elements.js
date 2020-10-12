import {setMakeANewOrderButton} from "./making-an-order";

var chatVersion = 0;
var refreshRate = 5000; //milli seconds
var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");
var ITEMS_LIST_URL = buildUrlWithContextPath("items-in-zone-list");
var CHOOSE_ITEMS_IN_ORDER_UTL = buildUrlWithContextPath("choose-item-in-order");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var zoneName = detailsOnZoneJSONFormat.zoneName;



function refreshStoresInZoneList(detailsOnStoresInZone) {
    //clear all current users
    //$("#userstable").empty();
    console.log("in resreshStoresInZoneList");

    var showAllStoresInZoneSelector = $("#tbodyOfDetailsOnStoresInZone");
    document.getElementById('tbodyOfDetailsOnStoresInZone').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(detailsOnStoresInZone || [], function(index, storeInZone) {
        var storeID = storeInZone["serialNumber"];
        var storeName = storeInZone["name"];
        var storeOwner = storeInZone["ownerName"];
        var listOfitemsInStore = storeInZone["availableItemsList"]
        var detailsOnItemInStore = createItemsTableFromItemsListInStore(listOfitemsInStore);
        var totalOrdersFromStore = storeInZone["totalOrdersFromStore"];
        var totalProfitOfSoledItems = storeInZone["totalProfitOfSoledItems"];
        var PPK = storeInZone["PPK"];
        var totalProfitOfDeliveris = storeInZone["totalProfitOfDeliveris"];

        console.log("Adding store #" + index + ": " + name);
        $("<tr><th>" + storeID + "</th>" +
            "<th>" + storeName + "</th>" +
            "<th>" + storeOwner + "</th>" +
            "<th>" + detailsOnItemInStore + "</th>" +
            "<th>" + totalOrdersFromStore + "</th>" +
            "<th>" + totalProfitOfSoledItems + "</th>" +
            "<th>" + PPK + "</th>" +
            "<th>" + totalProfitOfDeliveris + "</th></tr>").appendTo(showAllStoresInZoneSelector);
    });
}

function createItemsTableFromItemsListInStore(listOfitemsInStore)
{
    var itemsTableHeadline ="<tr>" +
        "<th>serialNumber</th>" +
        "<th>name</th>" +
        "<th>type Of MeasureBy</th>" +
        "<th>price Per Unit</th>" +
        "<th>total Soled Items From Store</th>" +
        "</tr>";
    var itemTableBody=""
    $.each(listOfitemsInStore || [], function(index, item) {
        var serialNumber = item["serialNumber"];
        var name = item["name"];
        var typeOfMeasureBy = item["typeToMeasureBy"];
        var pricePerUnit = item["pricePerUnit"];
        var totalSoledItemsFromStore = item["totalSoledItemsFromStore"];

        console.log("Adding item #" + index + ": " + name);
        itemTableBody = "<tr><th>" + serialNumber + "</th>" +
            "<th>" + name + "</th>" +
            "<th>" + typeOfMeasureBy + "</th>" +
            "<th>" + pricePerUnit + "</th>" +
            "<th>" + totalSoledItemsFromStore + "</th>";
    });
    return "<table>" + itemsTableHeadline + itemTableBody + "</table>";
}

function refreshItemsInZoneList(itemsInZone) {
    var itemsTableInZone = $("#tbodyOfZoneItemsTable");
    document.getElementById('tbodyOfZoneItemsTable').innerHTML = '';
    // rebuild the list of items: scan all items and add them to the list of items
    $.each(itemsInZone || [], function(index, item) {
        var serialNumber = item["serialNumber"];
        var name = item["name"];
        var typeOfMeasureBy = item["typeOfMeasureBy"];
        var howManyShopsSellesAnItem = item["howManyShopsSellesAnItem"];
        var avgPriceOfItemInSK = item["avgPriceOfItemInSK"];
        var howMuchTimesTheItemHasBeenOrdered = item["howMuchTimesTheItemHasBeenOrdered"];

        console.log("Adding item #" + index + ": " + name);
        $("<tr><th>" + serialNumber + "</th>" +
            "<th>" + name + "</th>" +
            "<th>" + typeOfMeasureBy + "</th>" +
            "<th>" + howManyShopsSellesAnItem + "</th>" +
            "<th>" + avgPriceOfItemInSK + "</th>" +
            "<th>" + howMuchTimesTheItemHasBeenOrdered + "</th></tr>").appendTo(itemsTableInZone);
    });
}

function refreshItemsInStoreList(itemsInStore)
{
    // var items = storeInZone["ItemsSerialIDMap"];
    $.each(items || [], function(index, item) {
        //serialNumber;
        //name;
        var itemID = item["serialNumber"];
        var itemName = item["name"];
    })
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