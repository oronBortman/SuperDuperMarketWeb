var alertVersion = 0;

var GET_ALERTS_URL = buildUrlWithContextPath("get-alerts");

export function getAlertsFromServerAndUpdateOwner()
{
    $.ajax({
        method:'GET',
        data:{'alertVersion':alertVersion},
        url: GET_ALERTS_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
            alert('error in getAlertsFromServerAndUpdateOwner\n' + e);
        },
        success: function(r) {
            console.log("Succesfully!!!");
            console.log(r);
            var alertList = r["alertList"];
            var alertVersionFromServer = r["alertVersion"];
            if (alertVersionFromServer !== alertVersion) {
                alertVersion = alertVersionFromServer;
                appendToAlertsArea(alertList);
            }
        }
    });
}

export function appendToAlertsArea(alerts) {

    // add the relevant entries
    $.each(alerts || [], appendAlertEntry);

    // handle the scroller to auto scroll to the end of the chat area
    var scroller = $("#alertsArea");
    var height = scroller[0].scrollHeight - $(scroller).height();
    $(scroller).stop().animate({ scrollTop: height }, "slow");
}

export function appendAlertEntry(index, alert){
    var alertType = alert["alertType"];
    var alertElement;

    if(alertType === "order")
    {
        alertElement=createOrderAlert(alert)
    }
    else if(alertType === "feedback")
    {
        alertElement=createFeedbackAlert(alert);
    }
    else if(alertType === "newStore")
    {
        alertElement=createNewStoreAlert(alert);
    }

    $("#alertsArea").append(alertElement).append("<br>");
}

export function createOrderAlert(orderAlert)
{
    var orderId = orderAlert["orderId"]
    var customerName = orderAlert["customerName"];
    var totalItemsBought = orderAlert["totalItemsBought"];
    var totalPriceOfTtems = orderAlert["totalPriceOfTtems"];
    var totalDeliveryPrice = orderAlert["totalDeliveryPrice"];
    var storeName = orderAlert["storeName"];
    var storeSerialID = orderAlert["storeSerialID"];

    return '<pre>' +
            '<p>Order was made from your store ' + storeName + '(serialID: ' + storeSerialID + ')</p>' +
            '<p>Here are the details on the order:</p>' +
            '<p>Order ID: ' + orderId + '</p>' +
            '<p>Customer name: ' + customerName + '</p>' +
            '<p>Total items bought: ' + totalItemsBought + '</p>' +
            '<p>Total price of items: ' + totalPriceOfTtems + '</p>' +
            '<p>Total delivery price: ' + totalDeliveryPrice + '</p>' +
            '</pre>';
}

export function createFeedbackAlert(feedbackAlert)
{
    var customerName = feedbackAlert["customerName"];
    var orderDate = feedbackAlert["orderDate"];
    var rating = feedbackAlert["rating"];
    var feedbackText = feedbackAlert["feedbackText"];
    var storeName = feedbackAlert["storeName"];
    var storeSerialID = feedbackAlert["storeSerialID"];

    return '<pre>' +
        '<p>There is new feedback on your store ' + storeName + '(serialID: ' + storeSerialID + ')</p>' +
        '<p>Here are the details of the feedback:</p>' +
        '<p>Customer name: ' + customerName + '</p>' +
        '<p>Order Date: ' + orderDate + '</p>' +
        '<p>Rating: ' + rating + '</p>' +
        '<p>Feedback: ' + feedbackText + '</p>' +
        '</pre>';
}

export function createNewStoreAlert(newStoreAlert)
{
    var storeOwner = newStoreAlert["storeOwner"];
    var storeName = newStoreAlert["storeName"];
    var storeLocation = newStoreAlert["storeLocation"];
    var totalItemsStoreSells = newStoreAlert["totalItemsStoreSells"];
    var totalItemsInZone = newStoreAlert["totalItemsInZone"];

    return '<pre>' +
        '<p>There is new store in your zone</p>' +
        '<p>Here are the details of the store:</p>' +
        '<p>Store owner: ' + storeOwner + '</p>' +
        '<p>Store name: ' + storeName + '</p>' +
        '<p>Store Location: ' + storeLocation + '</p>' +
        '<p>Total Items Store Sells\Total Items In Zone: ' + totalItemsStoreSells + '\\' + totalItemsInZone + '</p>' +
        '</pre>';
}