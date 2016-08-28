using Carrinho.Core;
using Carrinho.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Carrinho.Web.Controllers
{
    public class HomeController : Controller
    {
        readonly ICheckoutManager checkoutManager;

        private static IList<CommentModel> _comments;

        public HomeController()
        {
            this.checkoutManager = AutoFacHelper.Resolve<ICheckoutManager>();
        }

        public HomeController(ICheckoutManager checkoutManager)
        {
            this.checkoutManager = checkoutManager;
        }

        public ActionResult Index()
        {
            return View(checkoutManager.GetCart());
        }

        public ActionResult CheckoutSuccess()
        {
            return View(checkoutManager.GetCheckoutSummary());
        }

        public ActionResult NewProduct()
        {
            return View();
        }
    }
}

