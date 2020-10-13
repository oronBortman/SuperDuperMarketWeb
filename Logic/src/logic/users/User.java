package logic.users;

import logic.order.CustomerOrder.OpenedCustomerOrder;
import logic.order.CustomerOrder.OpenedCustomerOrder1;
import logic.order.Order;

public class User {
    String userName;
    String userType;
    Account account;
    OpenedCustomerOrder1 currentOrder;
    
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
    public void setCurrentOpenedOrder(OpenedCustomerOrder1 openedCustomerOrder)
    {
        this.currentOrder = openedCustomerOrder;
    }

    public OpenedCustomerOrder1 getCurrentOrder() {return currentOrder;};
}
