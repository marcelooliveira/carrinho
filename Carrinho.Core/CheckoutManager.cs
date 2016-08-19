using Carrinho.Core.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carrinho.Core
{
    public class CheckoutManager : ICheckoutManager
    {
        private string serverFilePath;

        public CheckoutManager()
        {
        }

        public CheckoutManager(string serverFilePath)
        {
            this.serverFilePath = serverFilePath;
        }

        public CheckoutSummaryDTO GetCheckoutSummary()
        {
            var cartItems = GetCartItemsFromFile();
            var subtotal = cartItems.Sum(i => i.Subtotal);
            var discountRule = DiscountManager.Instance.GetDiscount(subtotal);
            var discountValue = discountRule.CalculatedDiscount;
            var total = subtotal - discountValue;

            return new CheckoutSummaryDTO
            {
                OrderNumber = "123456789",
                DeliveryUpToNWorkingDays = 4,
                Total = total,
                CustomerInfo = GetDummyCustomerInfo(),
                CartItems = cartItems
            };
        }

        public CartDTO GetCart()
        {
            return GetCart(GetCartItemsFromFile());
        }

        public CartDTO GetCart(List<CartItemDTO> cartItems)
        {
            var subtotal = cartItems.Sum(i => i.Subtotal);
            var discountRule = DiscountManager.Instance.GetDiscount(subtotal);
            var discountValue = discountRule.CalculatedDiscount;
            var total = subtotal - discountValue;

            return new CartDTO
            {
                Subtotal = subtotal,
                DiscountRate = discountRule.Rate * 100M,
                DiscountValue = discountValue,
                Total = total,
                CartItems = cartItems
            };
        }

        public void SaveCart(CartItemDTO modifiedItem)
        {
            var cart = GetCart();
            var cartItem = cart.CartItems.Where(i => i.SKU == modifiedItem.SKU).SingleOrDefault();
            if (cartItem != null)
            {
                cartItem.Quantity = modifiedItem.Quantity;
                if (cartItem.Quantity == 0)
                    cart.CartItems.Remove(cartItem);
            }
            else
            {
                cart.CartItems.Add(modifiedItem);
            }

            using (StreamWriter sw = new StreamWriter(this.serverFilePath))
            {
                sw.Write(JsonConvert.SerializeObject(cart.CartItems));
            }
        }

        private List<CartItemDTO> GetCartItemsFromFile()
        {
            List<CartItemDTO> cartItems;
            if (!File.Exists(serverFilePath))
            {
                cartItems = CreateAndGetNewDataFile(this.serverFilePath);
            }
            else
            {
                using (StreamReader sr = new StreamReader(this.serverFilePath, true))
                {
                    cartItems = JsonConvert.DeserializeObject<List<CartItemDTO>>(sr.ReadToEnd());
                }
            }

            return cartItems;
        }

        public List<CartItemDTO> CreateAndGetNewDataFile(string serverFilePath)
        {
            var list = new List<CartItemDTO>
            {
                new CartItemDTO
                {
                    Id = 1,
                    SKU = "000001",
                    Description = "Headphone sem fio com Bluetooth MDR-ZX330BT - Único - Sony",
                    SoldAndDeliveredBy = "Best Shop Brasil",
                    Price = 387.99M,
                    OldPrice = 399.99M,
                    Quantity = 1
                },
                new CartItemDTO
                {
                    Id = 2,
                    SKU = "000002",
                    Description = "Console PS4 Sony Nacional com 500GB Preto - Sony",
                    SoldAndDeliveredBy = "Walmart",
                    Price = 1999.00M,
                    OldPrice = 2299.00M,
                    Quantity = 1
                },
                new CartItemDTO
                {
                    Id = 3,
                    SKU = "000003",
                    Description = "Jogo PS4 THE LAST OF US Remasterizado - Único - Sony",
                    SoldAndDeliveredBy = "Shock Games",
                    Price = 179.90M,
                    Quantity = 1
                }
            };

            using (StreamWriter sw = new StreamWriter(serverFilePath))
            {
                sw.WriteLine(JsonConvert.SerializeObject(list));
            }

            return list;
        }

        private CustomerInfoDTO GetDummyCustomerInfo()
        {
            return new CustomerInfoDTO
            {
                CustomerName = "John Doe",
                PhoneNumber = "(11) 555-12345",
                Email = "johndoe@email.com",
                DeliveryAddress = "Alameda Araguaia, 2751 - Barueri - SP, 06455-906"
            };
        }
    }
}
