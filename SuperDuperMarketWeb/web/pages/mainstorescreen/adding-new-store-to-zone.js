import {
    createEmptyHTMLContainer,
    createEmptyDropDownListHTML,
    createButton,
    disableElement,
    createEmptyPreContainer,
    enableElement, appendHTMLToElement, createEmptyForm, emptyElementByID,
} from "./general-functions.js";
import {creatingCoordinatesHTMLAndSetEvents} from "./creating-coordinate-elements.js";

const GET_ITEMS_IN_ZONE_URL = buildUrlWithContextPath("items-in-zone-list");
const ADD_A_NEW_STORE_TO_ZONE_URL=buildUrlWithContextPath("add-a-new-store-to-zone");
var USERS_TYPE_AND_NAME_URL = buildUrlWithContextPath("user-type-and-name");
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;
//ID's of HTML Elements
const ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
const ID_OF_ITEM_ELEMENT = 'itemElement';
const ID_OF_PRICE_TEXT_FIELD = 'priceTextField';
const ID_OF_ADD_A_NEW_STORE_TO_ZONE_CONTAINER = 'addANewStoreToZoneContainer';
const ID_OF_ADD_A_NEW_STORE_TO_ZONE_PRE = 'addANewStoreToZonePre';
const ID_OF_ADD_A_NEW_STORE_FORM = 'addANewStoreForm';
const ID_OF_ADD_A_NEW_STORE_BUTTON = 'addANewStoreButton';
const ID_OF_STORE_NAME_TEXT_FIELD = 'storeNameTextField';
const ID_OF_PPK_TEXT_FIELD = 'PPKTextField';
const ID_OF_VALUE_OF_COORDINATE_X_CHOSEN = "valueOfSelectedCoordinateX";
const ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN = "valueOfSelectedCoordinateY";
const ID_OF_CHOOSING_ITEM_DROP_DOWN_CONTAINER = 'chooseItemsInDropDownListContainer'
const ID_OF_PRICE_ERROR = "priceError";
const ID_OF_ADDING_ITEM_SUCCESSFULLY_INFO = "addingItemInfo";
const ID_OF_ADD_STORE_ERROR = "addStoreError";

var itemsChosenForStoreArray = [];

