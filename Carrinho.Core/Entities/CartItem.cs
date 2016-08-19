using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Carrinho.Core.Entities
{
    [Table("CartItem")]
    public class CartItem
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string SKU { get; set; }
        public string Description { get; set; }
        public string SoldAndDeliveredBy { get; set; }
        public decimal Price { get; set; }
        public decimal? OldPrice { get; set; }
        public int Quantity { get; set; }
        [NotMapped]
        public decimal Subtotal
        {
            get
            {
                return Quantity * Price;
            }
        }
    }
}