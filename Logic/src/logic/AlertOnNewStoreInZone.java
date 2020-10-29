package logic;

public class AlertOnNewStoreInZone implements Alert
{
    Store store;
    Integer totalItemsStoreSells;
    Integer totalItemsInZone;
    public AlertOnNewStoreInZone(Store store, Integer totalItemsStoreSells, Integer totalItemsInZone)
    {
        this.store = store;
        this.totalItemsStoreSells = totalItemsStoreSells;
        this.totalItemsInZone = totalItemsInZone;
    }

    public Store getStore() {
        return store;
    }

    public Integer getTotalItemsInZone() {
        return totalItemsInZone;
    }

    public Integer getTotalItemsStoreSells() {
        return totalItemsStoreSells;
    }
}
