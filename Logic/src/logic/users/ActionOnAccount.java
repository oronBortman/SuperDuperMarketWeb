package logic.users;

import java.util.Date;

public class ActionOnAccount {

    public enum TypeOfActionInAccount{
        TransferMoney("TransferMoney"),
        GettingMoney("GettingMoney"),
        ChargingMoney("ChargingMoney");

        TypeOfActionInAccount(String meaning)
        {
            this.meaning = meaning;
        }

        private String meaning;

        public static TypeOfActionInAccount convertStringToEnum(String meaning)
        {
            if(TransferMoney.meaning.toLowerCase().equals(meaning.toLowerCase()))
            {
                return TransferMoney;
            }
            else if(GettingMoney.meaning.toLowerCase().equals(meaning.toLowerCase()))
            {
                return GettingMoney;
            }
            else if(ChargingMoney.meaning.toLowerCase().equals(meaning.toLowerCase()))
            {
                return ChargingMoney;
            }
            else
            {
                return null;
            }
        }

        public String getMeaning() {
            return meaning;
        }

    }

    Date date;
    int amountOfMoneyInAction;
    int amountOfMoneyBeforeAction;
    int amountOfMoneyAfterAction;
    TypeOfActionInAccount typeOfActionInAccount;

    public ActionOnAccount(Date date, int amountOfMoneyInAction, int amountOfMoneyBeforeAction, int amountOfMoneyAfterAction, TypeOfActionInAccount typeOfActionInAccount)
    {
        this.date=date;
        this.amountOfMoneyInAction = amountOfMoneyInAction;
        this.amountOfMoneyBeforeAction=amountOfMoneyBeforeAction;
        this.amountOfMoneyAfterAction=amountOfMoneyAfterAction;
        this.typeOfActionInAccount=typeOfActionInAccount;
    }

    public Date getDate() {
        return date;
    }

    public int getAmountOfMoneyAfterAction() {
        return amountOfMoneyAfterAction;
    }

    public int getAmountOfMoneyBeforeAction() {
        return amountOfMoneyBeforeAction;
    }

    public TypeOfActionInAccount getTypeOfActionInAccount() {
        return typeOfActionInAccount;
    }
}
