package logic;

import logic.users.User;

import java.util.ArrayList;
import java.util.List;
import java.util.Stack;

public class Seller extends User {

    List<Alert> listOfAlerts;

    public Seller(String name) {

        super(name, "seller");
        listOfAlerts = new ArrayList<>();
    }

    public synchronized void addAlertToList(Alert alert)
    {
        listOfAlerts.add(alert);
    }

    public synchronized List<Alert> getAlertsList() {
        return listOfAlerts;
    }

    public synchronized List<Alert> getAlertsList(int fromIndex){
        if (fromIndex < 0 || fromIndex > listOfAlerts.size()) {
            fromIndex = 0;
        }
        return listOfAlerts.subList(fromIndex, listOfAlerts.size());
    }

    public synchronized int getVersion() {
        return listOfAlerts.size();
    }
}
