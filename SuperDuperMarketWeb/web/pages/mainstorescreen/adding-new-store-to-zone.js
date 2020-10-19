import {
    createEmptyHTMLContainer,
    createEmptyDropDownListHTML,
    createButton,
    disableElement,
    enableElement, appendHTMLToElement, createEmptyForm, emptyElementByID,
} from "./general-functions.js";
import {
    buildingChoosingGradeElementAndAppendToForm,
    buildingFeedbackElementAndAppendToForm,
    generateSubmitFunctionInFormHTML, setAddFeedbackButtonEvent
} from "./rate-seller";
import {creatingCoordinatesHTMLAndSetEvents} from "./creating-coordinate-elements.js";

const GET_ITEMS_IN_ZONE_URL = buildUrlWithContextPath("items-in-zone-list");
const ADD_A_NEW_STORE_TO_ZONE_URL=buildUrlWithContextPath("add-a-new-store-to-zone");
const ITEMS_NOT_CHOSEN_IN_ORDER_URL=buildUrlWithContextPath("get-items-that-are-available-in-order");
const ACTIVATE_DYNAMIC_ALGORITHM_IN_DYNAMIC_ORDER_URL = buildUrlWithContextPath("activate-dynamic-algorithm-in-dynamic-order");

const ADD_ITEM_TO_ORDER = buildUrlWithContextPath("add-item-to-order");
//ID's of HTML Elements
const ID_OF_VALUE_OF_AMOUNT_OF_ITEM_CHOSEN = 'valueOfAmountOfItemChosen';
const ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
const ID_OF_ITEM_ELEMENT = 'itemElement';
const ID_OF_NEXT_BUTTON = "nextButton";
const ID_OF_PRICE_TEXT_FIELD = 'priceTextField';
const ID_OF_ADD_A_NEW_STORE_TO_ZONE_CONTAINER = 'addANewStoreToZoneContainer';
const ID_OF_ADD_A_NEW_STORE_FORM = 'addANewStoreForm';
const ID_OF_ADD_A_NEW_STORE_BUTTON = 'addANewStoreButton';
const ID_OF_STORE_NAME_TEXT_FIELD = 'storeNameTextField';
const ID_OF_PPK_TEXT_FIELD = 'PPKTextField';
const ID_OF_VALUE_OF_COORDINATE_X_CHOSEN = "valueOfSelectedCoordinateX";
const ID_OF_VALUE_OF_COORDINATE_Y_CHOSEN = "valueOfSelectedCoordinateY";
const ID_OF_CHOOSING_ITEM_DROP_DOWN_CONTAINER = 'chooseItemsInDropDownListContainer'
const ID_OF_PRICE_ERROR = "priceError";
const ID_OF_ADD_STORE_ERROR = "addStoreError";

var itemsChosenForStoreArray = [];

export function initiateTheChoosingItemDropDownInOrder()
{
    emptyElementByID(ID_OF_ADD_A_NEW_STORE_BUTTON);
    appendHTMLToElement(generateInformingUserAboutAddingANewStoreToZoneHTML(), ID_OF_ADD_A_NEW_STORE_TO_ZONE_CONTAINER);
    appendHTMLToElement(createEmptyForm(ID_OF_ADD_A_NEW_STORE_FORM), ID_OF_ADD_A_NEW_STORE_TO_ZONE_CONTAINER);//creating form
    buildFormElements(ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(generateMessageOnAddStoreButtonHTML(), ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(createButton(ID_OF_ADD_A_NEW_STORE_BUTTON, 'Add a new store'), ID_OF_ADD_A_NEW_STORE_FORM);
    setAddStoreToZoneButtonEvent();
    appendHTMLToElement('<p id =' + ID_OF_ADD_STORE_ERROR + '></p>')
}
export function buildFormElements()
{
    emptyElementByID(ID_OF_ADD_A_NEW_STORE_FORM);
    buildingStoreNameElementAndAppendToForm();
    buildingEnteringLocationAndAppendToForm();
    buildingPPKElementAndAppendToForm();

    appendHTMLToElement(createEmptyHTMLContainer(ID_OF_CHOOSING_ITEM_DROP_DOWN_CONTAINER), ID_OF_ADD_A_NEW_STORE_FORM);
    appendHTMLToElement(createChooseItemsDropDownListHTML(), ID_OF_CHOOSING_ITEM_DROP_DOWN_CONTAINER)
    appendHTMLToElement(createEmptyHTMLContainer(ID_OF_ITEM_ELEMENT), ID_OF_ADD_A_NEW_STORE_FORM);

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
        $.ajax({
            method: 'GET',
            data: {"storeName":storeName, "coordinateX":coordinateX, "coordinateY":coordinateY, "PPK":PPK, "itemsChosenForStoreArray": itemsChosenForStoreArray },
            url: ADD_A_NEW_STORE_TO_ZONE_URL,
            dataType: "json",
            timeout: 4000,
            error: function (e) {
                console.error(e);
                alert('error in setAddStoreToZoneButtonEvent\n' + e);
            },
            success: function (r) {
                if(r["storeLocationIsUnique"] != "true")
                {
                    $("#" + ID_OF_ADD_STORE_ERROR).text="Can't create store because there is already a store in these coordinates!"
                }
                else
                {
                    disableElement(ID_OF_ADD_A_NEW_STORE_BUTTON);
                    $("#" + ID_OF_ADD_STORE_ERROR).text="Added store to zone successfully!"
                }
            }
        })
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

export function getPPKTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_PPK_TEXT_FIELD+ 'name="PPKTextField"><br><br>';
}

export function getStoreNameInstructionHTML()
{
    return '<label for="storeNameInstruction">Enter store name:</label><br>';
}

export function getStoreNameTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_STORE_NAME_TEXT_FIELD+ 'name="storeNameTextField"><br><br>';
}

export function getPriceInstructionHTML()
{
    return '<label for="priceInstruction">Enter price:</label><br>';
}

export function getPriceErrorHTML()
{
    return '<P id=' + ID_OF_PRICE_ERROR + '></P><br>';
}

export function getPriceTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_PRICE_TEXT_FIELD+ 'name="priceTextField"><br><br>';
}

