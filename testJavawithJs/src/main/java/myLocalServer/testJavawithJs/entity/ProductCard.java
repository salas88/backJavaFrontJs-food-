package myLocalServer.testJavawithJs.entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ProductCard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String img;
    private String altimg;
    private String title;
    private String descr;
    private int price;

    public ProductCard(){};

    public ProductCard(int id, String img, String altimg, String title, String descr, int price) {
        this.id = id;
        this.img = img;
        this.altimg = altimg;
        this.title = title;
        this.descr = descr;
        this.price = price;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public String getAltimg() {
        return altimg;
    }

    public void setAltimg(String altimg) {
        this.altimg = altimg;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "ProductCard{" +
                "id=" + id +
                ", img='" + img + '\'' +
                ", altimg='" + altimg + '\'' +
                ", title='" + title + '\'' +
                ", descr='" + descr + '\'' +
                ", price=" + price +
                '}';
    }
}