export function initiateAddANewStoreToZone()
{
    itemsChosenForStoreArray=[];
    emptyElementByID(ID_OF_ADD_A_NEW_STORE_TO_ZONE_CONTAINER);
    appendHTMLToElement(createEmptyPreContainer(ID_OF_ADD_A_NEW_STORE_TO_ZONE_PRE), ID_OF_ADD_A_NEW_STORE_TO_ZONE_CONTAINER);
    appendHTMLToElement('<br><br>', ID_OF_ADD_A_NEW_STORE_TO_ZONE_PRE);
    appendHTMLToElement(generateInformingUserAboutAddingANewStoreToZoneHTML(), ID_OF_ADD_A_NEW_STORE_TO_ZONE_PRE);
    appendHTMLToElement(createEmptyForm(ID_OF_ADD_A_NEW_STORE_FORM), ID_OF_ADD_A_NEW_STORE_TO_ZONE_PRE);//creating form
    buildFormElements(ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(generateMessageOnAddStoreButtonHTML(), ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement('<br><br>', ID_OF_ADD_A_NEW_STORE_TO_ZONE_PRE);
    appendHTMLToElement(createButton(ID_OF_ADD_A_NEW_STORE_BUTTON, 'Add a new store'), ID_OF_ADD_A_NEW_STORE_FORM);
    disableElement(ID_OF_ADD_A_NEW_STORE_BUTTON);
    setAddStoreToZoneButtonEvent();
    appendHTMLToElement('<p id=' + ID_OF_ADD_STORE_ERROR + '></p>', ID_OF_ADD_A_NEW_STORE_FORM);
}

export function buildFormElements()
{
    emptyElementByID(ID_OF_ADD_A_NEW_STORE_FORM);
    buildingStoreNameElementAndAppendToForm();
    buildingEnteringLocationAndAppendToForm();
    buildingPPKElementAndAppendToForm();

    appendHTMLToElement(createEmptyHTMLContainer(ID_OF_CHOOSING_ITEM_DROP_DOWN_CONTAINER), ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(createChooseItemsDropDownListHTML(), ID_OF_CHOOSING_ITEM_DROP_DOWN_CONTAINER)
    appendHTMLToElement(createEmptyPreContainer(ID_OF_ITEM_ELEMENT), ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(getAddingItemSuccessfullyInfo(), ID_OF_ADD_A_NEW_STORE_FORM);
    $("#" + ID_OF_ADDING_ITEM_SUCCESSFULLY_INFO).hide();

    setChoosingItemFromDropDownListEvent();
    setDropDownItemsListEvent();
    getItemsListFromServerAndSetTheItemsList();
}

export function setAddStoreToZoneButtonEvent()
{
    $("#" + ID_OF_ADD_A_NEW_STORE_BUTTON).click(function() {
        var storeName = $('#' + ID_OF_STORE_NAME_TEXT_FIELD).val();
        var coordinateX = $('#' + ID_OF_VALUE_OF_COORDINATE_X_CHOSEN).text();
        var coordinateY = $('#' + ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN).text();
        var PPK = $('#' + ID_OF_PPK_TEXT_FIELD).val();

        if(storeName === '')
        {
            $("#" + ID_OF_ADD_STORE_ERROR).css('color', 'red');
            $("#" + ID_OF_ADD_STORE_ERROR).text("Error: Store name field is empty");
        }
        else if(PPK === '')
        {
            $("#" + ID_OF_ADD_STORE_ERROR).css('color', 'red');
            $("#" + ID_OF_ADD_STORE_ERROR).text("Error: PPK field is empty");
        }
        else if(isNaN(PPK))
        {
            $("#" + ID_OF_ADD_STORE_ERROR).css('color', 'red');
            $("#" + ID_OF_ADD_STORE_ERROR).text("Error: You didn't enter a number in PPK");
        }
        else if(PPK < 0)
        {
            $("#" + ID_OF_ADD_STORE_ERROR).css('color', 'red');
            $("#" + ID_OF_ADD_STORE_ERROR).text("Error: PPK x needs to be a non-negative number");
        }
        else
        {
            $.ajax({
                method: 'GET',
                data: {"zoneName":zoneName,"storeName":storeName, "coordinateX":coordinateX, "coordinateY":coordinateY, "PPK":PPK, "itemsChosenForStoreArray": JSON.stringify(itemsChosenForStoreArray) },
                url: ADD_A_NEW_STORE_TO_ZONE_URL,
                dataType: "json",
                timeout: 4000,
                error: function (e) {
                    console.error(e);
                  //  alert('error in setAddStoreToZoneButtonEvent\n' + e);
                },
                success: function (r) {
                    if(r["thereIsAlreadyStoreInLocation"] === "true")
                    {
                        $("#" + ID_OF_ADD_STORE_ERROR).css('color', 'red');
                        $("#" + ID_OF_ADD_STORE_ERROR).text("Error: Can't create store because there is already a store in these coordinates!");
                    }
                    else
                    {
                        disableElement(ID_OF_ADD_A_NEW_STORE_BUTTON);
                        $("#" + ID_OF_ADD_STORE_ERROR).css('color', 'green');
                        $("#" + ID_OF_ADD_STORE_ERROR).text("Added store to zone successfully!");
                    }
                }
            })
        }
    });
}


export function buildingEnteringLocationAndAppendToForm()
{
    creatingCoordinatesHTMLAndSetEvents(ID_OF_VALUE_OF_COORDINATE_X_CHOSEN, ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN, ID_OF_ADD_A_NEW_STORE_FORM);
}

export function buildingStoreNameElementAndAppendToForm()
{
    appendHTMLToElement(getStoreNameInstructionHTML(),ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(getStoreNameTextFieldHTML(),ID_OF_ADD_A_NEW_STORE_FORM);
}

export function buildingPPKElementAndAppendToForm()
{
    appendHTMLToElement(getPPKInstructionHTML(),ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(getPPKTextFieldHTML(),ID_OF_ADD_A_NEW_STORE_FORM);
}

export function getPPKInstructionHTML()
{
    return '<label for="PPKInstruction">Enter PPK:</label><br>';
}

export function getAddingItemSuccessfullyInfo()
{
    return '<p style="color:green;" id=' + ID_OF_ADDING_ITEM_SUCCESSFULLY_INFO + '>Added item successfully</p><br>';

}

export function getPPKTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_PPK_TEXT_FIELD+ ' name="PPKTextField"><br><br>';
}

export function getStoreNameInstructionHTML()
{
    return '<label for="storeNameInstruction">Enter store name:</label><br>';
}

export function getStoreNameTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_STORE_NAME_TEXT_FIELD+ ' name="storeNameTextField"><br><br>';
}

export function getPriceInstructionHTML()
{
    return '<label for="priceInstruction">Enter price:</label><br>';
}

export function getPriceErrorHTML()
{
    return '<p id=' + ID_OF_PRICE_ERROR + '></p><br>';
}

export function getPriceTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_PRICE_TEXT_FIELD+ ' name="priceTextField"><br><br>';
}

export function generateInformingUserAboutAddingANewStoreToZoneHTML()
{
    return '<p>Here you create a new store and add it to the zone</p>'
}

export function generateMessageOnAddStoreButtonHTML()
{
    return '<p>For Adding the store, just click on the button "Add store"</p>';
}

export function setChoosingItemFromDropDownListEvent(orderType)
{
    $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).change(function () {
        var itemStr = $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).val();
        createItemToChooseElement(itemStr, orderType);
    });
}

export function createHTMLElementsAndAppendThemToItemElement(itemStr)
{
    appendHTMLToElement(getHTMLOfItemToChooseInOrder(itemStr),ID_OF_ITEM_ELEMENT)
    appendHTMLToElement(createButton(ID_OF_ADD_ITEM_TO_ORDER, "Add item to store"),ID_OF_ITEM_ELEMENT);
}

export function createItemToChooseElement(itemStr)
{
    emptyItemElement();
    createHTMLElementsAndAppendThemToItemElement(itemStr);
    setAddItemToStoreButtonClickedEvent();
}

export function createChooseItemsDropDownListHTML()
{
    var forName = "itemInStore";
    var headline = "Choose item:";
    return createEmptyDropDownListHTML(forName, headline, ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST)
}

export function setItemsListInItemDropDown(itemsList)
{
    var chooseItemsDropDownList = $("#"+ ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST);
    $.each(itemsList || [], function(index, item) {
        var itemID = item["serialNumber"];
        var itemName = item["name"];
        var itemStr =JSON.stringify(item);
        console.log("Adding item #" + itemID + ": " + itemName);
        $("<option value='" + itemStr + "'>" + "Item serialID: " + itemID + ", Item name: '" + itemName + "'</option>").appendTo(chooseItemsDropDownList);
        if(index === 0)
        {
            createItemToChooseElement(itemStr);
        }
    });
}

export function createPriceElementHTML()
{
    return getPriceInstructionHTML() + getPriceTextFieldHTML() + getPriceErrorHTML();
}

export function getHTMLOfItemToChooseInOrder(itemStr)
{
    var itemJSON = JSON.parse(itemStr);
    var serialIDOfItem = itemJSON["serialNumber"];
    var itemName = itemJSON["name"];
    var itemTypeOfMeasure = itemJSON["typeOfMeasureBy"];

    var startOfTable='<table class ="tableOfItemForm">';
    var serialIdRow='<tr><th>serial id:</th><th>' + serialIDOfItem + '</th></tr>';
    var namRow='<tr><th>name:</th><th>' + itemName + '</th></tr>';
    var typeOfMeasureRow='<tr><th>type of measure:</th><th>' + itemTypeOfMeasure + '</th></tr>';
    var endOfTable = '</tbody>';
    var table = startOfTable + serialIdRow + namRow + typeOfMeasureRow + endOfTable;

    return table + createPriceElementHTML();
}

export function emptyItemElement()
{
    $( "#" + ID_OF_ITEM_ELEMENT ).empty();
}

export function setDropDownItemsListEvent()
{
    $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).change(function() {
        $("#" + ID_OF_ADDING_ITEM_SUCCESSFULLY_INFO).hide();
    });
}

