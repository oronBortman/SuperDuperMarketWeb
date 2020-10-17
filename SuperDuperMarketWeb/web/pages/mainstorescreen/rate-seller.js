import {
    emptyMakeOrderBody,
    createEmptyDropDownListHTML,
    appendHTMLToMakeAndOrderBody,
    createEmptyForm,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-make-an-order-functions.js";

const GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL=buildUrlWithContextPath("get-store-orders-for-order-summery");
const CLOSE_ORDER_AND_ADD_TO_HISTORY_URL = buildUrlWithContextPath("close-order-and-add-to-history");
const ADD_FEEDBACK_URL = buildUrlWithContextPath("add-feedback");

//ID's of HTML Elements
const ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST = "chooseItemsDropDownList";
const ID_OF_FEEDBACK_FORM = "feedbackForm";
const ID_OF_FINISH_ORDER_BUTTON = "finishOrderButton";
const ID_OF_ADD_FEEDBACK_BUTTON = "addFeedbackButton";
const GRADE_DIFFERENCE = 1;
const ID_OF_MINUS_BUTTON = 'minusButton';
const ID_OF_PLUS_BUTTON = 'plusButton';
const MIN_GRADE = 1;
const MAX_GRADE = 5;
const ID_OF_VALUE_OF_AMOUNT_OF_GRADE_CHOSEN = 1;
const ID_OF_FEEDBACK_TEXT_FIELD = 'feedbackTextField';

export function initiateRateStore()
{
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            appendHTMLToMakeAndOrderBody(generateInformingUserAboutFeedbackOptionHTML());
            appendHTMLToMakeAndOrderBody(createEmptyDropDownListHTML("storeOrders", "Choose a store for rating:", ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST));
            setStoreOrdersListInDropDownInOrder(r);

            appendHTMLToMakeAndOrderBody(createEmptyForm(ID_OF_FEEDBACK_FORM));//creating form
            buildFormElementsByStoreChoice();
            appendHTMLToMakeAndOrderBody(generateFinishOrderMessageHTML);
            appendHTMLToMakeAndOrderBody(createButton(ID_OF_FINISH_ORDER_BUTTON, 'Finish Order'));
            setFinishButtonEvent();
        }
    })
}

export function generateFinishOrderMessageHTML()
{
    return '<p>For finishing the order, just click the button "Finish Order"</p>';
}
export function setFinishButtonEvent()
{
    $("#" + ID_OF_FINISH_ORDER_BUTTON).click(function() {
        alert('clicked on FinishButton');
        // console.log("Coordinate value before checking the value: " + coordinateValueNum);
        closeOrderAndAddToHistory();
        emptyMakeOrderBody();
    });
}

export function closeOrderAndAddToHistory()
{
    $.ajax({
        method:'POST',
        data:{},
        url: CLOSE_ORDER_AND_ADD_TO_HISTORY_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
            alert('error in closeOrderAndAddToHistory\n' + e);
        },
        success: function(r) {
            console.log("Succesfully!!!");
            console.log(r);
        }
    });
}


export function buildFormElementsByStoreChoice()
{
    emptyElementByID(ID_OF_FEEDBACK_FORM);
    buildingChoosingGradeElementAndAppendToForm();
    buildingFeedbackElementAndAppendToForm();
    appendHTMLToElement(generateSubmitFunctionInFormHTML(ID_OF_ADD_FEEDBACK_BUTTON), ID_OF_FEEDBACK_FORM);
    setAddFeedbackButtonEvent();
}

export function generateSubmitFunctionInFormHTML(idOfSubmit)
{
    return '<input type="submit" id=' + idOfSubmit+ 'value="add feedback"></input>';
}
export function buildingFeedbackElementAndAppendToForm()
{
    appendHTMLToElement(getFeedbackInstructionHTML(),ID_OF_FEEDBACK_FORM);
    appendHTMLToElement(getFeedbackTextFieldHTML(),ID_OF_FEEDBACK_FORM);
}

