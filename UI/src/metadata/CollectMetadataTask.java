package metadata;

import commonUI.*;
import exceptions.*;
import exceptions.InvalidCoordinateException.InvalidCoordinateXOfCustomerException;
import exceptions.InvalidCoordinateException.InvalidCoordinateXOfStoreException;
import exceptions.InvalidCoordinateException.InvalidCoordinateYOfCustomerException;
import exceptions.InvalidCoordinateException.InvalidCoordinateYOfStoreException;
import exceptions.duplicateSerialID.DuplicateCustomerSerialIDException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDInStoreException;
import exceptions.duplicateSerialID.DuplicateStoreSerialIDException;
import exceptions.locationsIdentialException.CustomerLocationIsIdenticalToCustomerException;
import exceptions.locationsIdentialException.CustomerLocationIsIdenticalToStoreException;
import exceptions.locationsIdentialException.StoreLocationIsIdenticalToCustomerException;
import exceptions.locationsIdentialException.StoreLocationIsIdenticalToStoreException;
import exceptions.notExistException.*;
import javafx.concurrent.Task;
import java.io.*;
import java.util.List;
import java.util.function.Consumer;
import jaxb.schema.generated.*;
import logic.BusinessLogic;
import logic.order.GeneralMethods;
import javax.xml.bind.JAXBException;

public class CollectMetadataTask extends Task<Boolean> {

    private String fileName;
    private Consumer<Runnable> onCancel;
    private BusinessLogic businessLogic;
    private List<SDMItem> items;
    private List<SDMStore> stores;
    private List<SDMCustomer> customers;
    private Consumer<String> errorMessage;

    private final int SLEEP_TIME = 1000;

    public CollectMetadataTask(String fileName, Consumer<Runnable> onCancel, BusinessLogic businessLogic) {
        this.fileName = fileName;
        this.onCancel = onCancel;
        this.businessLogic = businessLogic;
    }

    public void readListsFromXML() throws FileNotFoundException, JAXBException {
        InputStream inputStream = new FileInputStream(fileName);
        SuperDuperMarketDescriptor descriptor = GeneralMethods.deserializeFrom(inputStream);
        items = descriptor.getSDMItems().getSDMItem();
        stores = descriptor.getSDMStores().getSDMStore();
        customers = descriptor.getSDMCustomers().getSDMCustomer();

    }

    @Override
    protected Boolean call() throws Exception {

        try {
            System.out.println("Reading file");

            readListsFromXML();
            updateMessage("Reading items..");
            System.out.println("Reading items");

            readItemsFromXML();
            System.out.println("Reading users");

            updateMessage("Reading Users..");

            readUsersFromXML();
            System.out.println("Reading stores");


            updateMessage("Reading Stores..");
            readStoresFromXML();
            updateMessage("Reading items to Stores..");
            readItemsToStoresFromXML();
            updateMessage("Reading discounts to Stores..");
            readDiscountsToStoresFromXML();

            updateMessage("Done");

        } catch (IOException e) {
            e.printStackTrace();
        } catch (TaskIsCanceledException e) {
            SuperDuperMarketUtils.log("Task was canceled !");
            onCancel.accept(null);
        }
        return Boolean.TRUE;

    }

    public void readItemsFromXML() throws JAXBException, FileNotFoundException, TaskIsCanceledException, DuplicateItemSerialIDException {
        int counter = 0;
        updateProgress(counter, items.size());
        SuperDuperMarketUtils.sleepForAWhile(1000);
        for (SDMItem item : items) {
            try {
                businessLogic.addItemsSerialIDMapFromXml(item);
                if (isCancelled()) {
                    SuperDuperMarketUtils.sleepForAWhile(1000);
                    System.out.println("is Cancelled");
                    throw new TaskIsCanceledException();
                }
                counter++;
                updateProgress(counter, items.size());
            } catch (Exception exception) {
                cancelled();
                SuperDuperMarketUtils.log("Task was canceled !");
                onCancel.accept(null);
                throw exception;
            }
            SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        }
    }

    public void readUsersFromXML() throws FileNotFoundException, JAXBException, DuplicateCustomerSerialIDException, TaskIsCanceledException, CustomerLocationIsIdenticalToCustomerException, CustomerLocationIsIdenticalToStoreException, InvalidCoordinateYOfCustomerException, InvalidCoordinateXOfCustomerException {
        int counter = 0;
        updateProgress(counter, customers.size());
        SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        for (SDMCustomer user : customers) {
            try {
                businessLogic.addUserSerialIDMapFromXml(user);
                if (isCancelled()) {
                    System.out.println("is Cancelled");
                    throw new TaskIsCanceledException();
                }
                counter++;
                updateProgress(counter, customers.size());
            } catch (Exception exception) {
                cancelled();
                SuperDuperMarketUtils.log("Task was canceled !");
                onCancel.accept(null);
                throw exception;

            }
            SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        }
    }

    public void readStoresFromXML() throws FileNotFoundException, TaskIsCanceledException, JAXBException, DuplicateStoreSerialIDException, StoreLocationIsIdenticalToStoreException, StoreLocationIsIdenticalToCustomerException, InvalidCoordinateYOfStoreException, InvalidCoordinateXOfStoreException {
        int counter = 0;
        updateProgress(counter, stores.size());
        SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        for (SDMStore store : stores) {
            try {
                businessLogic.addStoreSerialIDMapFromXml(store);
                if (isCancelled()) {
                    System.out.println("is Cancelled");

                    throw new TaskIsCanceledException();
                }
                counter++;
                updateProgress(counter, stores.size());
            } catch (Exception exception) {
                cancelled();
                SuperDuperMarketUtils.log("Task was canceled !");
                onCancel.accept(null);
                throw exception;

            }
            SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        }
    }


