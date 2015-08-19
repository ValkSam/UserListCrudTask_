package mvc.controller;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import entity.User;

import java.io.IOException;
import java.util.List;

/**
 * Created by Valk on 14.08.15.
 */

public class UserPage {
    private List<User> pageList;
    private int pagesCount;
    private boolean needUpdate = false;

    public List<User> getPageList() {
        return pageList;
    }

    public void setPageList(List<User> pageList) {
        this.pageList = pageList;
    }

    public int getPagesCount() {
        return pagesCount;
    }

    public void setPagesCount(int pagesCount) {
        this.pagesCount = pagesCount;
    }
}
