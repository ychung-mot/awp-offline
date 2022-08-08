using AWP.Common;
using AWP.Service.Models;
using Microsoft.Owin;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace AWP.Web.Autentication
{
    public class PostAuthenticationHandler : OwinMiddleware
    {
        public PostAuthenticationHandler(OwinMiddleware next) : base(next)
        {
        }

        public override async Task Invoke(IOwinContext context)
        {
            var userSession = DependencyResolver.Current.GetService<IUserSession>().LoadUserSession(context.Request.User);

            if (context.Request.User.Identity.IsAuthenticated)
            {
                if (userSession.UserType == AwpUserTypes.BceidBusiness || userSession.UserType == AwpUserTypes.IDIR)
                {
                    userSession.AddClaim(AwpClaimTypes.FullName, Utilities.GetFullName(userSession.FirstName, userSession.LastName));
                }
            }
            else if (context.Request.Path.StartsWithSegments(new PathString("/swagger")))
            {
                context.Response.Redirect($"account/login?redirectUrl={context.Request.Uri.ToString().ToReverseProxyRedirectUrl()}");
                return;
            }
            else if (context.Request.Cookies[Constants.AwpKeycloakCookie].IsNotEmpty() 
                && context.Request.Cookies["SMSESSION"] != "LOGGEDOFF")
            {
                userSession.AddClaim(AwpClaimTypes.Expired, "true");
            }

            await Next.Invoke(context);
        }
    }
}