import {createEmptyDropDownListHTML,
    createEmptyForm,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

const GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL=buildUrlWithContextPath("get-store-orders-for-order-summery");
const CLOSE_ORDER_AND_ADD_TO_HISTORY_URL = buildUrlWithContextPath("close-order-and-add-to-history");
const ADD_FEEDBACK_URL = buildUrlWithContextPath("add-feedback");

//ID's of HTML Elements
var ID_OF_MAKE_AN_ORDER_BODY = 'makeOrderBody';
const ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST = "chooseStoreDropDownList";
const ID_OF_FEEDBACK_FORM = "feedbackForm";
const ID_OF_ADD_FEEDBACK_STATUS = 'addFeedbackStatus'
const ID_OF_FINISH_ORDER_BUTTON = "finishOrderButton";
const ID_OF_ADD_FEEDBACK_BUTTON = "addFeedbackButton";
const GRADE_DIFFERENCE = 1;
const ID_OF_MINUS_BUTTON = 'minusButton';
const ID_OF_PLUS_BUTTON = 'plusButton';
const MIN_GRADE = 1;
const MAX_GRADE = 5;
const ID_OF_VALUE_OF_AMOUNT_OF_GRADE_CHOSEN = 1;
const ID_OF_FEEDBACK_TEXT_FIELD = 'feedbackTextField';

export function initiateRateStore(idOfMakeAnOrderContainer)
{
    emptyElementByID(idOfMakeAnOrderContainer);
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_STORES_ORDERS_FOR_ORDER_SUMMERY_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
           // alert('error in  initiateTheChoosingItemDropDownInOrder\n' + e);
        },
        success: function (r) {
            appendHTMLToElement(generateInformingUserAboutFeedbackOptionHTML(), idOfMakeAnOrderContainer);
            appendHTMLToElement(createEmptyDropDownListHTML("storeOrders", "Choose a store for rating:", ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST), idOfMakeAnOrderContainer);
            setStoreOrdersListInDropDownInOrder(r);

            appendHTMLToElement(createEmptyForm(ID_OF_FEEDBACK_FORM), idOfMakeAnOrderContainer);//creating form
            buildFormElementsByStoreChoice();
            appendHTMLToElement(generateFinishOrderMessageHTML(), idOfMakeAnOrderContainer);
            appendHTMLToElement(createButton(ID_OF_FINISH_ORDER_BUTTON, 'Finish Order'), idOfMakeAnOrderContainer);
            appendHTMLToElement('<p id="' + ID_OF_ADD_FEEDBACK_STATUS + '"></p>', idOfMakeAnOrderContainer);
            setFinishButtonEvent(idOfMakeAnOrderContainer);
        }
    })
}

export function generateFinishOrderMessageHTML()
{
    return '<p>For finishing the order, just click the button "Finish Order"</p>';
}

export function storeListEvent()
{
    $("#" + ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST).change(function()
    {
        var feedbackStatusSelector = $("#" + ID_OF_ADD_FEEDBACK_STATUS);
        feedbackStatusSelector.text("");
    });
}
export function setFinishButtonEvent(idOfMakeAnOrderContainer)
{
    $("#" + ID_OF_FINISH_ORDER_BUTTON).click(function() {
        closeOrderAndAddToHistory(idOfMakeAnOrderContainer);
    });
}

export function closeOrderAndAddToHistory(idOfMakeAnOrderContainer)
{
    $.ajax({
        method:'POST',
        data:{},
        url: CLOSE_ORDER_AND_ADD_TO_HISTORY_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
          //  alert('error in closeOrderAndAddToHistory\n' + e);
        },
        success: function(r) {
            console.log("Succesfully!!!");
            emptyElementByID(ID_OF_MAKE_AN_ORDER_BODY);
            appendHTMLToElement('<br><p style="color:green;">Order finished successfully! </p>',ID_OF_MAKE_AN_ORDER_BODY);
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
    return '<input type="text" id=' + ID_OF_FEEDBACK_TEXT_FIELD + ' name="feedback"><br><br>';
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
        var grade = getValueOfGrade();

        //Active servlet that add feedback to store
        $.ajax({
            method:'POST',
            data:{"storeID" : storeID,"feedbackText":feedbackText,"grade":grade},
            url: ADD_FEEDBACK_URL,
            dataType: "json",
            timeout: 4000,
            error: function(e) {
                console.error(e);
              //  alert('error in setAddFeedbackButtonEvent\n' + e);
            },
            success: function(r) {
                console.log("Succesfully!!!");
                var feedbackStatusSelector = $("#" + ID_OF_ADD_FEEDBACK_STATUS);
                feedbackStatusSelector.css('color', 'green');
                feedbackStatusSelector.text("Feedback added successfully");
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

    return '<table class ="plusAndMinus">' +
        '<tr class="noBorder">' +
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
        var feedbackStatusSelector = $("#" + ID_OF_ADD_FEEDBACK_STATUS);
        feedbackStatusSelector.text("");
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
        var feedbackStatusSelector = $("#" + ID_OF_ADD_FEEDBACK_STATUS);
        feedbackStatusSelector.text("");
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

export function setStoreOrdersListInDropDownInOrder(storeOrdersList)
{
    var storeOrdersListString = JSON.stringify(storeOrdersList);
   // alert("in setStoreOrdersListInDropDownInOrder and the storeOrdersList json is: " + storeOrdersListString);
    $.each(storeOrdersList || [], function(index, storeOrder) {
        var storeID = storeOrder["serialNumber"];
        var storeName = storeOrder["name"];
        console.log("Adding storeOrder #" + storeID + ": " + storeName);
        var optionHTML = "<option value=" + storeID + ">" + "storeID: " + storeID + ", Store Name: '" + storeName + "'</option>";
        appendHTMLToElement(optionHTML, ID_OF_CHOOSE_STORE_ORDER_IN_DROP_DOWN_LIST);

    });
}