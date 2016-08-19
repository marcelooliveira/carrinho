using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using System.Web.SessionState;
using System.Web.Http;
using Autofac;
using Carrinho.Core;
using Autofac.Core;

namespace Carrinho.Web
{
    public class Global : HttpApplication
    {
        void Application_Start(object sender, EventArgs e)
        {
            // Code that runs on application startup
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            string serverFilePath = Server.MapPath("~/cart.json");
            AutoFacHelper.Initialize(serverFilePath);
            var checkoutManager = AutoFacHelper.Resolve<ICheckoutManager>();
            checkoutManager.CreateAndGetNewDataFile(serverFilePath);
        }
    }
}