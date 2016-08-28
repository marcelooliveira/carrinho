using React;

[assembly: WebActivatorEx.PreApplicationStartMethod(typeof(Carrinho.Web.ReactConfig), "Configure")]

namespace Carrinho.Web
{
    public static class ReactConfig
    {
        public static void Configure()
        {
            ReactSiteConfiguration.Configuration
                .AddScript("~/Scripts/showdown.js")
                .AddScript("~/Scripts/react-bootstrap.js")
                .AddScript("~/Scripts/Index.jsx")
                .AddScript("~/Scripts/CheckoutSuccess.jsx");
        }
    }
}