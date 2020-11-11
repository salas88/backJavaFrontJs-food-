package myLocalServer.testJavawithJs.entity;


public class Changer {
    private int id;
    private int total;

    public Changer(){}

    public Changer(int id, int total) {
        this.id = id;
        this.total = total;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTotal() {
        return total;
    }

    public void setTotal(int total) {
        this.total = total;
    }

    @Override
    public String toString() {
        return "Changer{" +
                "id=" + id +
                ", total=" + total +
                '}';
    }
}
