package logic;

public class SDMObjectWithUniquieSerialID {

    private Integer serialNumber;
    private String name;

    public SDMObjectWithUniquieSerialID(Integer serialNumber, String name)
    {
        this.serialNumber = serialNumber;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public Integer getSerialNumber() {
        return serialNumber;
    }
}
