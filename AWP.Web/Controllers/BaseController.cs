using AWP.Service.Models;
using System.Configuration;
using System.Web;
using System.Web.Mvc;

namespace AWP.Web.Controllers
{
    public abstract class BaseController : Controller
    {
        internal readonly IUserSession _userSession;
        private bool? _enableDebugInfo = null;

        protected BaseController(IUserSession userSession, HttpContextBase httpContextWrapper)
        {
            var systemHttpContext = httpContextWrapper;

            _userSession = userSession.LoadUserSession(systemHttpContext.User);
        }

        bool EnableDebugInfo
        {
            get
            {
                if (_enableDebugInfo == null)
                {
                    string enableDebugAppSetting = ConfigurationManager.AppSettings["EnableDebugInfo"];
                    _enableDebugInfo = enableDebugAppSetting == "true";
                }

                return _enableDebugInfo ?? false;
            }
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            ViewBag.UserName = this._userSession.UserName;
            ViewBag.UserGuid = this._userSession.UserGuid;
            ViewBag.UserType = this._userSession.UserType;

            // Set a default value for JsBundle. Most, if not all, controllers will want to 
            // specify a js bundle to load.
            ViewBag.JsBundle = "";

            // Default values... specific controllers can override these if they want them.
            ViewBag.UsingDataTables = false;

            AddDebugInfo();

            base.OnActionExecuting(filterContext);
        }

        private void AddDebugInfo()
        {
            ViewBag.EnableDebugInfo = EnableDebugInfo;
            var env = ConfigurationManager.AppSettings["Env"];
            ViewBag.Env = (string.IsNullOrEmpty(env))?"dev":env.ToLower();
            var uatLocation = ConfigurationManager.AppSettings["UatLocation"];
            if (string.IsNullOrEmpty(uatLocation))
            {
                ViewBag.ISVersion = ConfigurationManager.AppSettings["ISVersion"];
            }
            else
            {
                ViewBag.ISVersion = ConfigurationManager.AppSettings["ISVersion"] + "-" + uatLocation;
            }
        }
    }
}