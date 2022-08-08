using AWP.Service.Models;
using AWP.Web.Authorization;
using System.Web;
using System.Web.Mvc;


namespace AWP.Web
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters )
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
