package logic;

import javafx.beans.property.SimpleIntegerProperty;
import javafx.beans.property.SimpleStringProperty;

public class Item {
    private Integer serialNumber;
    private SimpleStringProperty name;
    private TypeOfMeasure typeToMeasureBy;

    public enum TypeOfMeasure{
        Quantity("Quantity"),
        Weight("Weight");

        TypeOfMeasure(String meaning)
        {
            this.meaning = meaning;
        }

        private String meaning;

        public static TypeOfMeasure convertStringToEnum(String meaning)
        {
            if(Quantity.meaning.toLowerCase().equals(meaning.toLowerCase()))
            {
                return Quantity;
            }
            else if(Weight.meaning.toLowerCase().equals(meaning.toLowerCase()))
            {
                return Weight;
            }
            else
            {
                return null;
            }
        }

        public String getMeaning() {
            return meaning;
        }

    }

    public Item(Integer serialNumber, String name, TypeOfMeasure itemPurchaseCategory)
    {
        this.serialNumber = serialNumber;
        this.name = new SimpleStringProperty(name);
        this.typeToMeasureBy = itemPurchaseCategory;
    }

    public Item(jaxb.schema.generated.SDMItem item)
    {
        this.serialNumber = item.getId();

        this.name = new SimpleStringProperty(item.getName());
        String itemPurchaseCategoryStr = item.getPurchaseCategory();
        Item.TypeOfMeasure itemPurchaseCategory = Item.TypeOfMeasure.convertStringToEnum(itemPurchaseCategoryStr);
        this.typeToMeasureBy = itemPurchaseCategory;
    }

    public Item(Item item)
    {
        this.serialNumber = item.getSerialNumber();

        this.name =  new SimpleStringProperty(item.getName());
        this.typeToMeasureBy = item.getTypeOfMeasure();
    }
    public String getName()
    {
        return name.get();
    }

    public Integer getSerialNumber()
    {
        return serialNumber;
    }

    public String getTypeOfMeasureStr()
    {
        return typeToMeasureBy.getMeaning();
    }

    public TypeOfMeasure getTypeOfMeasure()
    {
        return typeToMeasureBy;
    }

}
