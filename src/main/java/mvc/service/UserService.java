package mvc.service;

import entity.User;
import mvc.controller.PageStateInfo;
import mvc.controller.UserPage;

import java.util.List;

/**
 * Created by Valk on 05.08.15.
 */
public interface UserService {
    public void create(User user);
    List<User> read();
    UserPage readPage(PageStateInfo pageStateInfo);
    void update(User user);
    Integer delete(long id);

    User read(long id);
}
