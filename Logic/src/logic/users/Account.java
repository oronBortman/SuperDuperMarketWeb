package logic.users;

import java.util.*;

public class Account {
    Double amountOfMoneyInAccount;
    List<ActionOnAccount> historyOfActionsOnAccountSet;
    Account()
    {
        amountOfMoneyInAccount=0.0;
        this.historyOfActionsOnAccountSet = new ArrayList<>();
    }

    public void transferMoney(String date, Double amountOfMoneyToTransfer)
    {
        Double amountOfMoneyBeforeTransfer = amountOfMoneyInAccount;
        Double amountOfMoneyAfterTransfer = amountOfMoneyInAccount - amountOfMoneyToTransfer;
        amountOfMoneyInAccount=amountOfMoneyAfterTransfer;
        createActionAndAddItToHistoryMap(date, amountOfMoneyToTransfer,amountOfMoneyBeforeTransfer, amountOfMoneyAfterTransfer, ActionOnAccount.TypeOfActionInAccount.TransferMoney);
    }

    public void gettingMoney(String date, Double amountOfMoneyTheUserGave)
    {
        Double amountOfMoneyBeforeGettingMoney = amountOfMoneyInAccount;
        Double amountOfMoneyAfterGettingMoney= amountOfMoneyInAccount + amountOfMoneyTheUserGave;
        amountOfMoneyInAccount=amountOfMoneyAfterGettingMoney;
        createActionAndAddItToHistoryMap(date, amountOfMoneyTheUserGave,amountOfMoneyBeforeGettingMoney, amountOfMoneyAfterGettingMoney, ActionOnAccount.TypeOfActionInAccount.GettingMoney);
    }

    public void chargingMoney(String date, Double amountOfMoneyToAdd)
    {
        Double amountOfMoneyBeforeChargingMoney = amountOfMoneyInAccount;
        Double amountOfMoneyAfterChargingMoney= amountOfMoneyInAccount + amountOfMoneyToAdd;
        amountOfMoneyInAccount=amountOfMoneyAfterChargingMoney;
        createActionAndAddItToHistoryMap(date, amountOfMoneyToAdd, amountOfMoneyBeforeChargingMoney, amountOfMoneyAfterChargingMoney, ActionOnAccount.TypeOfActionInAccount.ChargingMoney);
    }

    public void createActionAndAddItToHistoryMap(String date, Double amountOfMoneyInAction, Double amountOfMoneyBeforeAction, Double amountOfMoneyAfterAction, ActionOnAccount.TypeOfActionInAccount typeOfActionInAccount)
    {
        historyOfActionsOnAccountSet.add(new ActionOnAccount(date, amountOfMoneyInAction, amountOfMoneyBeforeAction, amountOfMoneyAfterAction, typeOfActionInAccount));
    }

    public List<ActionOnAccount> getHistoryOfActionsOnAccountList() {
        return historyOfActionsOnAccountSet;
    }

    public Double getAmountOfMoneyInAccount() {
        return amountOfMoneyInAccount;
    }
}
