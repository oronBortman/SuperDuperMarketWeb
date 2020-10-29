import {
    createEmptyTableWithBorder,
    appendHTMLToElement,
    emptyElementByID,
} from "./general-functions.js";

const GET_FEEDBACKS_DETAILS_URL = buildUrlWithContextPath("get-feedbacks-in-zone-by-seller-name");
//ID's of HTML Elements
const ID_OF_FEEDBACKS_TABLE = "feedbacksTable";
const ID_OF_FEEDBACKS_TABLE_BODY = "feedbacksTableBody";
const ID_OF_SHOW_FEEDBACKS_CONTAINER = 'showFeedbacksContainer';
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;
//alert("The zone name is: " + zoneName);
/*
    this.customerName = customerName;
                this.orderDate = orderDate;
                this.rating = rating;
                this.feedbackText = feedbackText;
 */

export function initiateShowFeedbacksInCertainZone()
{
   // var dataString = "zoneName="+zoneName;
   // alert("The zone name is: " + zoneName);
    $.ajax({
        method: 'GET',
        data: {"zoneName":zoneName},
        url: GET_FEEDBACKS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  initiateShowFeedbacksInCertainZone\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_FEEDBACKS_TABLE_BODY);
            //appendHTMLToElement(createEmptyTableWithBorder(ID_OF_FEEDBACKS_TABLE, ID_OF_FEEDBACKS_TABLE_BODY), ID_OF_SHOW_FEEDBACKS_CONTAINER);
            setFeedbacksListInTable(r);
        }
    })
}

export function setFeedbacksListInTable(feedbacksList)
{
   // appendHTMLToElement(generateFirstRowInFeedbacksHTMLTable(),ID_OF_FEEDBACKS_TABLE_BODY);
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
/*export function generateFirstRowInFeedbacksHTMLTable()
{
    return "<tr class='withBorder'><th class='withBorder'Customer name</th>" +
        "<th class='withBorder'>Date</th>" +
        "<th class='withBorder'>Rating</th>" +
        "<th class='withBorder'>Feedback text</th>";
}*/

export function generateRowInFeedbacksHTMLTable(feedback)
{
    var customerName = feedback["customerName"];
    var orderDate = feedback["orderDate"];
    var rating = feedback["rating"];
    var feedbackText = feedback["feedbackText"];
  /*  alert("<tr class='withBorder'><th class='withBorder'>" + customerName + "</th>" +
        "<th class='withBorder'>" + orderDate + "</th>" +
        "<th class='withBorder'>" + rating + "</th>" +
        "<th class='withBorder'>" + feedbackText + "</th>");*/

    return "<tr class='withBorder'><th class='withBorder'>" + customerName + "</th>" +
        "<th class='withBorder'>" + orderDate + "</th>" +
        "<th class='withBorder'>" + rating + "</th>" +
        "<th class='withBorder'>" + feedbackText + "</th>";
}
