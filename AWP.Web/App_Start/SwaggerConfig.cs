using System.Web.Http;
using WebActivatorEx;
using AWP.Web;
using Swashbuckle.Application;
using System.Configuration;
using System.Linq;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "Register")]

namespace AWP.Web
{
    public class SwaggerConfig
    {
        public static void Register()
        {
            string enableSwagger = ConfigurationManager.AppSettings["EnableSwagger"];
            if ( enableSwagger != "true" )
            {
                return;
            }

            var thisAssembly = typeof(SwaggerConfig).Assembly;

            GlobalConfiguration.Configuration
                .EnableSwagger(c =>
                    {
                        c.ResolveConflictingActions(apiDescriptions => apiDescriptions.First());
                        c.SingleApiVersion("v1", "AWP.Web");
                        c.PrettyPrint();
                        c.IncludeXmlComments(GetXmlCommentsPathForControllers());
                        c.IncludeXmlComments(GetXmlCommentsPathForModels());

                    })
                .EnableSwaggerUi(c =>
                    {
                        c.SupportedSubmitMethods("GET", "HEAD");
                    });
        }

        private static string GetXmlCommentsPathForControllers()
        {
            return string.Format(@"{0}\bin\AWP.Web.xml",
                System.AppDomain.CurrentDomain.BaseDirectory);
        }

        private static string GetXmlCommentsPathForModels()
        {
            return string.Format(@"{0}\bin\AWP.Service.xml",
                System.AppDomain.CurrentDomain.BaseDirectory);
        }
    }
}
