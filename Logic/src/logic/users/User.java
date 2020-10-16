package logic.users;

import logic.order.CustomerOrder.OpenedCustomerOrder;

public class User {
    String userName;
    String userType;
    Account account;
    OpenedCustomerOrder currentOrder;
    
    public User(String name, String userType)
    {
        this.userName = name;
        this.userType = userType;
        this.account = new Account();
    }

    public String getUserName() {
        return userName;
    }

    public String getUserType() {
        return userType;
    }

    public Account getAccount() {
        return account;
    }
    public void setCurrentOpenedOrder(OpenedCustomerOrder openedCustomerOrder)
    {
        this.currentOrder = openedCustomerOrder;
    }

    public OpenedCustomerOrder getCurrentOrder() {return currentOrder;};
}
