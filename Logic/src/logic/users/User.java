package logic.users;

public class User {
    String userName;
    String userType;
    public User(String name, String userType)
    {
        this.userName =name;
        this.userType =userType;
    }

    public String getUserName() {
        return userName;
    }

    public String getUserType() {
        return userType;
    }
}
