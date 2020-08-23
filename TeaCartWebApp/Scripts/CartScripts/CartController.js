
/// <reference path="../angular.js" />  
/// <reference path="../angular.min.js" />   
/// <reference path="../angular-animate.js" />   
/// <reference path="../angular-animate.min.js" />   
/// <reference path="Modules.js" />   
/// <reference path="Services.js" />   

app.controller("TeaCart_Controller", function ($scope, $http, $timeout, $rootScope, $window, Cart_Service) {

    $scope.date = new Date();


    var firstbool = true;

    $scope.Image_Name = "";

    $scope.Item_Name = "";

    $scope.Item_Description = "";

    $scope.Item_Price = "0";



    // Item list 

    $scope.items = [];

    // cart 

    $scope.showItem = false;

    $scope.showDetails = false;

    $scope.showCartDetails = false;

    var ItemCountExist = 0;

    // Total Price,Total Qty and GrandTotal 

    $scope.totalPrice = 0;

    $scope.totalQty = 0;

    $scope.GrandtotalPrice = 0;


    // load all details.

    GetItemDetails();
 

    function GetItemDetails() {


        $scope.showItem = false;

        $scope.showDetails = true;

        $scope.showCartDetails = false;


        var promiseGet = Cart_Service.GetItemDetails();

        promiseGet.then(function (pl) {

            $scope.getItemDetailsDisp = pl.data

        },

            function (errorPl) {

            });

    }

    $scope.showImage = function (imageNm, ItemName, ItemPrize, ItemDescription) {



        $scope.Image_Name = imageNm;

        $scope.Item_Name = ItemName;

        $scope.Item_Description = ItemDescription;

        $scope.Item_Price = ItemPrize;

        $scope.showItem = true;

        $scope.showDetails = true;

        $scope.showCartDetails = false;

        ItemCountExist = 0;

    }

    $scope.showMyCart = function () {

        if ($scope.items.length > 0) {

            alert("You have added " + $scope.items.length + " Items in Your Cart !");

            $scope.showItem = false;

            $scope.showDetails = false;

            $scope.showCartDetails = true;

        }

        else {

            alert("Ther is no Items In your Cart.Add Items to view your Cart Details !")

        }

    }

    //hide details
    $scope.showCart = function () {

        $scope.showItem = true;

        $scope.showDetails = false;

        $scope.showCartDetails = true;

        addItemstoCart();

    }

    function getItemTotalresult() {

        $scope.totalPrice = 0;

        $scope.totalQty = 0;

        $scope.GrandtotalPrice = 0;


        for (count = 0; count < $scope.items.length; count++) {



            $scope.totalPrice += parseInt($scope.items[count].Item_Prices);

            $scope.totalQty += ($scope.items[count].ItemCounts);




            $scope.GrandtotalPrice += ($scope.items[count].Item_Prices * $scope.items[count].ItemCounts);

        }

    }


    function addItemstoCart() {



        if ($scope.items.length > 0) {

            for (count = 0; count < $scope.items.length; count++) {



                if ($scope.items[count].Item_Names == $scope.Item_Name) {


                    ItemCountExist = $scope.items[count].ItemCounts + 1;

                    $scope.items[count].ItemCounts = ItemCountExist;

                }

            }
        }

        if (ItemCountExist <= 0) {

            ItemCountExist = 1;

            var ItmDetails = {


                Item_Names: $scope.Item_Name,

                Descriptions: $scope.Item_Description,

                Item_Prices: $scope.Item_Price,

                Image_Names: $scope.Image_Name,

                ItemCounts: ItemCountExist

            };

            $scope.items.push(ItmDetails);

            $scope.item = {};


        }

        getItemTotalresult();




    }


    //remove  Item 

    $scope.removeFromCart = function (index) {

        $scope.items.splice(index, 1);

    }


    // Show the Item Details to add 

    $scope.showItemDetails = function () {

        $scope.showItem = false;

        $scope.showDetails = true;

        $scope.showCartDetails = false;


    }

});