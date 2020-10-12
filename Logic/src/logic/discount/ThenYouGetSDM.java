package logic.discount;

import jaxb.schema.generated.SDMOffer;
import jaxb.schema.generated.ThenYouGet;

import java.util.ArrayList;
import java.util.List;

public class ThenYouGetSDM {

    private List<Offer> offerList;
    private String operator;

    public ThenYouGetSDM(ThenYouGet thenYouGet)
    {
        this.operator = thenYouGet.getOperator();
        offerList = new ArrayList<Offer>();
    }

    public ThenYouGetSDM(ThenYouGetSDM thenYouGet)
    {
        this.operator = thenYouGet.getOperator();
        offerList = new ArrayList<Offer>();
        for(Offer offer : thenYouGet.getOfferList())
        {
            offerList.add(offer);
        }
    }

    public ThenYouGetSDM()
    {
        offerList = new ArrayList<Offer>();
    }

    public void addOfferToListFromSDMOffer(SDMOffer sdmOffer)
    {
        Offer sdmOfferToAdd = new Offer(sdmOffer);
        offerList.add(sdmOfferToAdd);
    }

    public void addOfferToListFromSDMOffer(Offer offer) {
        offerList.add(offer);
    }


        public List<Offer> getOfferList() {
        return offerList;
    }

    public String getOperator() {
        return operator;
    }

    public void setOperator(String operator) {
        this.operator = operator;
    }
}
