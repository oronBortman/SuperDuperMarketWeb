import {initiateChoosingItemDropDownHTMLInOrder} from "./general-functions-in-choosing-item-drop-down.js";
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT = "chooseItemsInDropDownListElement";
var ID_OF_MAKE_ORDER_BODY = "makeOrderBody";

export function initiateTheChoosingItemDropDownInDynamicOrder()
{
    initiateChoosingItemDropDownHTMLInOrder();
    setItemsListInItemDropDownInDynamicOrder();
}

//TODO
//need to send to this function the serial id of item and the type of order
//the function will return the html element of an item

function getHTMLOfItemToChooseInDynamicOrder(serialIDOfItem, nameOfItem)
{
    return '<table class ="tableOfItemForm">' +
        '<tbody>' +
        '<tr><br></tr>' +
        '<tr><th>serial id:</th><th' + serialIDOfItem + '</th></tr>' +
        '<tr><th>name:</th><th>' + nameOfItem + '</th></tr>'+
        '</tbody>' +
        '</table>'
}

//TODO
function setItemsListInItemDropDownInDynamicOrder()
{
    //Need to call in ajax to read items from zone and get the infromation on it
    console.log("in refreshStoresInZoneList");
    var chooseStoresDropDownList = $("#chooseStoresDropDownList");
    document.getElementById('tbodyOfDetailsOnStoresInZone').innerHTML = '';
    // rebuild the list of users: scan all users and add them to the list of users
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