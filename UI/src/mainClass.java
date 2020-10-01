import javafx.application.Application;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.layout.BorderPane;
import javafx.stage.Stage;
import commonUI.SuperDuperMarketConstants;
import logic.*;

import java.net.URL;

public class mainClass extends Application {

    /*
    all long text files are books downloaded from
    http://www.gutenberg.org/ebooks/search/%3Fsort_order%3Ddownloads
     */

    public static void main(String[] args) {

        launch(args);
    }

    @Override
    public void start(Stage primaryStage) throws Exception {

        //CSSFX.start();

        FXMLLoader loader = new FXMLLoader();

        // load main fxml
        URL mainFXML = getClass().getResource(SuperDuperMarketConstants.MAIN_FXML_RESOURCE_IDENTIFIER);
        loader.setLocation(mainFXML);
        BorderPane scrollPane = loader.load();
        // wire up controller
        components.mainScreen.mainScreenController superDuperMarketController = loader.getController();
        BusinessLogic businessLogic = new BusinessLogic();
        superDuperMarketController.setPrimaryStage(primaryStage);
        superDuperMarketController.setBusinessLogic(businessLogic);

        // set stage
        primaryStage.setTitle("Super Duper Market");
        Scene scene = new Scene(scrollPane, 1050, 600);
        primaryStage.setScene(scene);
        primaryStage.show();

    }


}
