package mvc.dao;

import entity.User;
import mvc.controller.PageStateInfo;
import mvc.controller.UserPage;

import java.util.List;

/**
 * Created by Valk on 05.08.15.
 */
public interface UserDAO {
    public void create(User user);
    List read();
    User read(long id);
    UserPage readPage(PageStateInfo pageStateInfo);
    void update(User user);
    Integer delete(long id);
}
