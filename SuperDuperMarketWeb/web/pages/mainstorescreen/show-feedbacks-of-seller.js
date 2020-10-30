import {
    appendHTMLToElement,
    emptyElementByID,
} from "./general-functions.js";

const GET_FEEDBACKS_DETAILS_URL = buildUrlWithContextPath("get-feedbacks-in-zone-by-seller-name");
//ID's of HTML Elements
const ID_OF_FEEDBACKS_TABLE_BODY = "feedbacksTableBody";
var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
var zoneName = detailsOnZoneJSONFormat.zoneName;

export function initiateShowFeedbacksInCertainZone()
{
    $.ajax({
        method: 'GET',
        data: {"zoneName":zoneName},
        url: GET_FEEDBACKS_DETAILS_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            //alert('error in  initiateShowFeedbacksInCertainZone\n' + e);
        },
        success: function (r) {
            emptyElementByID(ID_OF_FEEDBACKS_TABLE_BODY);
            setFeedbacksListInTable(r);
        }
    })
}

export function setFeedbacksListInTable(feedbacksList)
{
   // appendHTMLToElement(generateFirstRowInFeedbacksHTMLTable(),ID_OF_FEEDBACKS_TABLE_BODY);
    $.each(feedbacksList || [], function(index, feedback) {
        console.log("Adding feedback #" + index);
        appendHTMLToElement(generateRowInFeedbacksHTMLTable(feedback),ID_OF_FEEDBACKS_TABLE_BODY);
    });
}

export function generateRowInFeedbacksHTMLTable(feedback)
{
    var customerName = feedback["customerName"];
    var orderDate = feedback["orderDate"];
    var rating = feedback["rating"];
    var feedbackText = feedback["feedbackText"];

    return "<tr class='withBorder'><th class='withBorder'>" + customerName + "</th>" +
        "<th class='withBorder'>" + orderDate + "</th>" +
        "<th class='withBorder'>" + rating + "</th>" +
        "<th class='withBorder'>" + feedbackText + "</th>";
}