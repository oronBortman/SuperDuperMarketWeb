export function emptyElementByID(idOfElement)
{
    $( "#" + idOfElement ).empty();

}
export function createEmptyHTMLContainer(idOfElementToCreate)
{
    return'<div id=' + idOfElementToCreate + '></div>';
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

export function createEmptyForm(idOfForm)
{
    return '<form id=' + idOfForm + '>' + '</form>';
}

