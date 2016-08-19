/// <reference path="angular.min.js" />
(function () {
    'use strict';

    angular
        .module('app', [])
        .controller('cart', function ($scope, $http) {

            $scope.myCart;

            $scope.showLoading = function () {
                document.getElementById('loading').style.display = '';
            }

            $scope.hideLoading = function () {
                document.getElementById('loading').style.display = 'none';
            }

            $scope.loadCart = function () {
                $http({
                    method: 'GET',
                    url: '/api/Cart'
                }).then(function successCallback(response) {
                    $scope.myCart = new Cart(response.data);
                });
            }

            $scope.loadCart();

            $scope.changeQuantity = function (item, newQuantity) {
                $scope.showLoading();
                $http({
                    method: 'POST',
                    url: '/api/Cart',
                    data: {
                        SKU: item.SKU,
                        Quantity: newQuantity,
                        Price: item.Price
                    }
                }).then(function successCallback(response) {
                    $scope.hideLoading();

                    var changedItem;
                    var changedIndex;
                    var cartDto = response.data;
                    for (var i = 0; i < cartDto.CartItems.length; i++) {
                        var cartItem = cartDto.CartItems[i];
                        if (cartItem.SKU == item.SKU) {
                            changedIndex = i;
                            changedItem = cartItem;
                            item.Quantity = changedItem.Quantity;
                            item.Subtotal = changedItem.Subtotal;
                            break;
                        }
                    }
                    $scope.myCart.Subtotal = cartDto.Subtotal;
                    $scope.myCart.DiscountValue = cartDto.DiscountValue;
                    $scope.myCart.DiscountRate = cartDto.DiscountRate;
                    $scope.myCart.Total = cartDto.Total;

                    if (changedItem.Quantity == 0) {
                        $scope.myCart.cartItems.splice(changedIndex, 1);
                    }
                }, function errorCallback(response) {
                    $scope.hideLoading();
                    alert('Ocorreu um erro ao processar a operação.')
                });
            }

            $scope.increment = function (item) {
                $scope.changeQuantity(item, item.Quantity + 1);
            }

            $scope.decrement = function (item) {
                $scope.changeQuantity(item, item.Quantity - 1);
            }

            $scope.onQuantityChanged = function ($event, item) {
                if (!isNaN($event.currentTarget.value)) {
                    $scope.changeQuantity(item, parseInt($event.currentTarget.value));
                }
            }
        });
})();

var Cart = function (cartDto) {
    this.MININUM_ORDER = 200;
    this.cartItems = [];
    this.Subtotal = cartDto.Subtotal;
    this.DiscountValue = cartDto.DiscountValue;
    this.DiscountRate = cartDto.DiscountRate;
    this.Total = cartDto.Total;
    for (var i = 0; i < cartDto.CartItems.length; i++) {
        this.cartItems.push(new CartItem(cartDto.CartItems[i]));
    }
}

Cart.prototype.CanFinishOrder = function () {
    return this.Total >= this.MININUM_ORDER;
}

var CartItem = function (item) {
    this.Id = item.Id;
    this.SKU = item.SKU;
    this.Description = item.Description;
    this.SoldAndDeliveredBy = item.SoldAndDeliveredBy;
    this.Price = item.Price;
    this.OldPrice = item.OldPrice;
    this.Quantity = item.Quantity;
    this.Subtotal = item.Subtotal;
}
