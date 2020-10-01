package logic.discount;

import jaxb.schema.generated.SDMDiscount;
import jaxb.schema.generated.ThenYouGet;

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

    public boolean checkIfDiscountContainsItemFromListOfItems(Collection<Integer> listOfItems)
    {
        return listOfItems.stream().filter(x-> ifYouBuySDM.checkItemIDEqualTo(x)).collect(Collectors.toList()).isEmpty() == false;
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
