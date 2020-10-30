package logic.discount;

import jaxb.schema.generated.SDMDiscount;
import jaxb.schema.generated.ThenYouGet;
import logic.order.itemInOrder.OrderedItemFromStore;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class Discount {
    String name;
    IfYouBuySDM ifYouBuySDM;
    ThenYouGetSDM thenYouGet;

    public Discount(String name, IfYouBuySDM ifYouBuySDM, ThenYouGetSDM thenYouGetSDM)
    {
        this.name = name;
        this.ifYouBuySDM = ifYouBuySDM;
        this.thenYouGet = new ThenYouGetSDM(thenYouGetSDM);
    }

    public Discount(String name)
    {
        this.name = name;
    }

    public boolean checkIfDiscountContainsItemFromListOfItems(Collection<OrderedItemFromStore> listOfItems)
    {
        return !listOfItems.stream().filter(x -> (ifYouBuySDM.checkItemIDEqualTo(x.getSerialNumber()) && ifYouBuySDM.getQuantity() == x.getTotalAmountOfItemOrderedByTypeOfMeasure()))
                .collect(Collectors.toList()).isEmpty();
    }

    public IfYouBuySDM getIfYouBuySDM() {
        return ifYouBuySDM;
    }

    public ThenYouGetSDM getThenYouGet() {
        return thenYouGet;
    }

    public String getName() {
        return name;
    }
}
