package exceptions.locationsIdentialException;

import logic.SDMObjectWithUniqueLocationAndUniqueSerialID;

public class IdentialLocationException extends Exception{

    SDMObjectWithUniqueLocationAndUniqueSerialID firstObject;
    SDMObjectWithUniqueLocationAndUniqueSerialID secondObject;

    public IdentialLocationException(SDMObjectWithUniqueLocationAndUniqueSerialID firstObject, SDMObjectWithUniqueLocationAndUniqueSerialID secondObject)
    {
        this.firstObject = firstObject;
        this.secondObject = secondObject;
    }


    public SDMObjectWithUniqueLocationAndUniqueSerialID getFirstObject() {
        return firstObject;
    }

    public SDMObjectWithUniqueLocationAndUniqueSerialID getSecondObject() {
        return secondObject;
    }
}
