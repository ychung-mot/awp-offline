using Microsoft.Owin.Security.OAuth;
using System;
using System.Net.Http.Formatting;
using System.Web.Http;


namespace AWP.Web
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            config.Filters.Add(new HostAuthenticationFilter(OAuthDefaults.AuthenticationType));

            // allow for posting files to the api.
            // just for basestations to post weather station data files
            config.Formatters.XmlFormatter.SupportedMediaTypes.Add(new System.Net.Http.Headers.MediaTypeHeaderValue("multipart/form-data"));

            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/v1/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );

            config.Formatters.JsonFormatter.MediaTypeMappings.Add(
                new RequestHeaderMapping(
                    "Accept", 
                    "text/html", 
                    StringComparison.InvariantCultureIgnoreCase, 
                    true, 
                    "application/json"));

            config.Formatters.JsonFormatter.MediaTypeMappings.Add(
                new RequestHeaderMapping(
                    "Accept",
                    "application/json",
                    StringComparison.InvariantCultureIgnoreCase,
                    true,
                    "application/json"));
        }
    }
}
