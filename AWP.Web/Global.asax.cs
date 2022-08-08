using AWP.Web.App_Start;
using System;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using System.Web.Http;
using System.Web.Helpers;
using System.Security.Claims;
using System.Net;

namespace AWP.Web
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            // Ensure site forces TLS as needed for API Key authentication and standards compliance
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            string ApplicationBaseDirectory = AppDomain.CurrentDomain.BaseDirectory;
            Bootstrapper.Run();
            AreaRegistration.RegisterAllAreas();
            GlobalConfiguration.Configure(WebApiConfig.Register);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);

            //Identity system
            AntiForgeryConfig.UniqueClaimTypeIdentifier = ClaimTypes.Name;
        }

        // Capture any OWIN errors
        void Application_Error(object sender, EventArgs e)
        {
            Exception exc = Server.GetLastError();

            if (exc is NullReferenceException && exc.Source == "Microsoft.Owin.Security")
            {
                Server.ClearError();
                Response.Redirect("~/NoAccess");
            }
        }
        // Set session state for API requests.
        // https ://peter.grman.at/request-authorization-in-asp-net-web-api/
        protected void Application_PostAuthorizeRequest()
        {
            if (IsWebApiRequest())
            {
                HttpContext.Current.SetSessionStateBehavior(
                  System.Web.SessionState.SessionStateBehavior.Required);
            }
        }

        private static bool IsWebApiRequest()
        {
            return HttpContext.Current.Request.AppRelativeCurrentExecutionFilePath.StartsWith(@"~/api");
        }

    }
}
