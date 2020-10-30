/**
 * Created by oronbortman on 15/10/2020.
 */

import {
    createEmptyTableWithBorder,
    appendHTMLToElement,
    emptyElementByID,
    createButton
} from "./general-functions.js";

import {prepareAndInitiateChoosingDiscountsToApply} from "./choosing-discounts-to-apply.js";

const GET_STORES_STATUS_IN_DYNAMIC_ORDER_URL = buildUrlWithContextPath("get-stores-status-in-dynamic-order");

const ID_OF_NEXT_BUTTON = "nextButton";
const ID_OF_TABLE = "storesStatusTable";
const ID_OF_TABLE_BODY = "storesStatusTableBody";


export function initiateShowStoresStatusTable(idOfMakeAnOrderContainer)
{
    emptyElementByID(idOfMakeAnOrderContainer);
    appendHTMLToElement(createEmptyTableWithBorder(ID_OF_TABLE, ID_OF_TABLE_BODY), idOfMakeAnOrderContainer);
    setStoresTable();
    appendHTMLToElement(createButton(ID_OF_NEXT_BUTTON,"Next"),idOfMakeAnOrderContainer);
    appendHTMLToElement('<br><br>',idOfMakeAnOrderContainer);
    setNextButtonEvent(idOfMakeAnOrderContainer);
}

export function setNextButtonEvent(idOfMakeAnOrderContainer)
{
    $('#' + ID_OF_NEXT_BUTTON).click(function () {
        prepareAndInitiateChoosingDiscountsToApply(idOfMakeAnOrderContainer);
    });
}

export function setStoresTable()
{
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_STORES_STATUS_IN_DYNAMIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
          //  alert('error in  setStoresTable\n' + e);
        },
        success: function (r) {
            appendHTMLToElement(generateFirstRowInStoresHTMLTable(),ID_OF_TABLE_BODY);
            $.each(r || [], function(index, store) {
                appendHTMLToElement(generateRowInStoresHTMLTable(store),ID_OF_TABLE_BODY);
            });
        }
    })
}

export function generateFirstRowInStoresHTMLTable()
{
    return "<tr class='withBorder'><th class='withBorder'>storeID</th>" +
        "<th class='withBorder'>store Name</th>" +
        "<th class='withBorder'>store Owner</th>" +
        "<th class='withBorder'>location</th>" +
        "<th class='withBorder'>distance From Customer</th>" +
        "<th class='withBorder'>PPK</th>" +
        "<th class='withBorder'>deliveryCost</th>" +
        "<th class='withBorder'>amountOfItemsPurchased</th>" +
        "<th class='withBorder'>totalPriceOfItems</th></tr>";
}


export function generateRowInStoresHTMLTable(store)
{
    var storeID = store["storeID"];
    var storeName = store["storeName"];
    var storeOwner = store["storeOwner"];
    var location = store["location"]
    var distanceFromCustomer = store["distanceFromCustomer"];
    var PPK = store["PPK"];
    var deliveryCost = store["deliveryCost"];
    var amountOfItemsPurchased = store["amountOfItemsPurchased"];
    var totalPriceOfItems = store["totalPriceOfItems"];

    return "<tr class='withBorder'><th class='withBorder'>" + storeID + "</th>" +
        "<th class='withBorder'>" + storeName + "</th>" +
        "<th class='withBorder'>" + storeOwner + "</th>" +
        "<th class='withBorder'>" + location + "</th>" +
        "<th class='withBorder'>" + distanceFromCustomer + "</th>" +
        "<th class='withBorder'>" + PPK + "</th>" +
        "<th class='withBorder'>" + deliveryCost + "</th>" +
        "<th class='withBorder'>" + amountOfItemsPurchased + "</th>" +
        "<th class='withBorder'>" + totalPriceOfItems + "</th></tr>"
}
