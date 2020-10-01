package exceptions.duplicateSerialID;

public class DuplicateItemSerialIDInStoreException extends Exception{
    String storeName=null;
    int storeSerialId;
    String itemName=null;
    int itemSerialId;

    public DuplicateItemSerialIDInStoreException(int storeSerialId, String storeName, int itemSerialId, String itemName )
    {
        this.storeSerialId = storeSerialId;
        this.storeName = storeName;
        this.itemSerialId = itemSerialId;
        this.itemName = itemName;
    }

    public int getItemSerialId() {
        return itemSerialId;
    }

    public int getStoreSerialId() {
        return storeSerialId;
    }

    public String getItemName() {
        return itemName;
    }

    public String getStoreName() {
        return storeName;
    }
}
