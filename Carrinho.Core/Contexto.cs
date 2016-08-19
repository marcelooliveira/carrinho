using Carrinho.Core.Entities;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Carrinho.Core
{
    public class Contexto : DbContext
    {
        public DbSet<CartItem> CartItem { get; set; }
    }
}
