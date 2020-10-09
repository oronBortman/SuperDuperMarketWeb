package logic.users;

public class User {
    String userName;
    String userType;
    Account account;
    
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
}