export function getFeedbackTextFieldHTML()
{
    return '<input type="text" id=' + ID_OF_FEEDBACK_TEXT_FIELD+ 'name="feedback"><br><br>';
}
export function getFeedbackInstructionHTML()
{
    return '<label for="writeFeedbackInstruction">Write a feedback:</label><br>';
}
export function setAddFeedbackButtonEvent()
{
    $('#' + ID_OF_FEEDBACK_FORM).submit(function () {
        var storeID = $('#' + ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST).val();
        //Get infromation from feedback and send them to servlet
        var feedbackText = $("#" + ID_OF_FEEDBACK_TEXT_FIELD).val();
        var grade = $("#" +ID_OF_VALUE_OF_AMOUNT_OF_GRADE_CHOSEN).val();

        //Active servlet that add feedback to store
        $.ajax({
            method:'POST',
            data:{"storeID" : storeID,"feedbackText":feedbackText,"grade":grade},
            url: ADD_FEEDBACK_URL,
            dataType: "json",
            timeout: 4000,
            error: function(e) {
                console.error(e);
                alert('error in closeOrderAndAddToHistory\n' + e);
            },
            success: function(r) {
                console.log("Succesfully!!!");
                console.log(r);
            }
        });
        return false;
    });
}

export function buildingChoosingGradeElementAndAppendToForm()
{
    appendHTMLToElement(generateChooseGradeMessageHTML(), ID_OF_FEEDBACK_FORM);
    appendHTMLToElement(getHTMLOfTableOfEnteringGrade(), ID_OF_FEEDBACK_FORM);
    setEnteringGradesButtonsEvent();
}

export function setEnteringGradesButtonsEvent()
{
    setMinusButtonEvent();
    setPlusButtonEvent();
}

export function getHTMLOfTableOfEnteringGrade()
{
    var amount=GRADE_DIFFERENCE;
    // alert("in getHTMLOfTableOfEnteringAmountOfItem and amount is:" + amount );

    return '<table class ="tableOfEnteringGrade">' +
        '<tr>' +
        '<th><input type="button" value="-" id=' + ID_OF_MINUS_BUTTON + '></input></th>' +
        '<th><p id=' + ID_OF_VALUE_OF_AMOUNT_OF_GRADE_CHOSEN + '>' + amount + '</p></th>' +
        '<th><input type="button" value="+" id=' + ID_OF_PLUS_BUTTON + ' ></input></th>' +
        '</tr>' +
        '</table>';
}

export function subbingAmount(amount, minAmount, difference)
{
    if(amount > minAmount)
    {
        amount=amount-difference;
        updateValueOfGrade(amount);
    }
}

export function addingAmount(amount, maxAmount, difference)
{
    if(amount < maxAmount)
    {
        amount=amount+difference;
        updateValueOfGrade(amount);
    }
}

export function setMinusButtonEvent()
{
    console.log("inside setMinusButtonOnCoordinate function")

    $("#" + ID_OF_MINUS_BUTTON).click(function() {
        // console.log("Coordinate value before checking the value: " + coordinateValueNum);
        subbingAmount(getValueOfGrade(),MIN_GRADE,GRADE_DIFFERENCE);
    });
}

export function getValueOfGrade()
{
    var valueStr = $("#" + ID_OF_VALUE_OF_AMOUNT_OF_GRADE_CHOSEN).text();
    return parseInt(valueStr);
}

export function updateValueOfGrade(value)
{
    $("#" + ID_OF_VALUE_OF_AMOUNT_OF_GRADE_CHOSEN).text(value);
}

function setPlusButtonEvent()
{
    console.log("inside setPlusButtonOnCoordinate");
    $("#" + ID_OF_PLUS_BUTTON).click(function() {
        //console.log("Coordinate value before checking the value: " + coordinateValueNum);
        addingAmount(getValueOfGrade(),MAX_GRADE,GRADE_DIFFERENCE);
    });
}

export function generateInformingUserAboutFeedbackOptionHTML()
{
    return '<p>If you would like,<br>' +
        'You can choose a store and give it a feedback.<br>';
}

export function generateChooseGradeMessageHTML()
{
    return '<p>Choose your grade between 1 to 5:</p>'
}

//The values in here are good
export function setStoreOrdersListInDropDownInOrder(storeOrdersList)
{
    var chooseStoreOrdersDropDownListElement = $("#"+ ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST);
    $.each(storeOrdersList || [], function(index, storeOrder) {
        var storeID = storeOrder["serialNumber"];
        var storeName = storeOrder["name"];
        //alert("in setItemsListInItemDropDownInOrder and values are: itemID:" + itemID +  " itemName:" + itemName + " itemPrice:" + itemPrice +  "  itemTypeOfMeasure:" +itemTypeOfMeasure)
        console.log("Adding storeOrder #" + storeID + ": " + storeName);
        // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        $('<option value=' + storeID + '>' + 'storeID: ' + storeID + ', Store Name: ' + storeName + '</option>').appendTo(chooseStoreOrdersDropDownListElement);
    });
}