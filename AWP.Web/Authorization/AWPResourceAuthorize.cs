using System.Web;
using System.Web.Mvc;
using AuthorizationContext = System.Web.Mvc.AuthorizationContext;
using System.Security.Claims;
using AWP.Common;

namespace AWP.Web.Authorization
{
    public class AwpResourceAuthorizeAttribute : AuthorizeAttribute
    {
        private string[] _permissions;

        /// <summary>
        /// Allow access users with ANY of the permissions passed
        /// </summary>
        /// <param name="permissions"></param>
        public AwpResourceAuthorizeAttribute(params string[] permissions) : base()
        {
            _permissions = permissions;
        }

        protected override bool AuthorizeCore(HttpContextBase httpContext)
        {
            var user = (ClaimsPrincipal)httpContext.User;

            if (!user.Identity.IsAuthenticated)
                return false;

            if (_permissions.Length == 0)
                return true;

            foreach (var permission in _permissions)
            {
                if (user.HasClaim(AwpClaimTypes.Permission, permission))
                    return true;
            }

            return false;
        }

        protected override void HandleUnauthorizedRequest(AuthorizationContext filterContext)
        {
            var context = filterContext.HttpContext;
            var user = (ClaimsPrincipal)filterContext.HttpContext.User;
            var redirectUrl = filterContext.HttpContext.Request.Url.ToString().ToReverseProxyRedirectUrl();

            if (context.Request.IsAuthenticated) 
            {
                filterContext.Result = new ViewResult
                {
                    ViewName = "~/Views/Shared/Unauthorized.cshtml",
                    ViewBag = { UserName = filterContext.HttpContext.User.Identity.Name, Reason = "No permission" }
                };
            }
            else  
            {
                filterContext.Result = new ViewResult
                {
                    ViewName = "~/Views/Account/Login.cshtml",
                    ViewBag = { Title = "Login", RedirectUrl = redirectUrl },
                };
            }
        }
    }
}