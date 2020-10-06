package logic.users;

import static logic.common.SuperDuperMarketConstants.A;
import static logic.common.SuperDuperMarketConstants.B;

import logic.Customer;
import logic.Seller;
import java.util.*;

/*
Adding and retrieving users is synchronized and in that manner - these actions are thread safe
Note that asking if a user exists (isUserExists) does not participate in the synchronization and it is the responsibility
of the user of this class to handle the synchronization of isUserExists with other methods here on it's own
 */
public class UserManager {

    private final Map<String, User> usersMap;

    public UserManager() {
        usersMap = new HashMap<>();
    }

    public synchronized void addUser(String username, String userType) {
        if(userType.equals(A))
        {
            usersMap.put(username, new Seller(username));
        }
        else if(userType.equals(B))
        {
            usersMap.put(username, new Customer(username));
        }
    }

    public synchronized Map<String, User> getUsersMap()
    {
        return usersMap;
    }

    public synchronized User getUserByName(String name)
    {
        return usersMap.get(name);
    }

    public synchronized void removeUser(String username) {
        usersMap.remove(username);
    }

    //public synchronized Set<String> getUsers() {
      //  return Collections.unmodifiableSet(usersMap);
  //  }

    public boolean isUserExists(String username) {
        return usersMap.containsKey(username);
    }
}