    public void readItemsToStoresFromXML() throws FileNotFoundException, TaskIsCanceledException, JAXBException, DuplicateStoreSerialIDException, DuplicateItemSerialIDInStoreException, ItemWithSerialIDNotExistInSDMException, StoreNotExistException, ItemNotExistInStoresException {
        int counter = 0;
        updateProgress(counter, 1);
        SuperDuperMarketUtils.sleepForAWhile(1000);
        for (SDMStore store : stores) {
            try {
                readItemsToAStoreFromXML(store);
                if (isCancelled()) {
                    System.out.println("is Cancelled");

                    throw new TaskIsCanceledException();
                }
            } catch (Exception exception) {
                cancelled();
                SuperDuperMarketUtils.log("Task was canceled !");
                onCancel.accept(null);
                throw exception;
            }
            SuperDuperMarketUtils.sleepForAWhile(1000);
        }
        try {
            businessLogic.checkIfThereIsItemNotInStore();
        } catch (Exception exception) {
            cancelled();
            SuperDuperMarketUtils.log("Task was canceled !");
            onCancel.accept(null);
            throw exception;
        }
    }

    public void readItemsToAStoreFromXML(SDMStore store) throws FileNotFoundException, TaskIsCanceledException, JAXBException, DuplicateItemSerialIDInStoreException, ItemWithSerialIDNotExistInSDMException, StoreNotExistException, DuplicateStoreSerialIDException {
        int counter = 0;
        SuperDuperMarketUtils.sleepForAWhile(1000);
        updateMessage("Reading items to the store " + store.getName() + "...");
        SDMPrices pricesInStore = store.getSDMPrices();
        List<SDMSell> sdmSellList = pricesInStore.getSDMSell();
        updateProgress(counter, sdmSellList.size());
        SuperDuperMarketUtils.sleepForAWhile(0);

        for (SDMSell sdmSell : sdmSellList) {
            businessLogic.addItemToStoreFromSDMSell(sdmSell, store.getId());
            if (isCancelled()) {
                System.out.println("is Cancelled");

                throw new TaskIsCanceledException();
            }
            counter++;
            updateProgress(counter, sdmSellList.size());
            SuperDuperMarketUtils.sleepForAWhile(1000);
        }
    }

    public void readDiscountsToStoresFromXML() throws FileNotFoundException, TaskIsCanceledException, JAXBException, DuplicateStoreSerialIDException, DuplicateItemSerialIDInStoreException, ItemNotExistInStoresException, StoreNotExistException, DuplicateDiscountNameException, ItemWithSerialIDNotExistInSDMException, ItemIDNotExistInAStoreException, ItemIDInDiscountNotExistInSDMException, ItemIDInDiscountNotExistInAStoreException {
        int counter = 0;
        updateProgress(counter, stores.size());
        SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        for (SDMStore store : stores) {
            try {
                readDiscountsToAStoreFromXML(store);
                if (isCancelled()) {
                    System.out.println("is Cancelled");

                    throw new TaskIsCanceledException();
                }
                counter++;
                updateProgress(counter, stores.size());
                SuperDuperMarketUtils.sleepForAWhile(1000);
            } catch (Exception exception) {
                cancelled();
                SuperDuperMarketUtils.log("Task was canceled !");
                onCancel.accept(null);
                throw exception;

            }
            SuperDuperMarketUtils.sleepForAWhile(SLEEP_TIME);
        }
    }

    public void readDiscountsToAStoreFromXML(SDMStore store) throws FileNotFoundException, TaskIsCanceledException, JAXBException, DuplicateItemSerialIDInStoreException, ItemWithSerialIDNotExistInSDMException, StoreNotExistException, DuplicateStoreSerialIDException, ItemNotExistInStoresException, DuplicateDiscountNameException, ItemIDNotExistInAStoreException, ItemIDInDiscountNotExistInSDMException, ItemIDInDiscountNotExistInAStoreException {
        int counter = 0;
        SuperDuperMarketUtils.sleepForAWhile(1000);
        updateMessage("Reading discounts to the store " + store.getName() + "...");
        SDMDiscounts sdmDiscounts = store.getSDMDiscounts();
        if (sdmDiscounts == null) {
            updateProgress(counter, 1);
            SuperDuperMarketUtils.sleepForAWhile(1000);

        }
        else
        {
            List<SDMDiscount> sdmDiscountList = sdmDiscounts.getSDMDiscount();
            if (sdmDiscountList == null) {
                updateProgress(counter, 1);
                SuperDuperMarketUtils.sleepForAWhile(1000);
            } else {
                for (SDMDiscount sdmDiscount : sdmDiscountList) {
                    businessLogic.addDiscountToStoreFromSDMSell(sdmDiscount, store.getId());
                    if (isCancelled()) {
                        System.out.println("is Cancelled");

                        throw new TaskIsCanceledException();
                    }
                    counter++;
                    updateProgress(counter, sdmDiscountList.size());
                    SuperDuperMarketUtils.sleepForAWhile(1000);
                }
            }
        }
    }

    @Override
    protected void cancelled(){
        updateMessage("Canceled");
        SuperDuperMarketUtils.sleepForAWhile(1000);
        super.cancelled();

    }
}