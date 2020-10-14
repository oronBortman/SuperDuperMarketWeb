import {initiateChoosingItemDropDownHTMLInOrder} from "./general-functions-in-choosing-item-drop-down.js";

var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT = "chooseItemsInDropDownListElement";
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
var NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
var ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
var ITEMS_NOT_CHOSEN_IN_STATIC_ORDER_URL = buildUrlWithContextPath("get-items-that-are-available-in-static-order");
var ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';


export function initiateTheChoosingItemDropDownInStaticOrder(storeIDSelected)
{
    initiateChoosingItemDropDownHTMLInOrder();
    $(getChooseItemsDropDownListHTML()).appendTo($("#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT));
    $(getAddItemToOrderButtonHTML()).appendTo($("#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT));
    setChoosingItemFromDropDownListEvent();
   // setAddItemToOrderButtonClickedEvent(storeIDSelected);
    getItemsListFromServerAndSetTheItemsList();
}

function setChoosingItemFromDropDownListEvent()
{
    $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).change(function () {
        var selection = this.value; //grab the value selected
        alert('chose item with serial id ' + selection);
    });
}


function setAddItemToOrderButtonClickedEvent()
{
    $("#" + ID_OF_ADD_ITEM_TO_ORDER).click(function() {
        addChosenItemToOrder();
        initiateTheChoosingItemDropDownInStaticOrder(storeIDSelected);
    });
}

function addChosenItemToOrder()
{

}

export function initiateTheChoosingItemDropDownInStaticOrderAfterAddItemClicked(storeIDSelected)
{
    //check if there are item from
}

function getChooseItemsDropDownListHTML()
{
    return '<form>' +
        '<label for="itemsInStore">Choose item from store:</label>'+
        '<select name=' + NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST + ' id=' + NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST + '>' +
        '</select>' +
        '</form>';
}

function getAddItemToOrderButtonHTML()
{
    return '<button type="button" id=' + ID_OF_ADD_ITEM_TO_ORDER + '> Add item to order</button>';
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
        '</table>';
}

function setItemsListInItemDropDownInStaticOrder(availableItemsList)
{
    $.each(availableItemsList || [], function(index, availableItem) {
        var availableItemID = availableItem["serialNumber"];
        var availableItemName = availableItem["name"];
        console.log("Adding item #" + availableItemID + ": " + availableItemName);
        $('<option value=' + availableItemID + '>' + 'availableItem serialID: ' + availableItemID + ', available Item Name: ' + availableItemName + '</option>').appendTo(ID_OF_ADD_ITEM_TO_ORDER);
    });
}

function emptyChooseItemsInDropDownListElement()
{
    document.getElementById(ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT).innerHTML = '';
}
//TODO
//need to passs StoreName
function getItemsListFromServerAndSetTheItemsList(storeID)
{
    //TODO
    //with ajax get information on store servlet and get from it the relevant store and get it's items
        //TODO
    //Need to get from here the currentAvailableItemsInTheOrder
    //It return the item that havent been chosen yet for the order
    $.ajax({
        method: 'GET',
        data: {"storeID":storeID},
        url: ITEMS_NOT_CHOSEN_IN_STATIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            //$("#result").text("Failed to get result from server " + e);
        },
        success: function (r) {
            if(r.length == 0)
            {
                $('#' + ID_OF_ADD_ITEM_TO_ORDER).prop("disabled",true);
            }
            setItemsListInItemDropDownInStaticOrder(r);
        }
    })
}