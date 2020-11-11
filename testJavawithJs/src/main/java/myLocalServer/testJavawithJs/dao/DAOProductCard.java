package myLocalServer.testJavawithJs.dao;

import myLocalServer.testJavawithJs.entity.ProductCard;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DAOProductCard extends JpaRepository<ProductCard, Integer> {
}
