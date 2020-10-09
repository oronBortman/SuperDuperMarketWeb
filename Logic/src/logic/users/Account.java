package logic.users;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

public class Account {
    int amountOfMoneyInAccount;
    Set<ActionOnAccount> historyOfActionsOnAccountSet;
    Account()
    {
        amountOfMoneyInAccount=0;
        this.historyOfActionsOnAccountSet = new HashSet();
    }

    public void transferMoney(Date date, User userToTransferMoneyTo, int amountOfMoneyToTransfer)
    {
        int amountOfMoneyBeforeTransfer = amountOfMoneyInAccount;
        int amountOfMoneyAfterTransfer = amountOfMoneyInAccount - amountOfMoneyToTransfer;
        amountOfMoneyInAccount=amountOfMoneyAfterTransfer;
        userToTransferMoneyTo.getAccount().gettingMoney(date, amountOfMoneyToTransfer);
        createActionAndAddItToHistoryMap(date, amountOfMoneyToTransfer,amountOfMoneyBeforeTransfer, amountOfMoneyAfterTransfer, ActionOnAccount.TypeOfActionInAccount.TransferMoney);
    }

    public void gettingMoney(Date date, int amountOfMoneyTheUserGave)
    {
        int amountOfMoneyBeforeGettingMoney = amountOfMoneyInAccount;
        int amountOfMoneyAfterGettingMoney= amountOfMoneyInAccount + amountOfMoneyTheUserGave;
        amountOfMoneyInAccount=amountOfMoneyAfterGettingMoney;
        createActionAndAddItToHistoryMap(date, amountOfMoneyTheUserGave,amountOfMoneyBeforeGettingMoney, amountOfMoneyAfterGettingMoney, ActionOnAccount.TypeOfActionInAccount.GettingMoney);
    }

    public void chargingMoney(Date date, int amountOfMoneyToAdd)
    {
        int amountOfMoneyBeforeChargingMoney = amountOfMoneyInAccount;
        int amountOfMoneyAfterChargingMoney= amountOfMoneyInAccount + amountOfMoneyToAdd;
        amountOfMoneyInAccount=amountOfMoneyAfterChargingMoney;
        createActionAndAddItToHistoryMap(date, amountOfMoneyToAdd, amountOfMoneyBeforeChargingMoney, amountOfMoneyAfterChargingMoney, ActionOnAccount.TypeOfActionInAccount.ChargingMoney);
    }

    public void createActionAndAddItToHistoryMap(Date date, int amountOfMoneyInAction, int amountOfMoneyBeforeAction, int amountOfMoneyAfterAction, ActionOnAccount.TypeOfActionInAccount typeOfActionInAccount)
    {
        historyOfActionsOnAccountSet.add(new ActionOnAccount(date, amountOfMoneyInAction, amountOfMoneyBeforeAction, amountOfMoneyAfterAction, typeOfActionInAccount));
    }


}
