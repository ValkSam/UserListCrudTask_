<%@ taglib uri='http://www.springframework.org/tags/form' prefix='form' %>
<%@ taglib uri='http://java.sun.com/jsp/jstl/core' prefix='c' %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<!DOCTYPE html PUBLIC '-//W3C//DTD HTML 4.01 Transitional//EN' 'http://www.w3.org/TR/html4/loose.dtd'>
<html>
<head>
    <title>Список пользователей</title>
    <!------------------------------------------------ DataTables --------------------------------------------------------->
    <link type='text/css' rel='stylesheet'
          href='${pageContext.request.contextPath}../../resources/dataTables/css/jquery.dataTables.css'>
    <!--Мои стили---------------------------------------------------------------------------------------------------------->
    <link type='text/css' rel='stylesheet'
          href='${pageContext.request.contextPath}../../resources/dataTables/css/blue/style.css'>
</head>

<body>

<h2>Список пользователей <span>(вар#1)</span></h2>

<form:form role="form" action='index.jsp' accept-charset='utf-8'>
    <button type="submit" class="btn btn-default"><< назад</button>
</form:form>

<div>
    <form:form role="form" action='createForm?source=userList-DataTables' accept-charset='utf-8'>
        <button id='createForm' class="btn btn-default">
            Добавить пользователя
        </button>
    </form:form>
</div>


<div id="container">
    <div>
        <table cellpadding="0" cellspacing="0" border="0" class="display" id="table_id">
            <thead>
            <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Дата регистрации</th>
                <th>Админ</th>
                <th></th>
                <th></th>
            </tr>
            </thead>

            <tfoot>
            <tr>
                <th>ID</th>
                <th>Имя</th>
                <th>Возраст</th>
                <th>Дата регистрации</th>
                <th>Админ</th>
                <th></th>
                <th></th>
            </tr>
            </tfoot>

            <tbody>
            <c:forEach var='user' items='${listOfUsers}'>
                <tr>
                    <td class=user-id>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.age}</td>
                    <td>${user.createdDate}</td>
                    <td><c:if test='${user.isAdmin==true}'><img src="resources/images/admin.png" /></c:if></td>
                    <td><a id='update' href='updateForm?id=${user.id}&source=userList-DataTables'><img src="resources/images/edit.png" /></a></td>
                    <td><a id='delete' href='#'><img src="resources/images/trash.png" /></a></td>
                </tr>
            </c:forEach>
            </tbody>
        </table>
    </div>
</div>


<!--------------------------------------------------------------------------------------------------------------------->
<!-- jQuery -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!--bootstrap-->
<script type="text/javascript" src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
<!------------------------------------------------ DataTables --------------------------------------------------------->
<script type="text/javascript" charset="utf8"
        src="${pageContext.request.contextPath}../../resources/dataTables/js/jquery.js"></script>
<script type="text/javascript" charset="utf8"
        src="${pageContext.request.contextPath}../../resources/dataTables/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" charset="utf8"
        src="${pageContext.request.contextPath}../../resources/dataTables/js/jquery.dataTables.js"></script>
<script type="text/javascript" charset="utf8"
        src="${pageContext.request.contextPath}../../resources/dataTables/js/jquery.dataTables.columnFilterAdd-on.js"></script>
<!--------------------------------------------------------------------------------------------------------------------->
<!--мои скрипты-->
<script type='text/javascript' src='${pageContext.request.contextPath}resources/dataTables/js/userList-DataTables-ini.js'></script>

</body>
</html>



