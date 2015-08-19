/**
 * Created by Valk on 14.08.15.
 */
$(document).ready(main = function () {
    var rowsPerPage = $('#table-body').attr('rowsPerPage');
    var pageBtnLimit = $('#table-body').attr('pageBtnLimit');
    var pagesCount;

    var createPaginator = function () {
        var limit = Math.min(pageBtnLimit, pagesCount);
        var i;
        $('.pagination-btn').remove();
        for (i = 1; i <= limit; i++) {
            $("#btn-main-group").append('<button id=btn-idx' + i + ' class="btn btn-default pagination-btn">' + i + '</button>');
        }
        for (i = limit + 1; i <= pagesCount; i++) {
            $("#btn-main-group").append('<button id=btn-idx' + i + ' class="btn btn-default pagination-btn hidden">' + i + '</button>');
        }
        $('.pagination-btn').first().addClass("active");
    };

    var updatePagination = function () {
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


    var markUpPages = function () {
        if ($("div").is(".pageBlock")) {
            $(".pageBlock>.row").unwrap();
            $(".pageBlock").remove();
        }
        var blockNumber = 1;
        while ($("#table-body>.row").not(".masked").eq(0).text() !== '') {
            $("#table-body>.row").not(".masked").slice(0, rowsPerPage).wrapAll("<div id = " + blockNumber + " class = pageBlock>");
            blockNumber++;
        }
        $("#table-body>.row").not("masked").wrapAll("<div id = MASKED class = pageBlock>");
        pagesCount = blockNumber - 1;
        createPaginator();
    };

    var mainBtnClick = function () {
        var currentPageBtn = $(this).parent().find('button.active');
        currentPageBtn.removeClass('active');
        currentPageBtn = $(this);
        currentPageBtn.addClass('active');

        var currentPageIdx = currentPageBtn.text();
        setCurrentPage(currentPageIdx);
    };//);

    var setCurrentPage = function (pageIdx) {
        if (!$("div").is(".pageBlock")) {
            markUpPages();
        }
        $('div.pageBlock.active').removeClass('active');
        $('div.pageBlock#' + pageIdx).addClass('active');

        $('.pagination-btn').unbind('click');
        $('.pagination-btn:not(.active)').click(mainBtnClick);

        updatePagination();
    };

    setCurrentPage(1);

    $('#btn-right').click(function () {
        var currentPageBtn = $('.pagination-btn.active');
        var currentPageIdx = currentPageBtn.text();
        var lastVisible = (currentPageBtn.next(":visible").index() == -1);
        if (!lastVisible) {

            currentPageBtn.removeClass('active');
            currentPageBtn = currentPageBtn.next();
            currentPageBtn.addClass('active');

            currentPageIdx = currentPageBtn.text();
            setCurrentPage(currentPageIdx);
        } else {
            if (currentPageIdx < pagesCount) {
                $('.pagination-btn:visible').eq(0).addClass("hidden"); //first() (падла) ищет без учета фильтра

                currentPageBtn.next().removeClass('hidden');
                currentPageBtn.removeClass('active');
                currentPageBtn = currentPageBtn.next();
                currentPageBtn.addClass('active');

                currentPageIdx = currentPageBtn.text();
                setCurrentPage(currentPageIdx);
            }
        }
    });

    $('#btn-left').click(function () {
        var currentPageBtn = $('.pagination-btn.active');
        var currentPageIdx = currentPageBtn.text();
        var firstVisible = (currentPageBtn.prev(":visible").index() == -1);
        if (!firstVisible) {

            currentPageBtn.removeClass('active');
            currentPageBtn = currentPageBtn.prev();
            currentPageBtn.addClass('active');

            currentPageIdx = currentPageBtn.text();
            setCurrentPage(currentPageIdx);
        } else {
            if (currentPageIdx > 1) {
                $('.pagination-btn:visible').eq(pageBtnLimit - 1).addClass("hidden");

                currentPageBtn.prev().removeClass('hidden');
                currentPageBtn.removeClass('active');
                currentPageBtn = currentPageBtn.prev();
                currentPageBtn.addClass('active');

                currentPageIdx = currentPageBtn.text();
                setCurrentPage(currentPageIdx);
            }
        }
    });

    var setWideFilter = function (val, field, strict) {
        $("#table-body>.pageBlock>.row").removeClass("masked");
        if (val !== '') {
            if (strict==='yes'){
                if (field === 'wide-search') {
                    $("#table-body>.pageBlock>.row").each(function (indx, element) {
                        if (($(element).find(".user-id>p").text() !== val) &&
                            ($(element).find(".user-name>p").text() !== val) &&
                            ($(element).find(".user-age>p").text() !== val) &&
                            ($(element).find(".user-date>p").text() !== val)) {
                            $(element).addClass("masked");
                        }
                    });
                } else {
                    $("#table-body>.pageBlock>.row").each(function (indx, element) {
                        if ($(element).find(".user-" + field + ">p").text() !== val) {
                            $(element).addClass("masked");
                        }
                    });
                }
            } else {
                if (field === 'wide-search') {
                    $("#table-body>.pageBlock>.row").each(function (indx, element) {
                        if ((($(element).find(".user-id>p").text().indexOf(val)) == -1) &&
                            (($(element).find(".user-name>p").text().indexOf(val)) == -1) &&
                            (($(element).find(".user-age>p").text().indexOf(val)) == -1) &&
                            (($(element).find(".user-date>p").text().indexOf(val)) == -1)) {
                            $(element).addClass("masked");
                        }
                    });
                } else {
                    $("#table-body>.pageBlock>.row").each(function (indx, element) {
                        if ((($(element).find(".user-" + field + ">p").text().indexOf(val)) == -1)) {
                            $(element).addClass("masked");
                        }
                    });
                }

            }
        }
    };

    $('#do-search').click(function () {
        var searchValue = $("#srch-term").val();
        var searchField = $("option:contains(" + $("#search-field").val() + ")").attr('field-name');
        var strict = $("#strict-search:checked").val();
        setWideFilter(searchValue, searchField, strict);
        markUpPages();
        setCurrentPage(1);
    });

    $('#do-refresh').click(function () {
            window.location.replace("userList-myLocalTable");
        }
    );


    $("#table-body a[id^=deletelocal]").click(function () {
        var row = $(this).parentsUntil(".row").parent();
        var userId = row.children(".user-id").text();
        $.ajax({
            type: 'POST',
            url: 'deletelocal?id=' + userId,
            "async": false,
            success: function (result) {
                if (result > 0) {
                    row.remove();
                }
            }
        });
    });

});
