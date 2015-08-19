/**
 * Created by Valk on 14.08.15.
 */
$(document).ready(main = function () {
    //с префиксом  спокойней. Кажется, что без  иногда перемная как локальная работает. Дополнительно поэксперементировать ....
    // ни фига: все дело оказалось в особенностях работы колбек функции, которая опрелена для $.load() - из нее нельзя установить
    // глобальные переменные. Точнее можно, но без толку - нет возможности даже цикл ожидания делать с установкой флага выхода
    // внутри коллбека. При этом сам лоад работает асинхронно и пагинатор будет рисоваться по старым данным.
    //Решение: createPaginator вызываю внутри колбека. Перед вызовом createPaginator устанавливаю новое значение страницы
    // - но толку от этого пока мало, т.к. установка ее внутри колбэека не сделает ее значения доступными
    // вовне (будут видны старые значения)
    // Вызывая createPaginator, передаю в виде параметров параметры страницы, вычитанной внутри коллбэека.
    //Короче, надо делать синхронный ajax - и не парится ....

    var firstEntry = true;
    var pageBtnLimit = +$('#pageBlock').attr('pageBtnLimit');
    var pagesCount = +$('#pageBlock').attr('pagesCount');
    var pageNumber = +$('#pageBlock').attr('pageNumber');
    var pageOffset = +$('#pageBlock').attr('pageOffset');
    var rowsPerPage = +$('#pageBlock').attr('rowsPerPage');
    var orderField = $('#pageBlock').attr('orderField');
    var orderFieldDesc = $('#pageBlock').attr('orderFieldDesc');

    var filterField = "";
    var filterFieldValue = "";
    var strictFilter = false;

    var refreshVars = function (){
        pagesCount = +$('#pageBlock').attr('pagesCount');
        pageNumber = +$('#pageBlock').attr('pageNumber');
    };

    var resoreState = function (){
        //можно еще сделать, чтобы при возвращении из внешней формы (когда страница полностью перегружается), востанавливать фильтры
    }

    /*
     * создает кнопки и отображает основные (номерные) кнопки с учетом параметров:
     *   pageBtnLimit - количество кнопок в блоке
     *   pagesCount - общее количество кнопок. Часть из них, те которые не влезают в блок, - за границами блока
     *   pageNumber - АБСОЛЮТНЫЙ номер страницы которая будет активной в диапазоне  [1-pagesCount]
     *   pageOffset - относительный номер кнопки в блоке
     * все параметры берутся из заголовка блока страниц: $('#pageBlock').attr('имя параметра')
     * */
    function createPaginator() {
        if ($('.pagination-btn:visible').first().index() != -1) {
            pageOffset = Math.max(pageNumber - $('.pagination-btn:visible').first().text(), 0);
        }
        if (pageOffset > pageNumber) {
            pageOffset = Math.max(pageNumber - 1, 0);
        }
        var limit = Math.min(pageBtnLimit, pagesCount);
        pageOffset = Math.min(pageOffset, limit - 1);
        var firstVisible = pageNumber - pageOffset;
        $('.pagination-btn').remove();
        var i;
        for (i = 1; i < firstVisible; i++) {
            $("#btn-main-group").append('<button id=btn-idx' + i + ' class="btn btn-default pagination-btn hidden">' + i + '</button>');
        }

        var mainGroupSize = Math.min(limit + firstVisible - 1, pagesCount);
        for (i = firstVisible; i <= mainGroupSize; i++) {
            $("#btn-main-group").append('<button id=btn-idx' + i + ' class="btn btn-default pagination-btn">' + i + '</button>');
        }

        for (i = mainGroupSize+1; i <= pagesCount; i++) {
            $("#btn-main-group").append('<button id=btn-idx' + i + ' class="btn btn-default pagination-btn hidden">' + i + '</button>');
        }
        $('.pagination-btn:visible').eq(pageOffset).addClass("active");
    };

    /*
     * отрисовует вспомогательные кнопки: индикаторы наличия записей справа и слева, вне блока номерных кнопок */
    function updatePagination() {
        var limit = Math.min(pageBtnLimit, pagesCount);
        if (+$('.pagination-btn:visible').eq(0).text() > 1) {
            $('#btn-less-group').removeClass('hidden');
        } else {
            $('#btn-less-group').addClass('hidden');
        }
        if (+$('.pagination-btn:visible').eq(limit - 1).text() < pagesCount) {
            $('#btn-more-group').removeClass('hidden');
        } else {
            $('#btn-more-group').addClass('hidden');
        }
    };

    /*
     * загружает страницу данных. Номер страницы берется из текста активной кнопки
     * На сервер передается объект с параметрами, результат выводится
     * Сервер может не суметь выбрать записи с указанными параметрами (например, БД модифицировалась
     * и нужной страницы уже нет). В этом случае сервер грузит первую страницу и устанавливает флаг needUpdate,
     * в том случа loadPage вызовет пересоздание блока кнопок пагинации - буду пересоздавать его всегда, это не дорого*/
    function loadPage() {
        var state = { //параметры для формирования запроса
            'pageNumber': pageNumber,
            'rowsPerPage': rowsPerPage,
            'pageOffset': pageOffset,
            'orderField': orderField,
            'orderFieldDesc': orderFieldDesc,
            'filterField': filterField,
            'filterFieldValue': filterFieldValue,
            'strictFilter': strictFilter
        };

        $.ajaxSetup({
            headers: { //к делу не относится, но пусть тут полежит
                "contentType": "text/html;charset=UTF-8"
            },
            "type": "POST",
            "contentType": 'text/html; charset=utf-8',
            "data": JSON.stringify(state),
            "async": false //будем ждать, иначе голову сломать можно с отрисовкой пагинатора
        });
        $("#table-body").load('userList-myTableQuery' + ' #pageBlock', function () {
            //уже не надо
        });
        var needUpdate = $('#pageBlock').attr('needUpdate'); //если сервер не смог выдать нужну страницу - выдаст первую и уведомит через эту переменную - отказался от логики обработки этого. Но переменная пусть повисит - может еще одумаюсь
        refreshVars();
        createPaginator();
        updatePagination();
    }

    /*
     * удаление записи и загрузка с отображением нового вида текущей страницы
     * если удаляется последня запись на странице (это всегда будет последняя страница), то номер страницы уменьшится на 1
     * Это сделано, чтобы сервер, не сумев загрузить нужную страницу, не грузил первую страницу с выставлением флага needUpdate
     * Так будет некрасиво. При уменьшении же номера страницы будет "естественный" переход на предыдущую страницу
     * Если сервер не сможет выдать нужную страницу, то поведение аналогично loadPage*/
    function deleteRecord() {
        var row = $(this).parentsUntil(".row").parent();
        var userId = row.children(".user-id").text();
        pageNumber = +$('.pagination-btn.active').text();
        var loneRowOnPage = ((row.index() == 0) && (row.next().index() == -1));
        if (loneRowOnPage) {
            pageNumber = Math.max(pageNumber - 1, 1);
        }
        var state = { //параметры для формирования запроса
            'pageNumber': pageNumber,
            'rowsPerPage': rowsPerPage,
            'pageOffset': pageOffset,
            'orderField': orderField,
            'orderFieldDesc': orderFieldDesc,
            'filterField': filterField,
            'filterFieldValue': filterFieldValue,
            'strictFilter': strictFilter
        };

        $.ajaxSetup({
            headers: { //к делу не относится, но пусть тут полежит
                "contentType": "text/html;charset=UTF-8"
            },
            "type": "POST",
            "contentType": 'text/html; charset=utf-8',
            "data": JSON.stringify(state),
            "async": false
        });
        $("#table-body").load('delete?id=' + userId + ' #pageBlock', function () {
            //
        });
        var needUpdate = $('#pageBlock').attr('needUpdate');
        refreshVars();
        createPaginator();
        updatePagination();
    };
    $("#table-body").on('click', 'a[id^=delete]', deleteRecord); //навесили на контейнер - и забыли

    /*
     * устанавливает активной кнопку, соответсвующую переданному в параметре абсолютному номеру и грузит
     * сообветсвующую страницу с помощью loadPage
     * */
    function setCurrentPage(pn) {
        pageNumber = pn;
        if (!firstEntry) {
            loadPage();
        } else {
            //уже пришла готовая страница - не надо повторно вычитывать ее
            createPaginator();
            updatePagination();
        }
        firstEntry = false;
    };

    setCurrentPage(pageNumber); //начальная отрисовка блока кнопок

    /*
     * событие клика на номерной страничной кнопке
     * Вызывает setCurrentPage с параметром абсолютного номера страницы, соответсвующего выбранной кнопке*/
    function mainBtnClick() {
        var currentPageBtn = $(this);
        pageNumber = +currentPageBtn.text();
        setCurrentPage(pageNumber);
    };
    $('#btn-main-group').on('click', '.pagination-btn:not(.active)', mainBtnClick); //на уктивной кнопке можно не щелкать

    /*
     событие клика на кнопке "вправо"
     * */
    $('#btn-right').click(function () {
        var currentPageBtn = $('.pagination-btn.active');
        var lastVisible = (currentPageBtn.next(":visible").index() == -1);

        if (!lastVisible) { //вправо можно двинуться
            pageNumber = +currentPageBtn.next().text();
            setCurrentPage(pageNumber);
        } else {
            if (pageNumber < pagesCount) {
                pageNumber = +currentPageBtn.next().text();
                setCurrentPage(pageNumber);
            }
        }
    });

    /*
     событие клика на кнопке "влево"
     * */
    $('#btn-left').click(function () {
        var currentPageBtn = $('.pagination-btn.active');
        var firstVisible = (currentPageBtn.prev(":visible").index() == -1);
        if (!firstVisible) {
            pageNumber = +currentPageBtn.prev().text();
            setCurrentPage(pageNumber);
        } else {
            if (pageNumber > 1) {
                pageNumber = +currentPageBtn.prev().text();
                setCurrentPage(pageNumber);
            }
        }
    });

    $('#do-search').click(function () {
        filterField = $("#search-field option:contains(" + $("#search-field").val() + ")").attr('field-name');
        filterFieldValue = $("#srch-term").val();
        strictFilter = ($("#strict-search:checked").val() == "yes");
        setCurrentPage(1, 0);
    });

    $('#order-field').change(function () {
        orderField = $("#order-field option:contains(" + $(this).val() + ")").attr('field-name');
        setCurrentPage(1, 0);
    });

    $("#desc-order").change( function(){
        orderFieldDesc = ($("#desc-order:checked").val() == "yes");
        setCurrentPage(1, 0);
    });

    $('#do-refresh').click(function () {
        $("#srch-term").val('');
        filterField = "";
        filterFieldValue = "";
        strictFilter = "";
        setCurrentPage(1, 0);
    });
});
