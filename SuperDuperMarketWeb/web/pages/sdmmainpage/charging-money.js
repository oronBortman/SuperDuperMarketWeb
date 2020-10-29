
var CHARGE_MONEY_URL = buildUrlWithContextPath("charge-money");

var detailsOnZoneJSONFormat = JSON.parse(localStorage.getItem('detailsOnZone'));
//var zoneName = detailsOnZoneJSONFormat.zoneName;

const ID_OF_CHARGING_MONEY_TEXT_FIELD = 'chargingMoneyTextField';
const ID_OF_DATE_OF_CHARGING_MONEY = 'dateOfChargingMoney';
const ID_OF_DATE_ERROR = 'dateError';
const ID_OF_MONEY_ERROR = 'moneyError';
const ID_OF_RESULT_OF_CHARGING_MONEY = 'resultOfChargingMoney';

export function setChargingMoneyButtonEvent() { // onload...do
    console.log("In setChargingMoneyButtonEvent");
    $("#chargingMoneyButton").click(function() {

        var amountOfMoneyToCharge = $('#' + ID_OF_CHARGING_MONEY_TEXT_FIELD).val();
        var date = $("#" + ID_OF_DATE_OF_CHARGING_MONEY).val();

        $("#" + ID_OF_DATE_ERROR).text("");
        $("#" + ID_OF_MONEY_ERROR).text("");
        $("#" + ID_OF_RESULT_OF_CHARGING_MONEY).text("");

        if(date === "")
        {
            //alert("date is not selected!");
            $("#" + ID_OF_DATE_ERROR).text("Error:field is empty!");
        }
        else if(amountOfMoneyToCharge === '')
        {
            //  alert('PPK is empty')
            $("#" + ID_OF_MONEY_ERROR).css('color', 'red');
            $("#" + ID_OF_MONEY_ERROR).text("Error: field is empty!");
        }
        else if(isNaN(amountOfMoneyToCharge))
        {
            //  alert("You didn't enter a number in PPK");
            $("#" + ID_OF_MONEY_ERROR).css('color', 'red');
            $("#" + ID_OF_MONEY_ERROR).text("Error: You didn't enter a number");
        }
        else if(amountOfMoneyToCharge < 0)
        {
            //   alert("PPK x needs to be a non-negative number");
            $("#" + ID_OF_MONEY_ERROR).css('color', 'red');
            $("#" + ID_OF_MONEY_ERROR).text("Error: Needs to be a non-negative number");
        }
        else
        {
            chargingMoneyToCustomer(amountOfMoneyToCharge,date)
        }
    })
}
export function chargingMoneyToCustomer(amountOfMoneyToCharge, date)
{
    $.ajax({
        method:'GET',
        data:{"date":date,"amountOfMoneyToCharge":amountOfMoneyToCharge},
        url: CHARGE_MONEY_URL,
        dataType: "json",
        timeout: 4000,
        error: function(e) {
            console.error(e);
            alert('error in ChargingMoney\n' + e);
        },
        success: function(r) {
            console.log("Succesfully!!!");
            $("#" + ID_OF_RESULT_OF_CHARGING_MONEY).css('color', 'green');
            $("#" + ID_OF_RESULT_OF_CHARGING_MONEY).text("Charged money to account successfully");
            console.log(r);

        }
    });
}