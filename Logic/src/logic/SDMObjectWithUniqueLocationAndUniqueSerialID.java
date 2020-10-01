package logic;

public class SDMObjectWithUniqueLocationAndUniqueSerialID extends SDMObjectWithUniquieSerialID{

    private SDMLocation sdmLocation;

    public SDMObjectWithUniqueLocationAndUniqueSerialID(Integer serialNumber, String name, SDMLocation sdmLocation)
    {
        super(serialNumber, name);
        this.sdmLocation = sdmLocation;
    }

    public SDMLocation getLocation() {
        return sdmLocation;
    }
}
