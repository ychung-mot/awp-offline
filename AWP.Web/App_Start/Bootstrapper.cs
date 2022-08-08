using Autofac;
using Autofac.Integration.WebApi;
using Autofac.Integration.Mvc;
using System.Web;
using System.Web.Mvc;
using System.Reflection;
using AWP.Service.Models;
using Hangfire;

namespace AWP.Web.App_Start
{
    public class Bootstrapper
    {
        public static void Run()
        {
            ConfigureWebRequestContainer();
            ConfigureHangfireContainer();
        }

        public static void ConfigureHangfireContainer()
        {
            var builder = new ContainerBuilder();
            var container = builder.Build();
            GlobalConfiguration.Configuration.UseAutofacActivator(container);
        }

        public static void ConfigureWebRequestContainer()
        {
            var builder = new ContainerBuilder();

            // Session
            builder.RegisterType<UserSession>().As<IUserSession>().InstancePerRequest();

            // Controllers
            builder.RegisterAssemblyModules(typeof(MvcApplication).Assembly);
            builder.RegisterModule(new AutofacWebTypesModule());
            builder.RegisterControllers(Assembly.GetExecutingAssembly()).InstancePerRequest();
            builder.RegisterApiControllers(Assembly.GetExecutingAssembly()).InstancePerRequest();
            builder.Register(c => new HttpContextWrapper(HttpContext.Current)).As<HttpContextWrapper>()
                .InstancePerRequest();

            // Filters
            builder.RegisterFilterProvider();

            // Container
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));

            System.Web.Http.GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }
    }
}