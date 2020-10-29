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

    public void addAlertToList(Alert alert)
    {
        listOfAlerts.add(alert);
    }

    public List<Alert> getAlertsList() {
        return listOfAlerts;
    }
}
