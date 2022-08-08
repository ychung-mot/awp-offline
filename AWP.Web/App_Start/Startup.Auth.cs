using Microsoft.Owin.Security.Cookies;
using Owin;
using Microsoft.Owin.Security;
using AWP.Web.Autentication;
using AWP.Common;

namespace AWP.Web
{
    public partial class Startup
    {
        public void ConfigureAuth(IAppBuilder app)
        {
            app.SetDefaultSignInAsAuthenticationType(Common.Constants.AwpAuthType);

            app.UseCookieAuthentication(new CookieAuthenticationOptions
            {
                AuthenticationType = Constants.AwpAuthType
            });

            app.UseAwpAuthentication();

        }
    }
}