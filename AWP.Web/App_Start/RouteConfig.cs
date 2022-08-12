using System.Web.Mvc;
using System.Web.Routing;

namespace AWP.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "DefaultToIndex",
                url: "{_}",
                defaults: new { controller = "Home", action = "Index", id = "" }
            );
            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = "" }
            );
        }
    }
}
