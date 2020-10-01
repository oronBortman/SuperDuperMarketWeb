package exceptions.duplicateSerialID;

public class DuplicateStoreSerialIDException extends DuplicateSerialIDExceptionInSDM{

    public DuplicateStoreSerialIDException(int serialId, String name)
    {
        super(serialId, name);
    }
}
