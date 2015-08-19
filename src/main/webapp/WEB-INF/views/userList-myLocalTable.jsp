<%@ taglib uri='http://www.springframework.org/tags/form' prefix='form' %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c' %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
<html>
<head>
    <title>Список пользователей</title>
    <!----------------------------------- bootstrap ------------------------------------------------------------------->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
    <!----------------------------------------------------------------------------------------------------------------->
    <!--Мои стили---------------------------------------------------------------------------------------------------------->
    <link type='text/css' rel='stylesheet'
          href='${pageContext.request.contextPath}/resources/myLocalTable/css/style.css'>
</head>
<body>
<div class="container">

    <h2>Список пользователей <span>(вар#2)</span></h2>

    <div id="main-panel" class="panel-group" style="margin-bottom: 100px;">
        <div class="panel panel-default">
            <div class="panel-heading">
                <form:form role="form" action='index.jsp' accept-charset='utf-8'>
                    <button type="submit" class="btn btn-default">
                        << назад
                    </button>
                </form:form>

                <div>
                    <form:form role="form" action='createForm?source=userList-myLocalTable' accept-charset='utf-8'>
                        <button id='createForm' class="btn btn-default">
                            Добавить
                            пользователя
                        </button>
                    </form:form>
                </div>
            </div>
            <div class="panel-body">
                <div class="well well-sm">
                    <div id="table-header" class="container-fluid">
                        <div class="row">
                            <div class="col-xs-1">
                                <p>
                                    ID
                                </p>
                            </div>
                            <div class="col-xs-4">
                                <p>
                                    Имя
                                </p>
                            </div>
                            <div class="col-xs-1">
                                <p>
                                    Возраст
                                </p>
                            </div>
                            <div class="col-xs-2">
                                <p>
                                    Дата регистрации
                                </p>
                            </div>
                            <div class="col-xs-1">
                                <p>
                                    Админ
                                </p>
                            </div>
                            <div class="col-xs-1">
                                <p>
                                </p>
                            </div>
                            <div class="col-xs-1">
                                <p>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="table-body" rowsPerPage=10 pageBtnLimit=5 class="container-fluid">
                    <c:forEach var="user" items="${listOfUsers}">
                        <div class="row table-row">
                            <div class="col-xs-1 user-id"><p>${user.id}</p></div>
                            <div class="col-xs-4 user-name"><p>${user.name}</p></div>
                            <div class="col-xs-1 user-age"><p>${user.age}</p></div>
                            <div class="col-xs-2 user-date"><p>${user.createdDate}</p></div>
                            <div class="col-xs-1"><p><c:if test='${user.isAdmin==true}'><img
                                    src="resources/images/admin.png"/></c:if></p>
                            </div>
                            <div class="col-xs-1"><a id='update'
                                                     href='updateForm?id=${user.id}&source=userList-myLocalTable'><img
                                    src="resources/images/edit.png"/></a></div>
                            <div class="col-xs-1"><a id='deletelocal' href='#'><img
                                    src="resources/images/trash.png"/></a></div>
                        </div>
                    </c:forEach>
                </div>
            </div>
            <div class="panel-body">
                <div class="row">
                    <div class="col-xs-3 user-id">

                    </div>
                    <div class="col-xs-1 user-id">
                    </div>
                    <div class="col-xs-3 user-id">

                        <label for="search-field">
                            Искать по полю:
                        </label>
                        <select class="form-control" id="search-field">
                            <option field-name=id>
                                Id
                            </option>
                            <option field-name=name>
                                Имя
                            </option>
                            <option field-name=age>
                                Возраст
                            </option>
                            <option field-name=createdDate>
                                Дата
                            </option>
                            <option field-name=wide-search>
                                По всем
                            </option>
                        </select>

                        <div class="checkbox">
                            <label class="checkbox-inline">
                                <input id=strict-search type="checkbox" value="yes">
                                Строгий поиск
                            </label>
                        </div>
                    </div>
                    <div class="col-xs-5 user-id">
                        <label for="search-field-enter">
                            Значение для поиска
                        </label>

                        <div class="input-group" id='search-field-enter'>
                            <input type="text" class="form-control" placeholder="Search" name="srch-term"
                                   id="srch-term">

                            <div class="input-group-btn">
                                <button id=do-search class="btn btn-default" type="button">
                                    <i
                                            class="glyphicon glyphicon-search">
                                    </i>
                                </button>
                                <button id=do-refresh class="btn btn-default" type="button">
                                    <i
                                            class="glyphicon glyphicon-refresh">
                                    </i>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <nav class="navbar navbar-inverse navbar-fixed-bottom">
        <div class="panel panel-default">
            <div class="panel-footer">
                <div class="row">
                    <div class="col-xs-6">
                    </div>
                    <div class="col-xs-6">
                        <div class="btn-toolbar" role="toolbar">
                            <div id="btn-left-group" class="btn-group">
                                <button id="btn-left" class="btn btn-default">
                                    &lang;
                                </button>
                            </div>

                            <div id="btn-less-group" class="btn-group ">
                                <button class="btn btn-default disabled">
                                    ...
                                </button>
                            </div>

                            <div id="btn-main-group" class="btn-group">

                            </div>

                            <div id="btn-more-group" class="btn-group">
                                <button class="btn btn-default disabled">
                                    ...
                                </button>
                            </div>

                            <div id="btn-right-group" class="btn-group">
                                <button id="btn-right" class="btn btn-default">
                                    &rang;
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </nav>

</div>


<!--------------------------------------------------------------------------------------------------------------------->
<!-- jQuery -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!--bootstrap-->
<script type="text/javascript"
        src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
</body>
<!--мои скрипты-->
<script type='text/javascript'
        src='${pageContext.request.contextPath}/resources/myLocalTable/js/userList-myLocalTable-ini.js'></script>
</html>
