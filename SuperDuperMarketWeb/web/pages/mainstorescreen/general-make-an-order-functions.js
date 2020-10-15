const ID_OF_MAKE_ORDER_BODY = "makeOrderBody";
const ID_OF_ADD_ITEM_TO_ORDER = 'addItemToOrder';
const ID_OF_NEXT_BUTTON = "nextButton";

export function emptyMakeOrderBody()
{
    $( "#makeOrderBody" ).empty();
}

export function createHTMLElementAndAppendToMakeOrderBody(idOfElementToCreate)
{
    var itemElement = '<div id=' + idOfElementToCreate + '></div>';
    appendHTMLToMakeAndOrderBody(itemElement);
}

export function createButton(idOfButton, valueOfButton)
{
    return '<button type="button" id=' + idOfButton + '> ' + valueOfButton + '</button>';
}

export function createEmptyDropDownListHTML(forName, headline, idOfDropDownList)
{
    return '<form>' +
        '<label for=' + forName + '>' + headline + '</label>'+
        '<select name=' + idOfDropDownList + ' id=' + idOfDropDownList + '>' +
        '</select>' +
        '</form>';
}

export function disableElement(idOfElement)
{
    $('#' + idOfElement).prop("disabled",true);
}

export function enableElement(idOfElement)
{
    $('#' + idOfElement).prop("disabled",false);

}

export function createEmptyTable(idOfTable, idOfTableBody)
{
    return '<table id=' + idOfTable + '>' +
            '<tbody id =' + idOfTableBody + '></tbody>' +
        '</table>';
}

export function appendHTMLToMakeAndOrderBody(itemElement)
{
    var makeOrderBody = $("#" + ID_OF_MAKE_ORDER_BODY);
    $(itemElement).appendTo(makeOrderBody);

}

export function appendHTMLToElement(htmlToAppend, IdOfElementToAppendTo)
{
    var elementToAppendTo = $("#" + IdOfElementToAppendTo);
    $(htmlToAppend).appendTo(elementToAppendTo);

}

export function createNextButtonHTMLAndAppendToMakeOrderBody()
{
    var nextButtonHTML = createButton(ID_OF_NEXT_BUTTON,"Next");
    appendHTMLToMakeAndOrderBody(nextButtonHTML);
    disableElement(ID_OF_NEXT_BUTTON);
}