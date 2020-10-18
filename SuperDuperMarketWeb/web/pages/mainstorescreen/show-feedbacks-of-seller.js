import {
    createEmptyTable,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

const GET_FEEDBACKS_DETAILS_URL = buildUrlWithContextPath("get-feedbacks-in-zone-by-seller-name");
//ID's of HTML Elements
const ID_OF_FEEDBACKS_TABLE = "storeOrdersTable";
const ID_OF_FEEDBACKS_TABLE_BODY = "storeOrdersTableBody";
const ID_OF_SHOW_FEEDBACKS_CONTAINER = 'showFeedbacksContainer';
/*
    this.customerName = customerName;
                this.orderDate = orderDate;
                this.rating = rating;
                this.feedbackText = feedbackText;
 */

export function initiateShowFeedbacksInCertainZone()
{
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_FEEDBACKS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateShowFeedbacksInCertainZone\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_FEEDBACKS_TABLE);
            appendHTMLToElement(createEmptyTable(ID_OF_FEEDBACKS_TABLE, ID_OF_FEEDBACKS_TABLE_BODY), ID_OF_SHOW_FEEDBACKS_CONTAINER);
            setFeedbacksListInTable(r);
        }
    })
}

export function setFeedbacksListInTable(feedbacksList)
{
    appendHTMLToElement(generateFirstRowInFeedbacksHTMLTable(),ID_OF_FEEDBACKS_TABLE_BODY);
    $.each(feedbacksList || [], function(index, feedback) {
        console.log("Adding feedback #" + index);
        // alert("Adding item #" + itemStr + ": " + itemName + "\n" + itemJson);
        appendHTMLToElement(generateRowInFeedbacksHTMLTable(feedback),ID_OF_FEEDBACKS_TABLE_BODY);
    });
}

/*
    this.customerName = customerName;
                this.orderDate = orderDate;
                this.rating = rating;
                this.feedbackText = feedbackText;
 */
export function generateFirstRowInFeedbacksHTMLTable()
{
    return "<tr><th>Customer name</th>" +
        "<th>Date</th>" +
        "<th>Rating</th>" +
        "<th>Feedback text</th>";
}

export function generateRowInFeedbacksHTMLTable(feedback)
{
    var customerName = feedback["customerName"];
    var orderDate = feedback["orderDate"];
    var rating = feedback["rating"];
    var feedbackText = feedback["feedbackText"];
    alert("<tr><th>" + customerName + "</th>" +
        "<th>" + orderDate + "</th>" +
        "<th>" + rating + "</th>" +
        "<th>" + feedbackText + "</th>");

    return "<tr><th>" + customerName + "</th>" +
        "<th>" + orderDate + "</th>" +
        "<th>" + rating + "</th>" +
        "<th>" + feedbackText + "</th>";
}
