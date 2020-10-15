package exceptions.notExistException;

import logic.Item;

public class ItemNotExistInStoresException extends Exception{
    Integer serialID;
    String itemName;
    public ItemNotExistInStoresException(Integer serialID, String itemName)
    {
        this.serialID = serialID;
        this.itemName = itemName;
    }

    public Integer getSerialID() {
        return serialID;
    }

    public String getItemName() {
        return itemName;
    }
}
