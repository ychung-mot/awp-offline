using AWP.Common;
using AWP.Service.Models;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace AWP.Web.Authorization
{
    public class AwpApiAuthorizeAttribute : AuthorizeAttribute
    {
        private string[] _permissions;

        /// <summary>
        /// Allow access users with ANY of the permissions passed
        /// </summary>
        /// <param name="permissions"></param>
        public AwpApiAuthorizeAttribute(params string[] permissions) : base()
        {
            _permissions = permissions;
        }

        protected override bool IsAuthorized(HttpActionContext actionContext)
        {
            var user = (ClaimsPrincipal)actionContext.RequestContext.Principal;

            if (!user.Identity.IsAuthenticated)
                return false;

            if (_permissions.Length == 0)
                return true;

            foreach(var permission in _permissions)
            {
                if (user.HasClaim(AwpClaimTypes.Permission, permission))
                    return true;
            }

            return false;
        }

        protected override void HandleUnauthorizedRequest(HttpActionContext actionContext)
        {
            var user = (ClaimsPrincipal)actionContext.RequestContext.Principal;

            if (user.HasClaim(AwpClaimTypes.Expired, "true"))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }
            else
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Forbidden);
            }

            UserSession.RemoveClaim(user, AwpClaimTypes.Expired);
        }

    }
}