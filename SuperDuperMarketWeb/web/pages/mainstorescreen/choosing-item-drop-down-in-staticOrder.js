import {
    initiateChoosingItemDropDownHTMLInOrder,
    getItemElementHTMLAndAppendToMakeOrderBody,
    getChooseItemsDropDownListHTML,
    setChoosingItemFromDropDownListEvent,
    setItemsListInItemDropDownInOrder,
    getAddItemToOrderButtonHTML,
    setAddItemToOrderButtonClickedEvent
} from "./general-functions-in-choosing-item-drop-down.js";

var ITEMS_NOT_CHOSEN_IN_STATIC_ORDER_URL = buildUrlWithContextPath("get-items-that-are-available-in-static-order");
var GET_ITEM_FROM_STORE_URL = buildUrlWithContextPath("get-item-from-store");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT = "chooseItemsInDropDownListElement";
var ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
var NAME_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
var ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
var ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
var ID_OF_ITEM_ELEMENT = 'itemElement';
var ORDER_TYPE = 'static';


export function initiateTheChoosingItemDropDownInStaticOrder(storeIDSelected)
{
    initiateChoosingItemDropDownHTMLInOrder();
    $(getChooseItemsDropDownListHTML()).appendTo($("#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT));
    $(getAddItemToOrderButtonHTML()).appendTo($("#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT));
    getItemElementHTMLAndAppendToMakeOrderBody();
    setChoosingItemFromDropDownListEvent(ORDER_TYPE);
    setAddItemToOrderButtonClickedEvent(storeIDSelected);
    getItemsListFromServerAndSetTheItemsList(storeIDSelected);
}

function addChosenItemToOrder()
{

}

export function initiateTheChoosingItemDropDownInStaticOrderAfterAddItemClicked(storeIDSelected)
{
    //check if there are item from
}




function emptyChooseItemsInDropDownListElement()
{
    document.getElementById(ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST_ELEMENT).innerHTML = '';
}


//TODO
//need to passs StoreName
function getItemsListFromServerAndSetTheItemsList(storeID)
{
    $.ajax({
        method: 'GET',
        data: {"storeID":storeID},
        url: ITEMS_NOT_CHOSEN_IN_STATIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getItemsListFromServerAndSetTheItemsList\n' + e);
        },
        success: function (r) {
            if(r.length == 0)
            {
                $('#' + ID_OF_ADD_ITEM_TO_ORDER).prop("disabled",true);
            }
            setItemsListInItemDropDownInOrder(r, ORDER_TYPE);
        }
    })
}