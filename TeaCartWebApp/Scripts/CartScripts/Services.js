
app.service("Cart_Service", function ($http) {



    this.GetItemDetails = function () {

        return $http.get("http://localhost:55244/Service1.svc/GetItemDetails/");

    };

    

    this.post = function (ItemDetails) {

        var request = $http({

            method: "post",

            url: "http://localhost:55244/Service1.svc/addItem",

            data: ItemDetails

        });

        return request;

    }

});
