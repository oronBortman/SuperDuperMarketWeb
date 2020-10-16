/**
 * Created by oronbortman on 15/10/2020.
 */

import {emptyMakeOrderBody,
    createNextButtonHTMLAndAppendToMakeOrderBody,
    createEmptyTable,
    appendHTMLToElement,
    appendHTMLToMakeAndOrderBody} from "./general-make-an-order-functions.js";

import {prepareAndInitiateChoosingDiscountsToApply} from "./choosing-discounts-to-apply.js";

const GET_STORES_STATUS_IN_DYNAMIC_ORDER_URL = buildUrlWithContextPath("get-stores-status-in-dynamic-order");

const ID_OF_NEXT_BUTTON = "nextButton";
const ID_OF_TABLE = "storesStatusTable";
const ID_OF_TABLE_BODY = "storesStatusTableBody";


export function initiateShowStoresStatusTable()
{
    alert('inside initiateShowStoresStatusTable')
    emptyMakeOrderBody();
    //var storesStatusTableHTML = createStoresStatusTableHTML();
    createStoresTableAndAppendToMakeAndOrderElement();
    //appendHTMLToMakeAndOrderBody(storesStatusTableHTML);
    createNextButtonHTMLAndAppendToMakeOrderBody();
    setNextButtonEvent();
}

export function setNextButtonEvent()
{
    $('#' + ID_OF_NEXT_BUTTON).change(function () {
        alert("Clicked on next!");
        prepareAndInitiateChoosingDiscountsToApply('dynamic');
    });
}
export function createStoresTableAndAppendToMakeAndOrderElement()
{
    alert('In getStoresStatusListFromServer');
    $.ajax({
        method: 'GET',
        data: {},
        url: GET_STORES_STATUS_IN_DYNAMIC_ORDER_URL,
        dataType: "json",
        timeout: 4000,
        error: function (e) {
            console.error(e);
            alert('error in  getStoresStatusInDynamicOrder\n' + e);
        },
        success: function (r) {
            alert("Succeed\n" + r);
            var storesStatusTableHTML = createEmptyTable(ID_OF_TABLE, ID_OF_TABLE_BODY);
            appendHTMLToMakeAndOrderBody(storesStatusTableHTML);
            appendHTMLToElement(generateFirstRowInStoresHTMLTable(),ID_OF_TABLE_BODY);
            // rebuild the list of users: scan all users and add them to the list of users
            $.each(r || [], function(index, store) {
               // alert("Adding store for #" + index + ": " +  store["storeID"] +  " " + store["storeName"]);
                appendHTMLToElement(generateRowInStoresHTMLTable(store),ID_OF_TABLE_BODY);
            });
        }
    })
}

export function generateFirstRowInStoresHTMLTable()
{
    return "<tr><th>storeID</th>" +
        "<th>store Name</th>" +
        "<th>store Owner</th>" +
        "<th>location</th>" +
        "<th>distance From Customer</th>" +
        "<th>PPK</th>" +
        "<th>deliveryCost</th>" +
        "<th>amountOfItemsPurchased</th>" +
        "<th>totalPriceOfItems</th></tr>";
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

    return "<tr><th>" + storeID + "</th>" +
        "<th>" + storeName + "</th>" +
        "<th>" + storeOwner + "</th>" +
        "<th>" + location + "</th>" +
        "<th>" + distanceFromCustomer + "</th>" +
        "<th>" + PPK + "</th>" +
        "<th>" + deliveryCost + "</th>" +
        "<th>" + amountOfItemsPurchased + "</th>" +
        "<th>" + totalPriceOfItems + "</th></tr>"
}
