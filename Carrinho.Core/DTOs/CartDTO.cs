using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Carrinho.Core.DTOs
{
    public class CartDTO
    {
        public CartDTO()
        {
        }

        public decimal Subtotal { get; set; }
        public decimal DiscountRate { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal Total { get; set; }

        public List<CartItemDTO> CartItems { get; set; }
    }
}