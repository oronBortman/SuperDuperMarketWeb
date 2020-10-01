package logic.discount;

import jaxb.schema.generated.SDMOffer;

import javax.xml.bind.annotation.XmlAttribute;
import java.util.Objects;

public class Offer {

    private double quantity;
    private int itemId;
    private int forAdditional;

    public Offer(SDMOffer sdmOffer)
    {
        this.quantity = sdmOffer.getQuantity();
        this.itemId = sdmOffer.getItemId();
        this.forAdditional = sdmOffer.getForAdditional();
    }


    public Offer(int itemId, double quantity, int forAdditional)
    {
        this.itemId = itemId;
        this.quantity = quantity;
        this.forAdditional = forAdditional;
    }

    public Double getQuantity() {
        return quantity;
    }

    public Integer getItemId() {
        return itemId;
    }

    public Integer getForAdditional() {
        return forAdditional;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Offer)) return false;
        Offer offer = (Offer) o;
        return Double.compare(offer.getQuantity(), getQuantity()) == 0 &&
                getItemId() == offer.getItemId() &&
                getForAdditional() == offer.getForAdditional();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getQuantity(), getItemId(), getForAdditional());
    }
}
