import {initiateChoosingItemDropDownHTMLInOrder} from "./general-functions-in-choosing-item-drop-down";

var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;

export function initiateTheChoosingItemDropDownInStaticOrder(storeIDSelected)
{
    initiateChoosingItemDropDownHTMLInOrder();
    initiateItemsListInItemDropDownInStaticOrder(storeIDSelected);
}

//TODO
//need to send to this function the serial id of item and the type of order
//the function will return the html element of an item
function getHTMLOfItemToChooseInStaticOrder(serialIDOfItem, nameOfItem, priceOfItem)
{
    return '<table class ="tableOfItemForm">' +
        '<tbody>' +
        '<tr><br></tr>' +
        '<tr><th>serial id:</th><th' + serialIDOfItem + '</th></tr>' +
        '<tr><th>name:</th><th>' + nameOfItem + '</th></tr>'+
        '<tr><th>price:</th><th>' + priceOfItem + '</th></tr>' +
        '</tbody>' +
        '</table>'
}

function setItemsListInItemDropDownInStaticOrder(availableItemsList)
{
    $.each(availableItemsList || [], function(index, availableItem) {
        var availableItemID = availableItem["serialNumber"];
        var availableItemName = availableItem["name"];
        console.log("Adding item #" + itemID + ": " + itemName);
        //$('<option value="storeToChooseFromList">' + 'storeID:' + storeID + 'store Name' + storeName + '</option').appendTo(chooseStoresDropDownList);
        $('<option value="storeToChooseFromList">' + 'storeID: ' + storeID + ', store Name: ' + storeName + '</option>').appendTo(chooseStoresDropDownList);

    });
}

//TODO
//need to passs StoreName
function initiateItemsListInItemDropDownInStaticOrder(storeID)
{
    //TODO
    //with ajax get information on store servlet and get from it the relevant store and get it's items
    var dataString = "zoneName="+zoneName + ",storeID=" + storeID;
    var availableItemsList;
    console.log("in refreshStoresInZoneList");
    var chooseStoresDropDownList = $("#chooseStoresDropDownList");
    document.getElementById('chooseItemsInDropDownListElement').innerHTML = '';
    //TODO
    //Need to get from here the currentAvailableItemsInTheOrder
    //It return the item that havent been chosen yet for the order
    $.ajax({
        method: 'GET',
        data: dataString,
        url: ITEMS_NOT_CHOSEN_TO_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            //$("#result").text("Failed to get result from server " + e);
        },
        success: function (r) {
            setItemsListInItemDropDownInStaticOrder(r[availableItemsList]);
        }
    })
}