export function generateInformingUserAboutAddingANewStoreToZoneHTML()
{
    return '<p>If you would like,<br>' +
        'You can choose a store and give it a feedback.<br>';
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
    appendHTMLToElement(createButton(ID_OF_ADD_ITEM_TO_ORDER, "Add item to order"),ID_OF_ITEM_ELEMENT);
}

export function createItemToChooseElement(itemStr)
{
    emptyItemElement();
    createHTMLElementsAndAppendThemToItemElement(itemStr);
    setAddItemToOrderButtonClickedEvent();
}

export function createChooseItemsDropDownListHTML()
{
    var forName = "itemInStore";
    var headline = "Choose item:";
    return createEmptyDropDownListHTML(forName, headline, ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST)
}

export function emptyChooseItemsDropDownList()
{
    $( "#" + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST ).empty();
}

//The values in here are good
export function setItemsListInItemDropDown(itemsList)
{
    var chooseItemsDropDownList = $("#"+ ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST);
    $.each(itemsList || [], function(index, item) {
        var itemID = item["serialNumber"];
        var itemName = item["name"];
        //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)
        var itemStr =JSON.stringify(item);
        console.log("Adding item #" + itemID + ": " + itemName);
       // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        $('<option value=' + itemStr + '>' + 'Item serialID: ' + itemID + ', Item name: ' + itemName + '</option>').appendTo(chooseItemsDropDownList);
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
    var itemName = itemJSON["name"]["value"]; //TODO - not sure if this is the right way to read the json
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

//  item["serialID"];
// item["price"];

export function setDropDownItemsListEvent()
{
    $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).change(function() {
        $('#' + ID_OF_PRICE_ERROR).text='';
    });
}

export function setAddItemToOrderButtonClickedEvent() {
    //   alert("in getItemsListFromServerAndSetTheItemsList: " + orderType);
    $("#" + ID_OF_ADD_ITEM_TO_ORDER).click(function () {
        var price = $('#' + ID_OF_PRICE_TEXT_FIELD).val();
        var serialID = $('#' + ID_OF_CHOOSE_ITEMS_IN_DROP_DOWN_LIST).val();
        if (isNaN(price)) {
            $('#' + ID_OF_PRICE_ERROR).text ="Error:You didn't entered a positive number in price text field!"
        }
        else if(price < 0) {
            $('#' + ID_OF_PRICE_ERROR).text = "Error:Price can't be negative!"
        }
        else
        {
            var item = {};
            item["serialID"] = serialID;
            item["price"] = price;
            itemsChosenForStoreArray.push(item);
        }
    });
}

     //   alert("Inside setAddItemToOrderButtonClickedEvent and value are: orderType:"+ orderType + " serialIDOfITem:" + serialIDOfItem + " amountOfItem:" + amountOfItem)
      /*  $.ajax({
            method: 'POST',
            data: {"orderType":orderType, "serialIDOfItem":serialIDOfItem, "amountOfItem":amountOfItem},
            url: ADD_ITEM_TO_ORDER,
            dataType: "json",
            timeout: 4000,
            error: function (e) {
                console.error(e);
                alert('error in  setAddItemToOrderButtonClickedEvent\n' + e);
            },
            success: function (r) {
                if(r.length == 0)
                {
                    disableElement(ID_OF_ADD_ITEM_TO_ORDER);
                }
                enableElement(ID_OF_NEXT_BUTTON); // need to execute just after adding the first item - to fix late
                emptyChooseItemsDropDownList();
                setItemsListInItemDropDownInOrder(r, orderType);
            }
        })
    })*/

export function getItemsListFromServerAndSetTheItemsList()
{
 //   alert("in getItemsListFromServerAndSetTheItemsList: " + orderType);
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_ITEMS_IN_ZONE_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getItemsListFromServerAndSetTheItemsList\n' + e);
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
                }
            }
            setItemsListInItemDropDown(r);
        }
    })
}

