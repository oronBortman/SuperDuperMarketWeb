package exceptions.notExistException;

import logic.Item;

public class ItemNotExistInStoresException extends Exception{
    Item item;
    public ItemNotExistInStoresException(Item item)
    {
        this.item = item;
    }

    public Item getItem() {
        return item;
    }
}
