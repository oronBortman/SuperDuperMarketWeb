package logic.users;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Account {
    Double amountOfMoneyInAccount;
    Set<ActionOnAccount> historyOfActionsOnAccountSet;
    Account()
    {
        amountOfMoneyInAccount=0.0;
        this.historyOfActionsOnAccountSet = new HashSet();
    }

    public void transferMoney(Date date, User userToTransferMoneyTo, Double amountOfMoneyToTransfer)
    {
        Double amountOfMoneyBeforeTransfer = amountOfMoneyInAccount;
        Double amountOfMoneyAfterTransfer = amountOfMoneyInAccount - amountOfMoneyToTransfer;
        amountOfMoneyInAccount=amountOfMoneyAfterTransfer;
        userToTransferMoneyTo.getAccount().gettingMoney(date, amountOfMoneyToTransfer);
        createActionAndAddItToHistoryMap(date, amountOfMoneyToTransfer,amountOfMoneyBeforeTransfer, amountOfMoneyAfterTransfer, ActionOnAccount.TypeOfActionInAccount.TransferMoney);
    }

    public void gettingMoney(Date date, Double amountOfMoneyTheUserGave)
    {
        Double amountOfMoneyBeforeGettingMoney = amountOfMoneyInAccount;
        Double amountOfMoneyAfterGettingMoney= amountOfMoneyInAccount + amountOfMoneyTheUserGave;
        amountOfMoneyInAccount=amountOfMoneyAfterGettingMoney;
        createActionAndAddItToHistoryMap(date, amountOfMoneyTheUserGave,amountOfMoneyBeforeGettingMoney, amountOfMoneyAfterGettingMoney, ActionOnAccount.TypeOfActionInAccount.GettingMoney);
    }

    public void chargingMoney(Date date, Double amountOfMoneyToAdd)
    {
        Double amountOfMoneyBeforeChargingMoney = amountOfMoneyInAccount;
        Double amountOfMoneyAfterChargingMoney= amountOfMoneyInAccount + amountOfMoneyToAdd;
        amountOfMoneyInAccount=amountOfMoneyAfterChargingMoney;
        createActionAndAddItToHistoryMap(date, amountOfMoneyToAdd, amountOfMoneyBeforeChargingMoney, amountOfMoneyAfterChargingMoney, ActionOnAccount.TypeOfActionInAccount.ChargingMoney);
    }

    public void createActionAndAddItToHistoryMap(Date date, Double amountOfMoneyInAction, Double amountOfMoneyBeforeAction, Double amountOfMoneyAfterAction, ActionOnAccount.TypeOfActionInAccount typeOfActionInAccount)
    {
        historyOfActionsOnAccountSet.add(new ActionOnAccount(date, amountOfMoneyInAction, amountOfMoneyBeforeAction, amountOfMoneyAfterAction, typeOfActionInAccount));
    }

    public Set<ActionOnAccount> getHistoryOfActionsOnAccountSet() {
        return historyOfActionsOnAccountSet;
    }

    public Double getAmountOfMoneyInAccount() {
        return amountOfMoneyInAccount;
    }
}
