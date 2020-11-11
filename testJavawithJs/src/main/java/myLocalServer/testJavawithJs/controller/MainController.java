package myLocalServer.testJavawithJs.controller;

import myLocalServer.testJavawithJs.entity.Changer;
import myLocalServer.testJavawithJs.entity.Client;
import myLocalServer.testJavawithJs.entity.ProductCard;
import myLocalServer.testJavawithJs.service.client.InterServiceClient;
import myLocalServer.testJavawithJs.service.productCard.InterProductCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MainController {

    private InterServiceClient interServiceClient;
    private InterProductCard interProductCard;
    @Autowired
    public MainController(InterServiceClient interServiceClient,
                          InterProductCard interProductCard){
        this.interServiceClient = interServiceClient;
        this.interProductCard = interProductCard;
    }

    @CrossOrigin
    @GetMapping("/root")
    public Changer showChanger(){

        return new Changer(1,26);
    }

    @CrossOrigin
    @PostMapping("/root")
    public Client methodForForm(@RequestBody Client client){
        interServiceClient.saveClient(client);
        System.out.println(client.getName() + " " + client.getPhone());
        return client;
    }

    @CrossOrigin
    @PostMapping(value = "/requestCard", produces = "application/json;charset=UTF-8")
    public List<ProductCard> requestCardFromJs(@RequestBody List<ProductCard> productCardList){

        for(ProductCard item : productCardList){
            System.out.println(item);
            interProductCard.save(item);
        }

        return productCardList;
    }

    @CrossOrigin
    @GetMapping("/cardFromDb")
    public List<ProductCard> methodForProductCard(){
        List<ProductCard> productCards = interProductCard.findAll();

        return productCards;
    }
}
