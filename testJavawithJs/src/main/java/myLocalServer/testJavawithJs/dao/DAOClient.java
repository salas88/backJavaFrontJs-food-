package myLocalServer.testJavawithJs.dao;

import myLocalServer.testJavawithJs.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DAOClient extends JpaRepository<Client, Integer> {
}
