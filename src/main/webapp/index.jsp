<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!----------------------------------- bootstrap ------------------------------------------------------------------->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap-theme.min.css">
    <!----------------------------------------------------------------------------------------------------------------->
    <!--Мои стили------------------------------------------------------------------------------------------------------>
    <link type='text/css' rel='stylesheet'
          href='${pageContext.request.contextPath}/resources/css/index.css'>
</head>
<body>

<div class="paragraphs container">

    <div class="paragraph current">
        <div class="item row">
            <div class="col-xs-3">
                <p></p>
                <p class="source">README</p>
                <p></p>
            </div>
            <div class="col-xs-6">
                <p class="title">Общая информация</p>
            </div>
            <div class="col-xs-3">
                <p class="pubdate"></p>
            </div>
        </div>
        <div class="description row">
            <div class="col-xs-3">&nbsp;</div>
            <div class="col-xs-9">
                <p>Для инициализации базы использовать макрос в initBase.txt (рядом с index.jsp)</p>
                <p>Также создается триггер для установки текущей даты для поля createdDate</p>
                <p>Использовался spring</p>
                <p></p>
                <p>Сделал три варианта визуализации </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Вариант 1 и 2 - полная загрузка таблицы и локальный пейджинг </p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;Вариант 3 - данные загружаются по-странично </p>
                <p></p>
                <p>Все варианты используют общие формы добавления и редактирования</p>
            </div>
        </div>
    </div>

    <div class="paragraph">
        <div class="item row">
            <div class="col-xs-3">
                <p></p>

                <p class="source">ВАРИАНТ 1</p>

                <p></p>
            </div>
            <div class="col-xs-6">
                <p class="title">Пейджинг на стороне клиента. Плагин DataTables</p>
            </div>
            <div class="col-xs-3">
                <p class="pubdate"></p>
            </div>
        </div>
        <div class="description row">
            <div class="col-xs-3">&nbsp;</div>
            <div class="col-xs-9">
                <a href="/userList-DataTables">
                    <h1>Перейти к варианту</h1>
                </a>
                <p>Использован плагин для jQuery DataTables (<a href="http://datatables.net">www.datatables.net</a>)</p>
                <p>Работа происходит по полностью загруженным данным. Операции просмотра, пагинации, пейджинга, сортировки, фильтра происходят локально и реализованы в рамках плагина.</p>
                <p></p>
                <p>Операции добавления и редактирования переадресуют на соответствующую форму.</p>
                <p>Формы добавления и редактирования реализованы с использованием bootstrap.</p>
                <p>Валидация происходит как на уровне формы, так и через подвязанный валидатор:</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- на форме: контроль ввода цифр в возрасте</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- на валидаторе: контроль границ возраста и длины имени</p>
                <p></p>
                <p>Данные формы используются во всех вариантах.</p>
            </div>
        </div>
    </div>
    
    <div class="paragraph">
        <div class="item row">
            <div class="col-xs-3">
                <p class="source">ВАРИАНТ 2</p>
            </div>
            <div class="col-xs-6">
                <p class="title">Пейджинг на стороне клиента. Своя реализация</p>
            </div>
            <div class="col-xs-3">
                <p class="pubdate"> </p>
            </div>
        </div>
        <div class="description row">
            <div class="col-xs-3">&nbsp;</div>
            <div class="col-xs-9">
                <a href="/userList-myLocalTable">
                    <h1>Перейти к варианту</h1>
                </a>

                <p>Собрал свою форму для отображения списка пользователей. Использовал bootstrap</p>
                <p>Особенности реализации пейджинга, поиска-фильтрации, удаления и добавления:</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- страница содержит все строки из БД пользователей. В момент инициализации разбиваю строки на страничные блоки (оборачиваю строки в тэг class=pageBlock). Каждый блок имеет свой номер (аттрибут id). В процессе пейджинга устанавливается аттрибут active для блока с id = Номер страницы</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- при фильтрации строкам, которые не попадают под условия фильтра добавляю класс masked и провожу разбивку по страницам. Строки с классом masked не участвуют в разбивке по страницам и заворачиваются в отдельную страницу с id = MASKED.</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- для удаления отправляю ajax-запрос. Если возвращается 1 (при удачном удалении в БД) то удаляю из DOM соответствующую строку.</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- при добавлении возврат на страницу происходит по redirect и данные, соответсвенно, заново инициируются из БД.</p>
                <p>&nbsp;&nbsp;&nbsp;&nbsp;- таким образом, работа с таблицей проходит максимально автономно. Для перегрузки данных - кнопка рефреш (справа от строки поиска)</p>
                <p></p>
            </div>
        </div>
    </div>
    
    <div class="paragraph">
        <div class="item row">
            <div class="col-xs-3">
                <p class="source">ВАРИАНТ 3</p>
            </div>
            <div class="col-xs-6">
                <p class="title">Пейджинг на стороне сервера</p>
            </div>
            <div class="col-xs-3">
                <p class="pubdate"> (основной) </p>
            </div>
        </div>
        <div class="description row">
            <div class="col-xs-3">&nbsp;</div>
            <div class="col-xs-9">
                <a href="/userList-myTable">
                    <h1>Перейти к варианту</h1>
                </a>

                <p>Использован тот же макет страницы, что и для ВАРИАНТ 2, но изменена логика пейджинга, который не
                    локально на стороне клиента ходит по страницам, а каждую страницу(page) загружает из БД.</p>

                <p>Особенности реализации пейджинга и удаления:</p>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;- при загрузке html-страницы со списком происходит ее полная загрузка</p>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;- при смене номера страницы(page) в пагинаторе, отправляется ajax-запрос, который
                    получает обновленную страницу и выбирает из нее только блок со списком (использовал jQuery.load).
                    Т.е. не делал редирект на html-страницы со списком, полностью ее перегружая, а обновлял DOM только в
                    части блока списка</p>

                <p>&nbsp;&nbsp;&nbsp;&nbsp;- при удалении записи - поступаю аналогично: отправляю ajax-запрос, который дергает
                    метод delete контроллера, который, в свою очередь, удаляет запись, запрашивает обновленную страницу,
                    но вместо редиректа на нее, возвращает просто ее образ, который использется jQuery.load для
                    модификации DOM.></p>
            </div>
        </div>
    </div>

    <div class="paragraph">
        <div class="item row">
            <div class="col-xs-3">
                <p class="source">ВАРИАНТ 4</p>
            </div>
            <div class="col-xs-6">
                <p class="title">Пейджинг на стороне сервера frontend AngularJS</p>
            </div>
            <div class="col-xs-3">
                <p class="pubdate"> AngularJS </p>
            </div>
        </div>
        <div class="description row">
            <div class="col-xs-3">&nbsp;</div>
            <div class="col-xs-9">
                <a href="/userList-myTableAngular">
                    <h1>Перейти к варианту</h1>
                </a>
                <p></p>
                <p>Использован тот же макет страницы, что и для ВАРИАНТ 2 и 3, но построена на AngularJS:
                    переписан пейджинг и взаимодействие элементов страницы с использованием AngularJS </p>

                <p>С использованием AngularJS сделаны запросы на загрузку страниц и удаление записи</p>
                <p>Редактирование записи и создание новой записи происходят в отдельных формах - </p>
                <p>тех же, что в остальных вариантах, так что эти операции реализованы в spring </p>
            </div>
        </div>
    </div>

</div>
<!--------------------------------------------------------------------------------------------------------------------->
<!-- jQuery -->
<script type="text/javascript" src="//code.jquery.com/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="//code.jquery.com/jquery-migrate-1.2.1.min.js"></script>
<!--bootstrap-->
<script type="text/javascript" src='http://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/js/bootstrap.min.js'></script>
<!--мои скрипты-->
<script type="text/javascript" src="resources/js/index.js"></script>
</body>
</html>