package myLocalServer.testJavawithJs.service.productCard;

import myLocalServer.testJavawithJs.dao.DAOProductCard;
import myLocalServer.testJavawithJs.entity.ProductCard;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImplProductCard implements InterProductCard{
    private DAOProductCard daoProductCard;
    @Autowired
    public ImplProductCard(DAOProductCard daoProductCard){
        this.daoProductCard = daoProductCard;
    }
    @Override
    public void save(ProductCard productCard) {
        daoProductCard.save(productCard);
    }

    @Override
    public List<ProductCard> findAll() {
        return daoProductCard.findAll();
    }
}
