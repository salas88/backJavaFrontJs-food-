package myLocalServer.testJavawithJs.service.client;

import myLocalServer.testJavawithJs.dao.DAOClient;
import myLocalServer.testJavawithJs.entity.Client;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImplServiceClient implements InterServiceClient{

    private DAOClient daoClient;
    @Autowired
    public ImplServiceClient(DAOClient daoClient){
        this.daoClient = daoClient;
    }

    @Override
    public void saveClient(Client theClient) {
        daoClient.save(theClient);
    }
}
