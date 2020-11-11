package myLocalServer.testJavawithJs.service.productCard;

import myLocalServer.testJavawithJs.entity.ProductCard;

import java.util.List;

public interface InterProductCard {
    void save(ProductCard productCard);
    List<ProductCard> findAll();
}
