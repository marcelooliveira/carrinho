using Carrinho.Core.DTOs;
using Carrinho.Core.Entities;
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

        public void SaveCart(CartItemDTO newOrEditItem)
        {
            using (var db = new Contexto())
            {
                var cartItem = db.CartItem
                    .Where(i => i.SKU == newOrEditItem.SKU)
                    .SingleOrDefault();

                if (cartItem != null)
                {
                    if (newOrEditItem.Quantity == 0)
                        db.CartItem.Remove(cartItem);
                    else
                        cartItem.Quantity = newOrEditItem.Quantity;
                }
                else
                {
                    db.CartItem.Add(new CartItem
                    {
                        SKU = newOrEditItem.SKU,
                        Description = newOrEditItem.Description,
                        SoldAndDeliveredBy = newOrEditItem.SoldAndDeliveredBy,
                        Price = newOrEditItem.Price,
                        OldPrice = newOrEditItem.OldPrice,
                        Quantity = newOrEditItem.Quantity
                    });
                }

                db.SaveChanges();
            }
        }

        private List<CartItemDTO> GetCartItemsFromFile()
        {
            using (var db = new Contexto())
            {
                return db.CartItem.Select(ci =>
                    new CartItemDTO
                    {
                        Id = ci.Id,
                        SKU = ci.SKU,
                        Description = ci.Description,
                        SoldAndDeliveredBy = ci.SoldAndDeliveredBy,
                        Price = ci.Price,
                        OldPrice = ci.OldPrice,
                        Quantity = ci.Quantity
                    }).ToList();
            }
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

        public Contexto InitializeDB()
        {
            var db = new Contexto();

            if (!db.Database.Exists())
            {
                db.Database.CreateIfNotExists();

                db.CartItem.Add(new CartItem
                    {
                        SKU = Guid.NewGuid().ToString(),
                        Description = "Headphone sem fio com Bluetooth MDR-ZX330BT - Único - Sony",
                        SoldAndDeliveredBy = "Best Shop Brasil",
                        Price = 387.99M,
                        OldPrice = 399.99M,
                        Quantity = 1
                    });


                db.CartItem.Add(new CartItem
                    {
                        SKU = Guid.NewGuid().ToString(),
                        Description = "Console PS4 Sony Nacional com 500GB Preto - Sony",
                        SoldAndDeliveredBy = "Walmart",
                        Price = 1999.00M,
                        OldPrice = 2299.00M,
                        Quantity = 1
                    });

                db.CartItem.Add(new CartItem
                    {
                        SKU = Guid.NewGuid().ToString(),
                        Description = "Jogo PS4 THE LAST OF US Remasterizado - Único - Sony",
                        SoldAndDeliveredBy = "Shock Games",
                        Price = 179.90M,
                        Quantity = 1
                    });

                db.SaveChanges();

            }
            return db;
        }
    }
}
