using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AWP.Web.Startup))]

namespace AWP.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }   
}
