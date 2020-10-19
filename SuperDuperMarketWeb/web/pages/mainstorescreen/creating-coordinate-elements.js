import {appendHTMLToElement} from "./general-functions.js";

var ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_X="minusButtonInSelectCoordX";
var ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_X = "plusButtonInSelectCoordX";
var ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_Y = "minusButtonInSelectCoordY";
var ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y = "plusButtonInSelectCoordY";
var ID_OF_TABLE_OF_ENTERING_COORDINATE_X = "tableOfEnteringCoordX";
var ID_OF_TABLE_OF_ENTERING_COORDINATE_Y = "tableOfEnteringCoordY";
var COORDINATE_X = 'x';
var COORDINATE_Y = 'y';
var INITIAL_VALUE_OF_COORDINATE = 1;

export function creatingCoordinatesHTMLAndSetEvents(idOfValueOfCoordinateXChosen, idOfValueOfCoordinateYChosen, idOfContainerToPutCoordinatesHTMLInIt)
{
    //var selectCoordinateXHTML =
    //var selectCoordinateYHTML = getSelectedCoordinateHTML(COORDINATE_Y,idOfValueOfCoordinateYChosen);
   // appendHTMLToMakeAndOrderBody(selectCoordinateXHTML,idOfValueOfCoordinateXChosen);
    //appendHTMLToMakeAndOrderBody(selectCoordinateYHTML,idOfValueOfCoordinateYChosen);
    appendHTMLToElement(getSelectedCoordinateHTML(COORDINATE_X,idOfValueOfCoordinateXChosen),idOfContainerToPutCoordinatesHTMLInIt);
    appendHTMLToElement(getSelectedCoordinateHTML(COORDINATE_Y,idOfValueOfCoordinateYChosen),idOfContainerToPutCoordinatesHTMLInIt)

    setMinusButtonOnCoordinate(COORDINATE_X,idOfValueOfCoordinateXChosen);
    setPlusButtonOnCoordinate(COORDINATE_X,idOfValueOfCoordinateXChosen);
    setMinusButtonOnCoordinate(COORDINATE_Y,idOfValueOfCoordinateYChosen);
    setPlusButtonOnCoordinate(COORDINATE_Y,idOfValueOfCoordinateYChosen);
}

export function getSelectedCoordinateHTML(typeOfCoordinate, idOfValueOfCoordinateChosen)
{
    var idOfTableOfEnteringCoordinate;
    var idOfMinusButtonOfCoordinate;
    var idOfPlusOfCoordinate;
    var idOfValueCoordinateChosen = idOfValueOfCoordinateChosen;

    if(typeOfCoordinate === COORDINATE_X)
    {
        idOfTableOfEnteringCoordinate = ID_OF_TABLE_OF_ENTERING_COORDINATE_X;
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_X;
        idOfPlusOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_X;
    }
    else if(typeOfCoordinate === COORDINATE_Y)
    {
        idOfTableOfEnteringCoordinate = ID_OF_TABLE_OF_ENTERING_COORDINATE_Y;
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_Y;
        idOfPlusOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y;
    }

    return '<p>Please Enter Cooridnate ' + typeOfCoordinate +'</p> ' +
        '<table class =' + idOfTableOfEnteringCoordinate + '>' +
        '<tr>' +
        '<th><button type="button" id=' + idOfMinusButtonOfCoordinate + '>-</button></th>' +
        '<th><p id=' + idOfValueCoordinateChosen + '>' + INITIAL_VALUE_OF_COORDINATE + '</p></th>' +
        '<th><button type="button" id=' + idOfPlusOfCoordinate + '>+</button></th>' +
        '</tr>' +
        '</table>';
}


//TODO
export function setMinusButtonOnCoordinate(typeOfCoordinate, idOfValueOfCoordinateChosen)
{
    console.log("inside setMinusButtonOnCoordinate function")
    var idOfMinusButtonOfCoordinate;

    if(typeOfCoordinate === COORDINATE_X)
    {
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_X;
    }
    else if(typeOfCoordinate === COORDINATE_Y)
    {
        idOfMinusButtonOfCoordinate = ID_OF_MINUS_BUTTON_IN_SELECT_COORIDNATE_Y;
    }
    $("#" + idOfMinusButtonOfCoordinate).click(function() {
        var coordinateValueNum=getValueOfCoordinateChosen(idOfValueOfCoordinateChosen);
        console.log("Coordinate value before checking the value: " + coordinateValueNum);
        if(coordinateValueNum > INITIAL_VALUE_OF_COORDINATE)
        {
            console.log("Coordinate value before changing the value: " + coordinateValueNum);
            coordinateValueNum=coordinateValueNum-1;
            console.log("Coordinate value after clicking on minus button: " + coordinateValueNum);
            applyValueOnCoordinate(coordinateValueNum, idOfValueOfCoordinateChosen);
        }
    });
}

export function getValueOfCoordinateChosen(idOfValueCoordinateChosen)
{
    var coordinateValueNumStr =  $("#" + idOfValueCoordinateChosen).text();
    return  parseInt(coordinateValueNumStr);
}

export function applyValueOnCoordinate(value, idOfValueCoordinateChosen)
{
    $("#" + idOfValueCoordinateChosen).text(value);

}
//TODO
export function setPlusButtonOnCoordinate(typeOfCoordinate, idOfValueOfCoordinateChosen) {
    console.log("inside setPlusButtonOnCoordinate");
    var idOfPlusButtonOfCoordinate;

    if (typeOfCoordinate === COORDINATE_X) {
        idOfPlusButtonOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_X;
    } else if (typeOfCoordinate === COORDINATE_Y) {
        idOfPlusButtonOfCoordinate = ID_OF_PLUS_BUTTON_IN_SELECT_COORIDNATE_Y;
    }
    $("#" + idOfPlusButtonOfCoordinate).click(function () {
        var coordinateValueNum = getValueOfCoordinateChosen(idOfValueOfCoordinateChosen);
        console.log("Coordinate value before checking the value: " + coordinateValueNum);
        if (coordinateValueNum < 50) {
            // alert($("#" + idOfValueCoordinateChosen).text());
            console.log("Coordinate value before changing the value: " + coordinateValueNum);
            coordinateValueNum = coordinateValueNum + 1;
            console.log("Coordinate value after clicking on plus button: " + coordinateValueNum);
            applyValueOnCoordinate(coordinateValueNum, idOfValueOfCoordinateChosen);
            // alert($("#" + idOfValueCoordinateChosen).text());

        }
    });
}
