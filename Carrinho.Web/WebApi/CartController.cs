using Carrinho.Core;
using Carrinho.Core.DTOs;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web;
using System.Web.Http;

namespace Carrinho.Web.WebApi
{
    public class CartController : ApiController
    {
        readonly ICheckoutManager checkoutManager;

        public CartController()
        {
            this.checkoutManager = AutoFacHelper.Resolve<ICheckoutManager>();
        }

        public CartController(ICheckoutManager checkoutManager)
        {
            this.checkoutManager = checkoutManager;
        }

        // GET: api/Cart
        public CartDTO Get()
        {
            return checkoutManager.GetCart();
        }

        // GET: api/Cart/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Cart
        public CartDTO Post([FromBody]CartItemDTO value)
        {
            var cart = checkoutManager.GetCart();
            var cartItem = cart.CartItems.Where(i => i.SKU == value.SKU).SingleOrDefault();
            if (cartItem != null)
             {
                cartItem.Quantity = value.Quantity;
                var recalculatedCart = checkoutManager.GetCart(cart.CartItems);

                checkoutManager.SaveCart(cartItem);
                return recalculatedCart;
            }
            else
            {
                return cart;
            }
        }

        // PUT: api/Cart/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Cart/5
        public void Delete(int id)
        {
        }
    }
}
