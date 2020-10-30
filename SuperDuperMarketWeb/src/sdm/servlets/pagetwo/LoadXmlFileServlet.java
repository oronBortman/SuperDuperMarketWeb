package sdm.servlets.pagetwo;

import exceptions.DuplicateDiscountNameException;
import exceptions.DuplicateZoneName;
import exceptions.InvalidCoordinateException.InvalidCoordinateXOfStoreException;
import exceptions.InvalidCoordinateException.InvalidCoordinateYOfStoreException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDException;
import exceptions.duplicateSerialID.DuplicateItemSerialIDInStoreException;
import exceptions.duplicateSerialID.DuplicateStoreSerialIDException;
import exceptions.locationsIdentialException.StoreLocationIsIdenticalToStoreException;
import exceptions.notExistException.*;
import logic.Seller;
import logic.Store;
import logic.users.User;
import logic.users.UserManager;
import logic.zones.ZoneManager;
import sdm.utils.ServletUtils;
import sdm.utils.SessionUtils;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.xml.bind.JAXBException;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Paths;
import java.util.Scanner;
import javax.servlet.http.Part;


@WebServlet("/load-xml-file")
@MultipartConfig(fileSizeThreshold = 1024 * 1024, maxFileSize = 1024 * 1024 * 5, maxRequestSize = 1024 * 1024 * 5 * 5)
public class LoadXmlFileServlet extends HttpServlet {

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try{

            response.setContentType("text/html;charset=UTF-8");
            Part filePart = request.getPart("file"); // Retrieves <input type="file" name="file">
            InputStream fileContent = filePart.getInputStream();
            String username = SessionUtils.getUsername(request);
            ZoneManager zoneManager = ServletUtils.getZoneManager(getServletContext());
            UserManager userManager = ServletUtils.getUserManager(getServletContext());
            User user = userManager.getUserByName(username);
            String message="";
            if(user instanceof Seller)
            {
                try {
                    zoneManager.addNewZoneFromXml(fileContent, (Seller)user);
                    message="Loaded file successfully";
                }
                catch (DuplicateZoneName e)
                {
                    message = "Couldn't add zone with name" + e.getZoneName() + ",\n" +
                            "because Super Duper Market already has a zone with this name.";
                }
                catch (DuplicateStoreSerialIDException e) {
                    message = "Couldn't add store " + e.getName() + " with serial id " + e.getSerialId() + ",\n" +
                            "because the zone has already store with this serial id";
                } catch (InvalidCoordinateYOfStoreException e) {
                    message = "The value " + e.getCoord() + " of coordinate y of store with name " + e.getName() + " and serial id " + e.getSerialID() + " is invalid";
                } catch (StoreLocationIsIdenticalToStoreException e) {

                } catch (InvalidCoordinateXOfStoreException e) {
                    message = "The value " + e.getCoord() + " of coordinate x of store with name " + e.getName() + " and serial id " + e.getSerialID() + " is invalid";
                } catch (DuplicateItemSerialIDException e) {
                    message = "Couldn't add item " + e.getName() + " with serial id " + e.getSerialId() + ",\n" +
                            "because the zone has already an item with this serial id";
                } catch (DuplicateItemSerialIDInStoreException e) {
                    message = "Couldn't add item " + e.getItemName() + " with serial id " + e.getItemSerialId() + ",\n" +
                            "because store with name " + e.getStoreName() + " and serial id " + e.getStoreSerialId() + " already has an item with this serial id";
                } catch (StoreNotExistException e) {
                    message = "The store with the name " + e.getName() + " and serial id " + e.getSerialId() + ",\n" +
                            "doesn't exist in the zone";
                } catch (ItemWithSerialIDNotExistInSDMException e) {
                    message = "Item with name" + e.getName() + " and the serial id " + e.getSerialId() + " doesn't exist in the zone";
                } catch (JAXBException e) {
                    e.printStackTrace();
                } catch (ItemIDInDiscountNotExistInAStoreException e) {
                    Integer storeID = e.getStoreSerialID();
                    String storeName = e.getStoreName();
                    message = "Item with serial id " + e.getSerialIdOfItem() + " in the discount " + "\"" + e.getDiscountName() + "\"\n" +
                            "doesn't exist in it's store(store's name: " + storeName + ", store's serialID: " + storeID;

                } catch (ItemIDInDiscountNotExistInSDMException e) {
                    Integer storeID = e.getStoreSerialID();
                    String storeName = e.getStoreName();
                    message = "Item with serial id " + e.getSerialIdOfItem() + " in the discount " + "\"" + e.getDiscountName() + "\"\n" +
                            "doesn't exist in Super Duper Market\n" +
                            "Details on the store that has the discount:\n" +
                            "Store name:" + storeName + ", Store serialID:" + storeID;
                } catch (DuplicateDiscountNameException e) {
                    Integer storeID = e.getStoreID();
                    String storeName = e.getStoreName();
                    message = "Discount with name " + e.getDiscountName() + " already exist in store\n" +
                            "Details on the store that has the discount:\n" +
                            "Store name:" + storeName + ", Store serialID:" +storeID;
                } catch (ItemIDNotExistInAStoreException e) {
                    Integer storeID = e.getSerialIDOfStore();
                    String storeName = e.getStoreName();
                    Integer itemID = e.getSerialIDOfItem();
                    message = "Item with serial id " + itemID + " doesn't exist in store.\n" +
                            "Details on the store:\n" +
                            "Store name:" + storeName + ", Store serialID:" + storeID;
                }
           }
            else
            {
                message="User doesn't have a permission to upload an xml file to Super Duper Market";
           }

            try {
                response.getOutputStream().print(message);
            } catch (Exception e) {
                e.getMessage();
                response.getOutputStream().println(e.getMessage());
            }
        }
        catch(Exception e)
        {
            System.out.println("Error!!!!");
        }
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        processRequest(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);

    }

    private String readFromInputStream(InputStream inputStream) {

        return new Scanner(inputStream).useDelimiter("\\Z").next();

    }
}
