using System.Web;
using System.Web.Mvc;
using AWP.Service.Models;
using Microsoft.Owin.Security;
using AWP.Common;

namespace AWP.Web.Controllers
{
    public class AccountController : BaseController
    {
        public AccountController(HttpContextBase httpContextWrapper, IUserSession userSession)
            : base(userSession, httpContextWrapper)
        {
        }

        [AllowAnonymous]
        public ActionResult Login(string redirectUrl)
        {
            ViewBag.Title = "Login";
            ViewBag.RedirectUrl = redirectUrl.ToReverseProxyRedirectUrl();

            return View();
        }

        [AllowAnonymous]
        public void SignIn(string idpHint, string redirectUrl)
        {
            var authProps = new AuthenticationProperties { RedirectUri = redirectUrl.ToReverseProxyRedirectUrl() };

            if (idpHint != null)
                authProps.Dictionary.Add("IdpHint", idpHint);

            HttpContext.GetOwinContext().Authentication.Challenge(authProps, Common.Constants.AwpAuthType);
        }

        /// <summary>
        /// Signs out the user from Keycloak.
        /// </summary>
        [AllowAnonymous]
        public void SignOut()
        {
            HttpContext.GetOwinContext().Authentication.SignOut(
                new AuthenticationProperties(),
                Common.Constants.AwpAuthType);
        }

        [AllowAnonymous]
        public ActionResult SignedOut()
        {
            if (Request.IsAuthenticated)
            {
                // Redirect to home page if the user is authenticated.
                return RedirectToAction("Index", "Home");
            }

            ViewBag.Title = "Signed Out";
            ViewBag.Header = "You have been signed out successfully";

            return View();
        }

        [AllowAnonymous]
        public void SignOutSm()
        {
            var callbackUrl = Url.Action("SignedOut", "Account", routeValues: null, protocol: Request.Url.Scheme).ToReverseProxyRedirectUrl();

            var smLogoutURL = System.Configuration.ConfigurationManager.AppSettings["SiteminderLogoutURL"];

            Response.Redirect(smLogoutURL + $"?returl={callbackUrl}&retnow=1");
        }
    }
}