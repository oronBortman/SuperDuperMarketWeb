package logic.discount;

import jaxb.schema.generated.IfYouBuy;

import javax.xml.bind.annotation.XmlAttribute;

public class IfYouBuySDM {
    private double quantity;
    private int itemId;

    public IfYouBuySDM(IfYouBuy ifYouBuy)
    {
        this.quantity = ifYouBuy.getQuantity();
        this.itemId = ifYouBuy.getItemId();
    }

    public IfYouBuySDM(Integer itemId, Double quantity)
    {
        this.itemId = itemId;
        this.quantity = quantity;
    }

    public boolean checkItemIDEqualTo(int itemId)
    {
        return this.itemId == itemId;
    }

    public int getItemId() {
        return itemId;
    }

    public double getQuantity() {
        return quantity;
    }
}
