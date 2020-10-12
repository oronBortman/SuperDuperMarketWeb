package exceptions;

import logic.Store;

public class DuplicateDiscountNameException extends Exception{
    String discountName=null;
    Store store;
    public DuplicateDiscountNameException(String discountName, Store store)
    {
        this.discountName = discountName;
        this.store = store;
    }

    public String getDiscountName() {
        return discountName;
    }

    public Store getStore() {
        return store;
    }
}