export function setAddItemToStoreButtonClickedEvent() {
    $("#" + ID_OF_ADD_ITEM_TO_ORDER).click(function () {
        var price = $('#' + ID_OF_PRICE_TEXT_FIELD).val();
        var itemStr = $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).val();
        var itemJSON = JSON.parse(itemStr);
        var serialID = itemJSON["serialNumber"];
        if(price === '')
        {
            $("#" + ID_OF_PRICE_ERROR).css('color', 'red');
            $('#' + ID_OF_PRICE_ERROR).text("Error: Price field is empty!");
        }
        else if (isNaN(price)) {
            $("#" + ID_OF_PRICE_ERROR).css('color', 'red');
            $('#' + ID_OF_PRICE_ERROR).text("Error: You didn't entered a positive number in price text field!");
        }
        else if(price < 0) {
            $("#" + ID_OF_PRICE_ERROR).css('color', 'red');
            $('#' + ID_OF_PRICE_ERROR).text("Error: Price can't be negative!");
        }
        else
        {
            var item = {};
            item["serialNumber"] = serialID;
            item["price"] = price;
            itemsChosenForStoreArray.push(item);
            emptyElementByID(ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST);
            enableElement(ID_OF_ADD_A_NEW_STORE_BUTTON);
            getItemsListFromServerAndSetTheItemsList();
            $("#" + ID_OF_ADDING_ITEM_SUCCESSFULLY_INFO).show();
        }
    });
}

export function getItemsListFromServerAndSetTheItemsList()
{
    $.ajax({
        method: 'GET',
        data: {"zoneName":zoneName},
        url: GET_ITEMS_IN_ZONE_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            //alert('error in  getItemsListFromServerAndSetTheItemsList\n' + e);
        },
        success: function (r) {
            let i;
            let j;
            for (i = 0; i < r.length; i++) {
                for(j = 0; j < itemsChosenForStoreArray.length; j++)
                {
                    if(r[i]["serialNumber"] === itemsChosenForStoreArray[j]["serialNumber"])
                    {
                        delete r[i];
                    }
                    r = r.filter(function(x) { return x !== null });
                }
            }
            setItemsListInItemDropDown(r);
        }
    })
}

