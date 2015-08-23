
var userCRUDApp = angular.module("userCRUDApp", ["ngResource"]);


userCRUDApp.controller("userCRUDController", function($scope, UserCRUDService){
    //сортировка
    $scope.orderFieldVariants = [
        {field: "id", fieldDescr:"ID"},
        {field: "name", fieldDescr:"Имя"},
        {field: "age", fieldDescr:"Возраст"},
        {field: "createdDate", fieldDescr:"Дата"},
        {field: "isAdmin", fieldDescr:"Админ"}
    ];
    $scope.orderField = $scope.orderFieldVariants[0];
    $scope.orderFieldDesc = false;
    //фильтр-поиск
    $scope.filterFieldVariants = [
        {field: "id", fieldDescr:"ID"},
        {field: "name", fieldDescr:"Имя"},
        {field: "age", fieldDescr:"Возраст"},
        {field: "createdDate", fieldDescr:"Дата"},
        {field: "wide-search", fieldDescr:"По всем"}
    ];
    $scope.filterField = $scope.filterFieldVariants[0];
    $scope.filterFieldValue = "";
    $scope.strictFilter = false;
    //
    $scope.getPageList = function() {
        var state = { //параметры для формирования запроса
            'pageNumber': $scope.pageNumber,
            'rowsPerPage': 10,
            'pageOffset': $scope.pageOffset,
            'orderField': $scope.orderField.field,
            'orderFieldDesc': $scope.orderFieldDesc,
            'filterField': $scope.filterField.field,
            'filterFieldValue': $scope.filterFieldValue,
            'strictFilter': $scope.strictFilter
        };
        var userPage = UserCRUDService.get({rtype: 'page', pState: state}, function(){
            $scope.userList = userPage.pageList; //суем под колбэк, т.к. надо дождаться резолва ответа (полной загрузки с сервера и заполнения данными)
            $scope.pagesCount = userPage.pagesCount;
            $scope.setButtons();
        });
        /*
         * можно еще так - через параметр колбека
         UserCRUDService.get({rtype: 'page', pState: state}, function(responce){
         $scope.userList = responce.pageList; //суем под колбэк, т.к. надо дождаться резолва ответа (полной загрузки с сервера и заполнения данными)
         });
         */
    };
    $scope.getPageList(); //первичная загрузка списка при заходе на страницу
    $scope.refreshPageList = function(){
        $scope.filterField = $scope.filterFieldVariants[0];
        $scope.filterFieldValue = "";
        $scope.strictFilter = false;
        getPageList();
    };
    //===============================Пагинатор======================================
    $scope.buttonsLimit = 10;
    $scope.buttonNumber = 1;

    $scope.setButtons = function(){
        $scope.buttonOffset = ($scope.buttonNumber+$scope.buttonsLimit-1)%$scope.buttonsLimit;
        $scope.startNumber = $scope.buttonNumber - $scope.buttonOffset;
        $scope.endNumber = $scope.startNumber +  $scope.buttonsLimit - 1;
        if ($scope.endNumber>$scope.pagesCount){
            var delta = $scope.endNumber-$scope.pagesCount;
            $scope.endNumber -= delta;
            $scope.startNumber -= delta;
            $scope.buttonOffset += delta;
        }
        $scope.buttons = [];
        for (i = $scope.startNumber; i<= $scope.endNumber; i++) {
            $scope.buttons.push({number: i, active: i==$scope.buttonNumber?'active':''});
        }
    }

    $scope.moveButton = function(step){
        var newNumber = $scope.buttonNumber+step;
        if ((newNumber<=$scope.pagesCount)&&(newNumber>=1)){
            $scope.buttonNumber = $scope.buttonNumber+step;
            $scope.pageNumber = $scope.buttonNumber;
            $scope.getPageList();
            //$scope.setButtons();
        }
    }

    $scope.setButton = function(number){
        $scope.buttonNumber = number;
        $scope.pageNumber = $scope.buttonNumber;
        $scope.getPageList();
        //$scope.setButtons();
    }

    $scope.moveButton(0);
    //=====================================================================
});

userCRUDApp.factory("UserCRUDService", function($resource){
    var url = "users/:rtype";
    var result = $resource(url);
    return result;
});