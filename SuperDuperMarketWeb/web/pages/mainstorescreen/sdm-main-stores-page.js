var chatVersion = 0;
var refreshRate = 5000; //milli seconds
var STORES_LIST_URL = buildUrlWithContextPath("stores-in-zone-list");
var ITEMS_LIST_URL = buildUrlWithContextPath("items-in-zone-list");


//users = a list of usernames, essentially an array of javascript strings:
// ["moshe","nachum","nachche"...]
function refreshStoresInZoneList(storesInZone) {
    //clear all current users
    //$("#userstable").empty();
    var showAllStoresInZoneSelector = $("#showAllStoresInZone");
    document.getElementById('showAllStoresInZoneSelector').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(storesInZone || [], function(index, storeInZone) {
        var storeID = storeInZone["serialNumber"];
        var storeName = storeInZone["name"];
        var storeOwner = storeInZone["storeOwner"];
        var userType = user["userType"];
        refreshItemsI
        /*console.log("Adding user #" + index + ": " + userName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + userName + "</th>" + "<th>" + userType + "</th>" + "</tr>").appendTo(tbodySelector);*/
    });
}

function refreshItemsInZoneList(itemsInZone) {
    //clear all current users
    //$("#userstable").empty();
    var showAllStoresInZoneSelector = $("#showAllStoresInZone");
    document.getElementById('showAllStoresInZoneSelector').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
    $.each(storesInZone || [], function(index, storeInZone) {
        var storeID = storeInZone["serialNumber"];
        var storeName = storeInZone["name"];
        var storeOwner = storeInZone["storeOwner"];
        var userType = user["userType"];
        console.log("Adding user #" + index + ": " + userName);
        //create a new <option> tag with a value in it and
        //appeand it to the #userslist (div with id=userslist) element
        $("<tr><th>" + userName + "</th>" + "<th>" + userType + "</th>" + "</tr>").appendTo(tbodySelector);
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

function refreshItemsInZoneList(items)
{
    var items = storeInZone["ItemsSerialIDMap"];
    $.each(items || [], function(index, item) {
        var itemID = item["serialNumber"];
        var itemName = item["name"];
    })
}

function ajaxStoresList() {
    $.ajax({
        url: STORES_LIST_URL,
        success: function(users) {
            refreshStoresInZoneList(users);
        }
    });
}

function ajaxItemsInZoneList() {
    $.ajax({
        url: ITEMS_LIST_URL,
        success: function(users) {
            refreshItemsInZoneList(users);
        }
    });
}


function setActionBasedOnRole(user)
{
    var userType = user["userType"];
    if(userType === "seller")
    {
      //  setUploadFileElement();

    }
    else if(userType === "customer")
    {
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
        url:  STORES_LIST_URL ,
        success: function (user) {
             hideHTMLElementsByRole(user);
            setActionBasedOnRole(user);
        }
    });
    //The users list is refreshed automatically every second
    setInterval(ajaxStoresList, refreshRate);
    setInterval(ajaxItemsInZoneList, refreshRate);
});

